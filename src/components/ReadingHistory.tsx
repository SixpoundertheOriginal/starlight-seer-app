
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { History, Trash2, Eye, Calendar, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TarotReading } from '@/types/tarot';

interface ReadingHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReading: (reading: TarotReading) => void;
}

const ReadingHistory: React.FC<ReadingHistoryProps> = ({
  isOpen,
  onClose,
  onSelectReading
}) => {
  const { readings, isLoading, deleteReading, clearHistory } = useReadingHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReading, setSelectedReading] = useState<TarotReading | null>(null);

  const filteredReadings = readings.filter(reading =>
    reading.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reading.interpretation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cosmic-gradient/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <History className="w-8 h-8 text-gold-400" />
              <h1 className="text-3xl font-bold cosmic-text">Reading History</h1>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gold-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your readings..."
                className="pl-10 bg-cosmic-purple/20 border-gold-400/30 text-gold-100"
              />
            </div>
            {readings.length > 0 && (
              <Button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all reading history?')) {
                    clearHistory();
                  }
                }}
                variant="outline"
                className="border-red-400/50 text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Reading List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gold-300">Loading your cosmic history...</p>
            </div>
          ) : filteredReadings.length === 0 ? (
            <Card className="mystical-border p-12 text-center">
              <History className="w-16 h-16 text-gold-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gold-300 mb-2">
                {readings.length === 0 ? 'No readings yet' : 'No matching readings'}
              </h3>
              <p className="text-gold-400/70">
                {readings.length === 0 
                  ? 'Your reading history will appear here after your first consultation with the cards.'
                  : 'Try adjusting your search terms to find specific readings.'
                }
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredReadings.map((reading, index) => (
                <motion.div
                  key={reading.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="mystical-border p-6 hover:bg-gold-400/5 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gold-400" />
                          <span className="text-sm text-gold-300">
                            {formatDate(reading.timestamp)}
                          </span>
                          <span className="text-xs text-gold-400/60 bg-gold-400/10 px-2 py-1 rounded">
                            {reading.spread.name}
                          </span>
                        </div>
                        
                        {reading.question && (
                          <h3 className="text-lg font-semibold text-gold-200 mb-2 truncate">
                            "{reading.question}"
                          </h3>
                        )}
                        
                        <p className="text-gold-300/80 text-sm line-clamp-3">
                          {reading.interpretation}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {reading.spread.positions.map((pos, i) => (
                            <span
                              key={i}
                              className="text-xs bg-cosmic-purple/30 text-gold-300 px-2 py-1 rounded"
                            >
                              {pos.card!.name}{pos.isReversed ? ' (Rev)' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => onSelectReading(reading)}
                          size="sm"
                          variant="outline"
                          className="border-gold-400/50 text-gold-300 hover:bg-gold-400/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            if (window.confirm('Delete this reading?')) {
                              deleteReading(reading.id);
                            }
                          }}
                          size="sm"
                          variant="outline"
                          className="border-red-400/50 text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingHistory;

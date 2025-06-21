
import React from 'react';
import { Moon, Sparkles, Star } from 'lucide-react';

const ReadingHeader: React.FC = React.memo(() => {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-6">
        <Moon className="w-8 h-8 text-gold-400 mr-4 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-bold cosmic-text font-serif">
          Mystical Tarot
        </h1>
        <Sparkles className="w-8 h-8 text-gold-400 ml-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <p className="text-gold-200 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
        Discover the wisdom of the cosmic energies through the ancient art of tarot
      </p>
      <div className="flex items-center justify-center mt-6 space-x-4">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
        <Star className="w-6 h-6 text-gold-400 animate-pulse" />
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
      </div>
    </div>
  );
});

ReadingHeader.displayName = 'ReadingHeader';

export default ReadingHeader;

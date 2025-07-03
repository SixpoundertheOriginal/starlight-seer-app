import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Download } from 'lucide-react';
import { useTarotImageGeneration } from '@/hooks/useTarotImageGeneration';
import { MAJOR_ARCANA, MINOR_ARCANA } from '@/data/tarotDeck';

const ImageGenerationPanel = () => {
  const { 
    generateAllMissingImages, 
    isGenerating, 
    generationProgress 
  } = useTarotImageGeneration();

  const allCards = [...MAJOR_ARCANA, ...MINOR_ARCANA];
  const cardsWithoutImages = allCards.filter(card => !card.imageUrl);

  const handleGenerateImages = async () => {
    try {
      const generatedImages = await generateAllMissingImages(allCards);
      console.log('Generated images:', generatedImages);
      
      // Here you could save the generated images to local storage or a database
      // For now, we'll just log them
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const downloadImageData = (imageData: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Tarot Card Image Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Missing images: <span className="font-semibold">{cardsWithoutImages.length}</span> cards</p>
          <p>Total cards: <span className="font-semibold">{allCards.length}</span></p>
        </div>

        {isGenerating ? (
          <div className="space-y-3">
            <Progress value={generationProgress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Generating images... {Math.round(generationProgress)}%
            </p>
          </div>
        ) : (
          <Button 
            onClick={handleGenerateImages}
            disabled={cardsWithoutImages.length === 0}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate All Missing Images
          </Button>
        )}

        {cardsWithoutImages.length === 0 && (
          <p className="text-sm text-center text-green-600 font-medium">
            ✨ All cards have images!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGenerationPanel;
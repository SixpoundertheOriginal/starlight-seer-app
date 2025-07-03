
import TarotReading from '@/components/TarotReading';
import ImageGenerationPanel from '@/components/ImageGenerationPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mystical-dark via-cosmic-purple to-mystical-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ImageGenerationPanel />
        </div>
        <TarotReading />
      </div>
    </div>
  );
};

export default Index;

import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import ResultPage from './components/ResultPage';
import AdminPage from './components/AdminPage';
import { generateMemoryImage } from './services/geminiService';
import { Logo } from './components/Logo';
import { AnimatedFog } from './components/AnimatedFog';

type View = 'home' | 'result' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (
    name: string,
    childhoodYear: string,
    childhoodImage: File,
    currentYear: string,
    currentImage: File
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      const generatedImg = await generateMemoryImage(
        name,
        childhoodYear,
        childhoodImage,
        currentYear,
        currentImage
      );
      setResultImage(generatedImg);
      setView('result');
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateAnother = () => {
    setResultImage(null);
    setError(null);
    setView('home');
  };
  
  const handleNavigateHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (view === 'result') {
      handleCreateAnother();
    } else {
      setView('home');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'result':
        return resultImage ? (
          <ResultPage imageUrl={resultImage} onCreateAnother={handleCreateAnother} />
        ) : (
          // Fallback to home if resultImage is not available
          <HomePage onGenerate={handleGenerate} isLoading={isLoading} error={error} />
        );
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage onGenerate={handleGenerate} isLoading={isLoading} error={error} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a192f] text-gray-200 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <AnimatedFog />
      <div className="relative z-10 container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <a href="#" onClick={handleNavigateHome}><Logo /></a>
        </header>
        <main>
          {renderView()}
        </main>
        <footer className="text-center mt-12 text-sm text-gray-500">
            <p>Powered by Gemini AI</p>
            <p className="mt-2">
                <a href="#" onClick={(e) => { e.preventDefault(); setView('admin'); }} className="hover:text-cyan-400 transition-colors">
                    Admin Panel
                </a>
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;

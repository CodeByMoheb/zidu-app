// IN an ASP.NET Core MVC App:
// This component acts as a client-side router and state manager.
// In MVC, this logic is handled on the server:
// - Routing: The URL (e.g., `/Home/Index`, `/Admin`) is mapped to a specific Controller action in C#. This is configured in `Program.cs`.
// - View Switching: Instead of a `view` state variable, a Controller action would return a specific View (`return View("Result", viewModel);`).
// - State Management (`isLoading`, `error`): This state would be managed within a single request-response cycle on the server. For example, the `handleGenerate` logic would be a Controller action that returns the Home view with an error message or redirects to the Result view on success.

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

  // This function would be a C# method in a Controller, e.g., `public async Task<IActionResult> Generate(...)`
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
      // In MVC, this call would be to a server-side C# service, not a client-side TS function.
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
  
  // In MVC, navigation is done via standard anchor tags `<a asp-controller="Home" asp-action="Index">...</a>`
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
    // This structure would be part of `_Layout.cshtml`.
    <div className="relative min-h-screen bg-[#0a192f] text-gray-200 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <AnimatedFog />
      <div className="relative z-10 container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <a href="#" onClick={handleNavigateHome}><Logo /></a>
        </header>
        <main>
          {/* In `_Layout.cshtml`, this section would be replaced by `@RenderBody()` */}
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

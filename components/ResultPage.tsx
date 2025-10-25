// IN an ASP.NET Core MVC App:
// This component would be a Razor View, e.g., `Views/Home/Result.cshtml`.
// The `imageUrl` would be passed from the Controller action to the View via a ViewModel.
//
// Example Controller Action in `HomeController.cs`:
// public IActionResult Result(string imageUrl)
// {
//     var viewModel = new ResultViewModel { ImageUrl = imageUrl };
//     return View(viewModel);
// }
//
// Inside `Result.cshtml`, you would access the URL like this: `@Model.ImageUrl`

import React from 'react';
import { DownloadIcon } from './icons';

interface ResultPageProps {
  imageUrl: string;
  onCreateAnother: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ imageUrl, onCreateAnother }) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-6">Your Memory, Reimagined.</h2>
        <div className="relative group w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
            {/* The src attribute would be `@Model.ImageUrl` */}
            <img src={imageUrl} alt="Generated memory" className="w-full h-auto object-contain" />
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
             {/* The href would also be `@Model.ImageUrl` */}
             <a
                href={imageUrl}
                download={`zidu_memory.png`}
                className="flex-1 text-center py-3 px-6 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out
                           bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30
                           flex items-center justify-center gap-2"
              >
                <DownloadIcon className="w-6 h-6" />
                Download
              </a>
            {/* This button would be a link pointing back to the Home/Index action */}
            <button
                onClick={onCreateAnother}
                className="flex-1 py-3 px-6 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out
                           bg-slate-700 text-gray-200 hover:bg-slate-600"
            >
                Create Another
            </button>
        </div>
    </div>
  );
};

export default ResultPage;

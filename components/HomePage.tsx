// IN an ASP.NET Core MVC App:
// This component would be a Razor View, specifically `Views/Home/Index.cshtml`.
// - ViewModel: A C# class (e.g., `GenerateImageViewModel`) would be created to hold the properties for the form (Name, ChildhoodYear, etc.) and any validation attributes.
// - Form: The form would be created using the `<form>` tag helper (`<form asp-action="Generate" asp-controller="Home" method="post" enctype="multipart/form-data">`).
// - Inputs: Inputs would use tag helpers bound to the ViewModel properties (e.g., `<input asp-for="Name" class="..." />`).
// - File Uploads: `IFormFile` properties on the ViewModel would handle the uploaded images.
// - Submission: The form would POST to a `[HttpPost] Generate` action on the `HomeController`.

import React, { useState, useCallback } from 'react';
import { ImageUploader } from './ImageUploader';
import { Loader } from './Loader';

interface HomePageProps {
  onGenerate: (
    name: string,
    childhoodYear: string,
    childhoodImage: File,
    currentYear: string,
    currentImage: File
  ) => void;
  isLoading: boolean;
  error: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ onGenerate, isLoading, error }) => {
  // All this state would live in the C# ViewModel, not in the client.
  const [name, setName] = useState('');
  const [childhoodYear, setChildhoodYear] = useState('');
  const [childhoodImage, setChildhoodImage] = useState<File | null>(null);
  const [currentYear, setCurrentYear] = useState('');
  const [currentImage, setCurrentImage] = useState<File | null>(null);

  const handleSubmit = useCallback(() => {
    if (name && childhoodYear && childhoodImage && currentYear && currentImage) {
      // In MVC, this would just be the form submission. The `onGenerate` logic lives in the C# Controller.
      onGenerate(name, childhoodYear, childhoodImage, currentYear, currentImage);
    }
  }, [onGenerate, name, childhoodYear, childhoodImage, currentYear, currentImage]);

  const canGenerate = name && childhoodYear && childhoodImage && currentYear && currentImage && !isLoading;

  if (isLoading) {
    // A loading indicator could be shown on the client-side after form submission,
    // or the server could return a "Processing" page.
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-cyan-500/10 p-6 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 tracking-tight">Reconnect with Your Younger Self.</h1>
        <p className="text-md text-gray-400 mt-2">Upload two photos, and let our AI create a timeless memory.</p>
      </div>
      <div className="flex flex-col space-y-6">
        {/* In MVC, this would be a <form> element. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Person's Name</label>
            <input
              type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alex"
              className="w-full px-4 py-2 text-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <ImageUploader label="Childhood Photo" onFileChange={setChildhoodImage} />
            <input
              type="text" value={childhoodYear} onChange={(e) => setChildhoodYear(e.target.value)}
              placeholder="Year of Childhood Photo (e.g., 1995)"
              className="w-full px-4 py-2 text-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="space-y-4">
            <ImageUploader label="Current Photo" onFileChange={setCurrentImage} />
            <input
              type="text" value={currentYear} onChange={(e) => setCurrentYear(e.target.value)}
              placeholder="Year of Current Photo (e.g., 2024)"
              className="w-full px-4 py-2 text-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canGenerate}
          // In MVC, this would be `<button type="submit" ...>` inside the form.
          className={`w-full py-3 px-6 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform
            ${canGenerate
              ? 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1'
              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
        >
          Generate Memory
        </button>
        {/* Error messages would be displayed using validation tag helpers, e.g., `<div asp-validation-summary="ModelOnly"></div>` */}
        {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;

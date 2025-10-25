// IN an ASP.NET Core MVC App:
// This entire file's logic would be moved to the server-side, written in C#.
// It could be a dedicated `GeminiService.cs` class that is injected into a Controller, or it could be placed directly within a Controller action.
//
// Key Differences:
// - Language: C# instead of TypeScript.
// - Gemini SDK: You would use the `Google.Ai.Generativelanguage` NuGet package (or similar C# SDK) instead of `@google/genai`.
// - API Key: The API key would be stored securely in server-side configuration (e.g., `appsettings.json` or User Secrets) and not exposed to the client at all.
// - File Handling: The `File` objects from the form post would be received as `IFormFile` in the C# Controller action. You would read their streams into byte arrays to convert to Base64 on the server.
// - Return Value: Instead of returning a Base64 string to the client, the Controller action would likely redirect to a Result page, passing the generated image URL (or the image data itself) to the view.

import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

// Example C# Controller Action
// [HttpPost]
// public async Task<IActionResult> Generate(GenerateImageViewModel model)
// {
//     if (!ModelState.IsValid) { return View("Index", model); }
//     
//     var generatedImageUrl = await _geminiService.GenerateMemoryImageAsync(model);
//
//     return RedirectToAction("Result", new { imageUrl = generatedImageUrl });
// }

export const generateMemoryImage = async (
  name: string,
  childhoodYear: string,
  childhoodImageFile: File,
  currentYear: string,
  currentImageFile: File
): Promise<string> => {
  if (!process.env.API_KEY) {
    // In C#, this check would be against the IConfiguration service.
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const childhoodImageBase64 = await fileToBase64(childhoodImageFile);
  const currentImageBase64 = await fileToBase64(currentImageFile);
  
  const prompt = `**Primary Goal: Create a single, heart-touching, and artistic photo with 100% perfect facial accuracy and crystal-clear, high-resolution quality. This is the most critical priority.**

  **Scene Description:**
  The photo must depict two versions of the same person, '${name}', in a warm, nostalgic hug:
  1.  **Childhood version:** Based on the first image (from year ${childhoodYear}).
  2.  **Current version:** Based on the second image (from year ${currentYear}).
  They should be looking at each other with genuine affection, capturing a moment of deep connection.

  **Artistic Style (Very Important):**
  - **Background:** Faithfully recreate the background from the *second (current) image*. Maintain its original character, elements, and mood, but enhance it to be more artistic, serene, and beautiful. Apply a soft-focus (bokeh) effect to the distant parts of the background to make the subjects stand out.
  - **Lighting:** Masterfully replicate the lighting from the *second (current) image*. If it's golden hour, enhance it. If it's daylight, make it soft and flattering. The lighting on the two subjects must match the background's lighting conditions seamlessly for a photorealistic result.
  - **Atmosphere:** If it fits the mood of the background, add very subtle, glowing particles floating in the air to add a touch of magic. This effect should be understated and natural.

  **Integrated Text:**
  - **Position:** Artistically integrate the name '${name}' into the **middle or upper-middle area of the background**. It should be a key visual element but not overpower the subjects.
  - **Dynamic Style:** The font and style for the name must be **dynamically chosen to perfectly match the background's aesthetic**. It should not be a generic font. It should feel like a natural, artistic part of the scene's composition and lighting (e.g., elegant for a garden, modern for a city, playful for a park).
  - **Years:** Directly below the name, in a similar but smaller style, display the years: "${childhoodYear} - ${currentYear}".
  - **Integration:** The text must blend seamlessly with the lighting, with soft shadows or glows that make it look truly part of the environment, not a simple overlay.

  **Watermark:**
  - Place a small, discreet, and elegant watermark with the word "Zidu" in the bottom right corner of the final image.

  **Final Output:**
  A single, cohesive, crisp, high-resolution photograph that masterfully combines the two individuals with perfect facial likeness, set within the described enhanced background.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: childhoodImageBase64,
            mimeType: childhoodImageFile.type,
          },
        },
        {
          inlineData: {
            data: currentImageBase64,
            mimeType: currentImageFile.type,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
  }

  throw new Error("No image was generated by the AI. The response may not contain image data.");
};

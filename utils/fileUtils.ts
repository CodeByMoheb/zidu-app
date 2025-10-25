// IN an ASP.NET Core MVC App:
// This client-side utility would be unnecessary.
// File-to-Base64 conversion would happen on the server. An `IFormFile` object received
// in a controller action can be read into a byte array, which is then easily converted to a Base64 string.
//
// Example C# code:
// public async Task<string> ConvertFileToBase64(IFormFile file)
// {
//     using (var memoryStream = new MemoryStream())
//     {
//         await file.CopyToAsync(memoryStream);
//         var fileBytes = memoryStream.ToArray();
//         return Convert.ToBase64String(fileBytes);
//     }
// }

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // result is a data URL (e.g., "data:image/jpeg;base64,/9j/4AAQ...").
        // We only need the base64 part after the comma.
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as a data URL.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

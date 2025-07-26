import React, { useState } from 'react';

const UploadResume: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64PDF = (reader.result as string).split(',')[1];
      setLoading(true);

      try {
        const response = await fetch('https://1z8n6q90li.execute-api.eu-west-2.amazonaws.com/prod/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64PDF,
          }),
        });

        const data = await response.json();
        setText(data.text || JSON.stringify(data, null, 2));
      } catch (error) {
        setText('Error uploading or processing file');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Resume PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && <p className="text-blue-500">Processing...</p>}
      {text && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadResume;

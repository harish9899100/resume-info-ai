import React, { useState } from "react";

const Index = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      setLoading(true);

      try {
        const response = await fetch("https://1z8n6q90li.execute-api.eu-west-2.amazonaws.com/prod/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64,
          }),
        });

        const data = await response.json();
        setText(data.text || JSON.stringify(data, null, 2));
      } catch (err) {
        setText("Something went wrong while uploading or processing.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && <p className="text-blue-600 mt-4">Uploading & processing...</p>}
      {text && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <pre className="whitespace-pre-wrap text-sm">{text}</pre>
        </div>
      )}
    </div>
  );
};

export default Index;

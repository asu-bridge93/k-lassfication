"use client";
import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const imageList = [
    { src: "/images/taehyon_image_front.png", name: "Taehyun" },
    { src: "/images/soobin_image_front.png", name: "Soobin" },
    { src: "/images/yeonjun_image_front.png", name: "Yeonjun" },
    { src: "/images/beomgyu_image_front.png", name: "Beomgyu" },
    { src: "/images/hueningkai_image_front.png", name: "Hueningkai" },
  ];

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred while processing the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 bg-cover bg-center bg-fixed overflow-hidden relative"
      style={{
        backgroundImage:
          "url('https://weverse-phinf.pstatic.net/MjAyMjA5MTRfMjQw/MDAxNjYzMTQ0MTI0OTgx.bJ_iQE32D-612FF1Cy7DNMTnTarxvdKzL6FBigezGVMg.qPqN0kEcNpO2gahoPahmoN9t3t76r91updu9qhkORuQg.JPEG/upload_41314287950786405bedebf28-929d-4bb8-afe5-5890e7b2654a.jpg?type=w1414')",
        backgroundColor: "#000",
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10" />

      <div className="max-w-4xl w-full mx-auto px-6 relative z-20">
        <div className="text-center mb-10 relative z-30">
          {/* Card background */}
          <div className="absolute inset-0 bg-white/30 rounded-lg blur-xl z-[-1]"></div>
          <h1 className="mt-0 text-7xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 bg-clip-text">
            K-lassification
          </h1>
          <p className="text-lg text-gray-900 mt-1">
            Upload an image of a TXT member to classify who it is.
          </p>
        </div>

        {/* 画像ギャラリー */}
        <div className="mb-10 flex justify-center gap-10">
  {imageList.map((item, index) => (
    <div key={index} className="text-center relative">
      <img
        src={item.src}
        alt={item.name}
        className="w-32 h-32 object-cover rounded-full border-2 border-gray-700"
      />
      <div className="absolute inset-x-0 bottom-0 transform translate-y-6 bg-gray-800/60 text-gray rounded-lg py-0">
        <p className="text-sm font-semibold">{item.name}</p>
      </div>
    </div>
  ))}
</div>


        <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-slate-700">
          <form
            onSubmit={handleSubmit}
            onDragEnter={handleDrag}
            className="space-y-6"
          >
            {preview && (
              <div className="relative overflow-hidden rounded-lg h-96 bg-slate-900/50 flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                dragActive
                  ? "border-purple-400 bg-purple-400/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-gray-300 text-sm">
                Drag and drop your image here, or click to select
              </p>
            </div>

            <button
              type="submit"
              disabled={!file || isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                !file || isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Analyze Image"
              )}
            </button>
          </form>

          {prediction && (
            <div className="mt-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600 flex items-start gap-3">
              <svg
                className="h-6 w-6 mt-0.5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-200 flex-1">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

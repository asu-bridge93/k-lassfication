"use client";
import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(""); // ファイル名を保存
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showFileName, setShowFileName] = useState(false); // ファイル名表示用
  const [processing, setProcessing] = useState(false); // Processing状態用

  const imageList = [
    { src: "/images/taehyon_image_front.png", name: "Taehyun" },
    { src: "/images/soobin_image_front.png", name: "Soobin" },
    { src: "/images/yeonjun_image_front.png", name: "Yeonjun" },
    { src: "/images/beomgyu_image_front.png", name: "Beomgyu" },
    { src: "/images/hueningkai_image_front.png", name: "Hueningkai" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // ファイル名を保存
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) =>
        setPreview(e.target?.result as string); // プレビュー画像を保存
      reader.readAsDataURL(selectedFile);
      setShowFileName(false); // ボタンを押すまで表示しない
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile); // ドラッグ&ドロップされたファイルを保存
      setFileName(droppedFile.name); // ファイル名を保存
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) =>
        setPreview(e.target?.result as string);
      reader.readAsDataURL(droppedFile);
      setShowFileName(false); // ボタンを押すまで表示しない
    }
  };

  const handleAnalyze = () => {
    if (fileName) {
      setProcessing(true); // Processing表示
      setTimeout(() => {
        setShowFileName(true); // ファイル名表示
        setProcessing(false); // Processing非表示
      }, 1500); // 1.5秒後にファイル名表示
    }
  };

  const getFormattedFileName = () => {
    const splitName = fileName.split("_");
    return splitName[0]?.toUpperCase() || "UNKNOWN FILE";
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
      <div className="max-w-4xl w-full mx-auto px-6 relative z-20 mt-[-10]">
        <div className="text-center mb-8 relative z-30">
          <div className="absolute inset-0 bg-white/30 rounded-lg blur-xl z-[-1]"></div>
          <h1 className="mt-0 text-7xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 bg-clip-text">
            K-lassify
          </h1>
          <p className="text-lg text-gray-900 mt-1">
            Upload an image of a TXT member to classify who it is.
          </p>
        </div>

        <div className="mb-10 flex justify-center gap-10">
          {imageList.map((item, index) => (
            <div key={index} className="text-center relative">
              <img
                src={item.src}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-700"
              />
              <div className="absolute inset-x-0 bottom-0 transform translate-y-6 bg-gray-800/60 text-gray-200 rounded-lg py-0">
                <p className="text-sm font-semibold">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-slate-700">
          <form
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
          </form>

          <button
            onClick={handleAnalyze}
            className="mt-6 w-full px-4 py-2 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Analyze Image
          </button>

          {processing && (
            <div className="mt-6 p-4 rounded-lg bg-yellow-700/20 border border-yellow-600 flex items-center justify-center">
              <p className="text-lg text-yellow-300 font-bold">
                Processing...
              </p>
            </div>
          )}

          {showFileName && (
            <div className="mt-6 p-4 rounded-lg bg-purple-700/20 border border-purple-600 flex items-center justify-center">
              <p className="text-lg text-purple-300 font-bold">
                This is: {getFormattedFileName()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

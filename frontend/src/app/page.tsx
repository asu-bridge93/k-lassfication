// frontend/src/app/page.tsx
"use client"
import { useState, useEffect } from 'react';


// useStateでmessageという状態を定義し、初期値は空文字列に設定
// useEffectでfetchを使ってFlaskのAPIを叩き、結果をmessageにセット
export default function Home() {
  const [message, setMessage] = useState('');  // メッセージを保持するstate

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())  // responseをテキストに変換
      .then((data) => setMessage(data))  // データをセット
      .catch((error) => console.error('Error fetching data:', error));
  }, []);  // 空の配列を渡すことで初回のみ実行

  return (
    <div>
      <h1>Next.js + Flask</h1>
      <p>{message}</p>
    </div>
  );
}

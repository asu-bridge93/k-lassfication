# k-lassfication
### K-popアイドルの顔画像分類を行うアプリです。
Frontendは`React`, `Next.js`, Backendは`Flask`, `FastAPI`を用いています。

---
モデルの作成は以下のURLにて行いました。  
https://colab.research.google.com/drive/14TaGxytMhJFMRFuJjClerAxUmDydgXZI?usp=sharing


---
また、全体の流れは以下の通りです。
1. データのスクレイピング
2. 機械学習モデルを使った顔範囲のみの切り取り
3. テンソルの正規化、画像サイズやカラースケールの調整
4. モデルのFine-Tuning(`google/vit-base-patch16-224`)
5. モデルの予測性能を評価
6. Gradioでデモアプリを起動
7. モデルのパラメーターを`.pkl`で保存
8. `backend/`に配置し、フロントからAPIで呼び出す。


---
## Run the code with
### Next.js Server (Frontend)
```
cd frontend
npm run dev
```

### Flask Server (Backend)
```
cd backend
source bin/activate
python app.py
```

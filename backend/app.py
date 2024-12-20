from flask import Flask
from flask_cors import CORS


app = Flask(__name__)  # Flaskのインスタンスを生成
CORS(app)  # CORSを有効にする
# CORSとは、異なるオリジン間での通信を制御するための仕組み
# オリジンとは、プロトコル、ホスト、ポートの組み合わせを指す


@app.route('/')  # / にアクセスがあった場合に以下の関数を実行する
def hello():
    return 'Hello from Flask!'


if __name__ == '__main__':  # app.py がエントリーポイントの場合に以下を実行
    app.run(debug=True)  # アプリケーションの実行

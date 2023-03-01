# リポジトリについて
- prod: https://orientalbio-kenko.jp/ 以下
- stg: https://stg.orientalbio-kenko.jp/ 以下

## 概要
- /head, /heartは古くからあるサイト。その他は社内制作のサイト。
- プレーンなHTML, CSSを使用。一部SCSS, EJSを使用。
- アップ方法はprod, stgともにFTP。

## 注意
- stgはBasic認証を設定
    - htaccessではなくサーバー側で設定
- HTMLのみでも、webサーバーを起動して作業することを推奨
  - 静的サイトだが、/ から始まる絶対パス( `/heart/sp/` など ) を用いておりファイルをブラウザで開くだけでは意図した導線にならないため。
  - gulpfileを用いても良いし、自前でローカル開発環境を構築しても良い。
  - gulpfileのあるディレクトリでは、browser-sync内でbaseURLを1階層上のドキュメントルートに設定しており、それによって「/voice/assets/...」などの絶対パスをローカル開発環境でも読み込めるようにしている。

### 参考：http-server [[Doc](https://www.npmjs.com/package/http-server)]
- http-serverというnpmパッケージを下記コマンドでグローバルにインストールする(1度実行すれば、他のリポジトリやファイルでどこでもインストール不要で使える)。
  ```
  // npm の場合
  npm install --global http-server

  // homebrew の場合
  brew install http-server
  ```
- 下記コマンドをターミナルに打ってローカルサーバーを起動
  ```
  http-server ./ -o
  ```
  - `./` : カレントディレクトリで実行
  - `-o` : 自動でopen
  - `http://localhost:8080` にアクセスしても見れる。
## サイトについて
- /head, /heart: 通称「旧エパ研究サイト」
  - レスポンシブでない
- /heart_c: 通称「チェックボックス」
  - /heart_c_movie などもその姉妹ページ。施策によって使ったり使わなかったりする。いつも稼働状況を確認する。
- /interview: 通称「なぎらさんインタビュー」
  - /ngr, /ng_m_taidan2... など複数のバージョンがある。いつも稼働状況を確認する。
- /kenkyu: 通称「新エパ研究サイト」
  - **/resources** 以下を編集する。
- /report: 通称「田中さん、先生対談記事」
  - 制作したものの使用したことはない
- /voice: 通称「体験談」
  - /1: 田中さん体験談。現在は不使用。
  - /2: 宮﨑さん体験談
  - /3: 石塚さん体験談

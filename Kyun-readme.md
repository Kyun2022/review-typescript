# TypeScript 講座

## Setting

#### ファイル作成・設定(1.2)
  1. git に新規でリポジトリを作成する
  2. [Quick setup](/images/gitclone.png)で HTTPS に変更した際に出力される URL コピーする
  3. ターミナルにて、置きたいディレクトリのレイヤ − で、clone し、以下をターミナルにて入力
  4. `git clone (コピーしたurl)`
  5. 作成されたディレクトリへ、cd で移動
  6. `ls -la`で、git ファイルを確認
  7. `yarn init -y`で`package.json`を作成する
  8. `yarn add typescript`でディレクトリ内に`typescript`をインストールする
  9. `./node_modules/.bin/tsc --init`を入力し、`tsconfig.json`を作成する
  10. `index.ts`を作成し、ディレクトリ内に、`const text: string = "foo"`を入力
  11. tsc でコンパイルさせるためにターミナルに `./node_modules/.bin/tsc` を入力
    *[tsc]: TypeScript Compiler
  12. `index.js`がコンパイルされる
  13. コンパイルする際、型違いが発見されるとエラーになる

## Create-Next-app(2)

ファイル一新させる
  - `yarn create next-app --typescript`をターミナルへ入力

## 型推論・型アノテーション・型アサーション


# TypeScript 講座

## 1. Setting

#### ファイル作成・設定(1.2)
  - git に新規でリポジトリを作成する
  - [Quick setup](/images/gitclone.png)で HTTPS に変更した際に出力される URL コピーする
  - ターミナルにて、置きたいディレクトリのレイヤ − で、clone し、以下をターミナルにて入力
  - `git clone (コピーしたurl)`
  - 作成されたディレクトリへ、cd で移動
  - `ls -la`で、git ファイルを確認
  - `yarn init -y`で`package.json`を作成する
  - `yarn add typescript`でディレクトリ内に`typescript`をインストールする
  - `./node_modules/.bin/tsc --init`を入力し、`tsconfig.json`を作成する
  - `index.ts`を作成し、ディレクトリ内に、`const text: string = "foo"`を入力
  - tsc でコンパイルさせるためにターミナルに `./node_modules/.bin/tsc` を入力
    *[tsc]: TypeScript Compiler
  - `index.js`がコンパイルされる
  - コンパイルする際、型違いが発見されるとエラーになる

## Create-Next-app(2,)

ファイル一新させる
  - `yarn create next-app --typescript`をターミナルへ入力
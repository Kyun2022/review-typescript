# TypeScript 講座

## Setting

#### ファイル作成・設定(1.2)

1. git に新規でリポジトリを作成する
2. [Quick setup](/images/gitclone.png)で HTTPS に変更した際に出力される URL をコピーする
3. ターミナルにて、置きたいディレクトリのレイヤ − で、clone し、以下をターミナルにて入力
4. `git clone (コピーしたurl)`
5. 作成されたディレクトリへ、cd で移動
6. `ls -la`で、git ファイルを確認
7. `yarn init -y`で`package.json`を作成する
8. `yarn add typescript`でディレクトリ内に`typescript`をインストールする
9. `./node_modules/.bin/tsc --init`を入力し、`tsconfig.json`を作成する
10. `index.ts`を作成し、ディレクトリ内に、`const text: string = "foo"`を入力
11. tsc でコンパイルさせるためにターミナルに `./node_modules/.bin/tsc` を入力 \*[tsc]: TypeScript Compiler
12. `index.js`がコンパイルされる
13. コンパイルする際、型違いが発見されるとエラーになる

## Create-Next-app(2)

ファイル一新させる

- `yarn create next-app --typescript`をターミナルへ入力

## 型推論・型アノテーション・型アサーション(3)

#### 型推論（type Inference）

- 何もしないで型がつく
- typescript は何をしなくても型を付与してくれる

#### 型アノテーション（type Annotation）

- プログラマー側で明示的に型をつける方法
- 開発側が主体となってコードを記述できる（開発者ドリブン）

```javascript {.line-numbers}

Example
---------------------------
let foo: number = 123;

function double(x: number): number | undefined {
  if (x > 0) {
    return;
  }
  return x * 2;
}
```

##### メリット

- 型アノテーションがドキュメント的な役割を果たす
- コンパイラ側の理解の助けになり、コンパイル速度が上がる
- 型推論だけでは足りない場面が意外とたくさん出てくる

#### 型アサーション（type Assertion）

- すでにある型に対して上書きで型を付与すること

- 型アサーションは基本的に多用するべきではない

  - 開発者側が自由に型を修正できてしまうため、型の整合性が取れなくなる

  - 以下の場合に使う可能性がある

    1. 外部とリクエストを行ってレスポンスの型がわからない場合
    2. 外部ライブラリを使う時に型が用意されていなかったり不十分だったりする場合

    ```javascript
    let foo = {} as { bar: number };
    ```

## 動的型付け・静的型付け、プリミティブ型・オブジェクト・null・undefined(4)

#### 動的型付け言語

- Js もプログラミングが実行されるタイミングで型が付与される

##### メリット

- 開発中に型を意識することがないのでサクサク記述できる

##### デメリット

- 型を意識しないことにより、バグを生みやすくなる
- 補完が効かない
- ドキュメント的な役割の恩恵が受け取れない０

#### 静的型付け言語

- Typescript

##### メリット

- バグが少ない

### プリミティブ型

- JavaScript が持っているデータ型のひとつ

  - 真偽値（Boolean）

  ```javascript
  const foo: boolean = true;
  const baz: boolean = false;
  ```

  - 文字列（String）

  ```javascript
  const foo: string = "kyun";
  const bar: string = "kyun";
  const baz: string = `kyun`;
  ```

  - 数値（Number）

  ```javascript
  const foo: number = 111;
  const baz: number = 0.1;
  ```

  - null
    - 現在利用できない状態を表す型
    - json ファイルで使うことが可能
    - API で json を返すときには、null が使われる
    - TypeScript の開発チームは、null を使わないと明言

  ```javascript
  const foo: null = null;
  ```

  - undefined
    - 初期化されていない状態の型
    - json ファイルで使うことは不可能
    - TypeScript の開発チームは、undefined を使うと明言

  ```javascript
  const foo: undefined = undefined;
  ```

  - BigInt（あまり使われない）
  - シンボル（Symbol）（あまり使われない）

  ```

  ```

### オブジェクト

- 複合型
- プリミティブ型以外のすべて
  - 正規表現
  - 関数
  - 配列

## Literal Types の使い方や使い道、Widening の概念(5)

### Literal Types

- Boolean, String, Number 型のプリミティブ型を細分化したもの
- コードを記述するときの補完に役立つ
- 予期せぬ値を防ぐ
- タイポも防ぐ

#### Boolean Literal Types

- 型指定したもの以外は、エラーになる

```javascript
👌 const foo: false = false;
👎 const baz: true = false;
```

#### String Literal Types

- タイポしたら、エラーになる

```javascript
👌 const foo: "foo" = "foo";
👎 const baz: "baz" = "bar";
```

#### Number Literal Types

```javascript
👌 const foo: 0 = 2;
👎 const baz: 2 = 2;
```

##### props foo の型が boolean の場合

```javascript {.line-numbers}
export default function Home() {
  return (
    <>
      <div className="">
        <Component foo={false} /> /** Trueだとエラーになる */
      </div>
    </>
  );
}

const Component = (props: { foo: boolean }) => {
  if (props.foo) {
    return <div className="">a</div>;
  }
  return <div className="">test</div>;
};
```

##### props foo の型がオプショナルの場合

```javascript {.line-numbers}
export default function Home() {
  return (
    <>
      <div className="">
        <Component />
        /** propsは必要なし */ /** <Component foo /> foo のみで、Trueとなる */
      </div>
    </>
  );
}

const Component = (props: { foo?: true }) => {
  /** オプショナルとなり、任意のプロパティになる*/
  if (props.foo) {
    /** foo の値はundefinedになり、undefinedはfalsyな値だから条件を無視する */
    return <div className="">a</div>;
  }
  return <div className="">test</div>;
};
```

### Widening（widening Literal type）

- 型が拡張されてしまう性質 = widening
- Literal type だけではない！
- 以下の 3 つの対策で、string Literal type を拡張されずに型を維持できる

```javascript
const foo = "foo"; /** string Literal type */
let bar = foo;
/** barは、string Literal typeではなく、string型に拡張されてしまう */
```

```javascript
const foo = "foo" as "foo"; /** 型アサーションで、string Literal type のまま型を維持できる*/
let bar = foo;
```

```javascript
const foo = "foo" as const; /** constアサーションで、string Literal type のまま型を維持できる*/
let bar = foo;
```

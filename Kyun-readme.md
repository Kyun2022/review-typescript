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

### 真偽値（Boolean）

```javascript
const foo: boolean = true;
const baz: boolean = false;
```

### 文字列（String）

```javascript
const foo: string = "kyun";
const bar: string = "kyun";
const baz: string = `kyun`;
```

### 数値（Number）

```javascript
const foo: number = 111;
const baz: number = 0.1;
```

### null

    - 現在利用できない状態を表す型
    - json ファイルで使うことが可能
    - API で json を返すときには、null が使われる
    - TypeScript の開発チームは、null を使わないと明言

```javascript
const foo: null = null;
```

### undefined

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

## Array, Tuple, Any, Unknown, Void, Never(6)

### Array

```javascript
👌 const foo: number[] = [1, 2, 3];
👎 const bar: number[] = [1, "2", 3];
👌 const baz: Array<number> = [1, 2, 3];
```

##### Union type

```javascript
const kyun: (number | string)[] = [1, "2", 3];
```

### Tuple

- 一つ一つの要素に対して型をつけることができる
- 要素の順番が決まっている
- 要素の数が決まっている

```javascript
const foo: [string, number] = ["foo", 1];
```

#### メリット

- 要素が持っているメソッドを補完してくれる

### Any

- 型が不明なときに、型チェックを無効にして、コンパイルを無理やり通す時に使われる
- 基本的に多用して良いものではない
- js から Ts に型付けする場合、全てを変更できないため、一度 any 型にして順を追って型付けしていく

```javascript
👌 const foo: any = true;
👌 const bar: any = 123;
👌 const baz: any = "kyun";
```

### Unknown

- 型が不明な時に使う点は、any と似ている
- any より安全にしたい場合に使われる
- 利用するときに型がしっかりと評価されるため安全

```javascript
👌 const foo: unknown = true;
👌 const bar: unknown = 123;
👌 const baz: unknown = "kyun";
```

```javascript
👌 const baz: unknown = "kyun";
if (typeof baz === "string") {
  baz.substr(2);
}
```

### Void

- 関数の返り値がない場合によく使われる
- 「何も返さない」というのを明示的に示す
- 逆に return を使って要素を返す指定をするとエラーになる

##### 関数宣言

```javascript
👌 function foo(): void {
  console.log("hello");
}
👌 function foo(): void {
  console.log("hello");
  return
}
👌 function foo(): void {
  console.log("hello");
  return undefined;
}

👎 function foo(): void {
  console.log("hello");
  return 0
}
```

##### アロー関数（関数式）

```javascript
const foo = (): void => {
  console.log("hello");
};

const foo: () => void = () => {
  console.log("hello");
};
```

##### 型を外出しする

```javascript
type Foo = () => void;

const foo: Foo = () => {
  console.log("hello");
};
```

### Never

- 発生し得ない値の型に対して Never 型は付与する

```javascript
const foo = (bar: "a" | "b") => {
  switch (bar) {
    case "a":
      return;
    case "b":
      return;
    default:
      bar; /** 絶対に到達しない場所、ここが Never となる */
      break;
  }
};
```

## オブジェクト（7）

- 非プリミティブ型のオブジェクト
- 辞書型としてのオブジェクト

```javascript
👎 let obj1: {} = {};
   /** 辞書型のオブジェクトを指していない nullとundefined以外は全て受け取れる */

👎 let obj2: object = {};
   /** 辞書型のオブジェクトとしては適していない */

👌 let obj3: Record<string, unknown> = {};

Record: 標準ライブラリ

- 特定のプロパティが存在する場合に記述しやすい

👌 let obj4: { [key: string]: unknown; foo: string } = { /** 型部分を「Index signature」と呼ぶ */
  a: 1,
  s: "foo",
  foo: "foo",
};

- 特定のプロパティがオプショナルである場合を表現する時も使いやすい

👌 let obj4: { a: number; b: string; foo?:string} = {
  a: 1,
  s: "foo",
  // foo: "foo",

  /** 無くても オプショナルなら型を受け取らない可能性がある
  認識されるため、エラーがでない */
};

  - オブジェクトのValueがネストした場合にRecordも扱いやすい

👌 let obj4:  { [key: string]: {foo: unknown} } = {
  a: {
    foo: 1,
  },
};

```

##### 空オブジェクトを定義する プロパティを追加

```javascript
let obj3: Record<string, unknown> = {};
let obj4: { [key: string]: unknown } = {};

obj3.foo = "bar";
obj4.foo = "baz";
```

##### 空オブジェクトを定義する プロパティを追加したくない場合

```javascript
let obj3: Record<string, never> = {};
let obj4: { [key: string]: never } = {};

obj3.foo = "bar";
obj4.foo = "baz";
```

##### プロパティがある状態

```javascript
let obj3: Record<string, unknown> = {
  // string[0]は、キー部分
  a: 1,
  b: "foo",
};
```

## Intersection Types（交差型）

### Intersection Types とは

- 複数の型を 1 つにまとめることができるもの
- 型に名前がつけられる

#### どのような場面で使うのか

- 型が長すぎる場合
- コードの見通しを良くする
- プリミティブ型は合体できるが、`never型`となる

```javascript
type Foo = {
  a: number,
  b: string,
};

type Bar = {
  c: boolean,
};

type FooBar = Foo `&` Bar;  /** &(アンパサンド)を使って、typeを合体させる */

const Test: FooBar = { /** typeを合体させると、プロパティも合体させた評価になる */
  a: 1,
  b: "",
  c: true,
};
```

## Union Types（共用型、合併型）

### Union Types とは

- 複数の型があった場合、どれか 1 つの型が成立すれば OK
- 両方の型を満たしていても、OK
- プリミティブ型でもかなり使われる
- Literal types でもよく使われる

```javascript
type Foo = {
  a: number,
  b: string,
};

type Bar = {
  c: boolean,
};

type FooBar = Foo | Bar; /** ｜（パイプ）を使って、typeを合体させる */

const test: FooBar = {
  /** typeを合体させると、プロパティも合体させた評価になる */
  a: 1,
  b: "",
  c: true,
};
```

#### 応用編

```javascript
type Foo = {
  a: number,
  b: string,
};

type Bar = {
  a: string,
  c: boolean,
};

type FooBar = Foo | Bar;

const test: FooBar = {
  /** aは、Number型でもstring型でも、OK */
  a: "",
  b: "",
  c: true,
};
```

#### 型の絞り込みが必要な場合

```javascript
type Foo = {
  a: number,
  b: string,
};

type Bar = {
  a: string,
  c: boolean,
};

type FooBar = Foo | Bar;

const test: FooBar = {
  /** aは、Number型でもstring型でも、OK */
  a: "",
  b: "",
  c: true,
};

if ("b" in test) {
  // test というオブジェクトのなかに "b"というプロパティはありますか？という意味
  test.a.toFixed();
}
```

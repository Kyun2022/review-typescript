# TypeScript 講座

## #1 Setting

#### ファイル作成・設定

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

## #2 Create-Next-app

ファイル一新させる

- `yarn create next-app --typescript`をターミナルへ入力

## #3 型推論・型アノテーション・型アサーション

#### 型推論（type Inference）

- 何もしないで型がつく
- typescript は何をしなくても型を付与してくれる

#### 型アノテーション（type Annotation）

- プログラマー側で明示的に型をつける方法
- 開発側が主体となってコードを記述できる（開発者ドリブン）

```javascript {.line-numbers}
ex1
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
    ex1
    let foo = {} as { bar: number };
    ```

## #4 動的型付け・静的型付け、プリミティブ型・オブジェクト・null・undefined

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
ex1;
const foo: boolean = true;
const baz: boolean = false;
```

### 文字列（String）

```javascript
ex1;
const foo: string = "kyun";
const bar: string = "kyun";
const baz: string = `kyun`;
```

### 数値（Number）

```javascript
ex1;
const foo: number = 111;
const baz: number = 0.1;
```

### null

    - 現在利用できない状態を表す型
    - json ファイルで使うことが可能
    - API で json を返すときには、null が使われる
    - TypeScript の開発チームは、nullを使わないと明言

```javascript
ex1;
const foo: null = null;
```

### undefined

    - 初期化されていない状態の型
    - `json ファイル`で使うことは不可能
    - TypeScript の開発チームは、undefinedを使うと明言

```javascript
ex1;
const foo: undefined = undefined;
```

- BigInt（あまり使われない）
- シンボル（Symbol）（あまり使われない）

### オブジェクト

- 複合型
- プリミティブ型以外のすべて
  - 正規表現
  - 関数
  - 配列

## #5 Literal Types の使い方や使い道、Widening の概念

### Literal Types

- `Boolean, String, Number 型`の`プリミティブ型`を細分化したもの
- コードを記述するときの補完に役立つ
- 予期せぬ値を防ぐ
- タイポも防ぐ

#### Boolean Literal Types

- 型指定したもの以外は、エラーになる

```javascript
ex1
👌 const foo: false = false;
👎 const baz: true = false;
```

#### String Literal Types

- タイポしたら、エラーになる

```javascript
ex1
👌 const foo: "foo" = "foo";
👎 const baz: "baz" = "bar";
```

#### Number Literal Types

```javascript
ex1
👌 const foo: 0 = 2;
👎 const baz: 2 = 2;
```

##### props foo の型が boolean の場合

```javascript {.line-numbers}
ex1;
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
ex1;
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
- `Literal type` だけではない！
- 以下の 3 つの対策で、`string Literal type` を拡張されずに型を維持できる

```javascript
ex1;
const foo = "foo"; /** string Literal type */
let bar = foo;
/** barは、string Literal typeではなく、string型に拡張されてしまう */
```

```javascript
ex2
const foo = "foo" as "foo"; /** 型アサーションで、string Literal type のまま型を維持できる*/
let bar = foo;
```

```javascript
ex3
const foo = "foo" as const; /** constアサーションで、string Literal type のまま型を維持できる*/
let bar = foo;
```

## #6 Array, Tuple, Any, Unknown, Void, Never

### Array

```javascript
ex1
👌 const foo: number[] = [1, 2, 3];
👎 const bar: number[] = [1, "2", 3];
👌 const baz: Array<number> = [1, 2, 3];
```

##### Union type

```javascript
ex1;
const kyun: (number | string)[] = [1, "2", 3];
```

### Tuple

- 一つ一つの要素に対して型をつけることができる
- 要素の順番が決まっている
- 要素の数が決まっている

```javascript
ex1;
const foo: [string, number] = ["foo", 1];
```

#### メリット

- 要素が持っているメソッドを補完してくれる

### Any

- 型が不明なときに、型チェックを無効にして、コンパイルを無理やり通す時に使われる
- 基本的に多用して良いものではない
- js から Ts に型付けする場合、全てを変更できないため、一度 `any 型`にして順を追って型付けしていく

```javascript
ex1
👌 const foo: any = true;
👌 const bar: any = 123;
👌 const baz: any = "kyun";
```

### Unknown

- `型が不明な時に使う点は、any` と似ている
- `any` より安全にしたい場合に使われる
- 利用するときに型がしっかりと評価されるため安全

```javascript
ex1
👌 const foo: unknown = true;
👌 const bar: unknown = 123;
👌 const baz: unknown = "kyun";
```

```javascript
ex2
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
ex1
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
ex1;
const foo = (): void => {
  console.log("hello");
};

const foo: () => void = () => {
  console.log("hello");
};
```

##### 型を外出しする

```javascript
ex1;
type Foo = () => void;

const foo: Foo = () => {
  console.log("hello");
};
```

### Never

- 発生し得ない値の型に対して` Never 型`は付与する

```javascript
ex1;
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

## #7 オブジェクト

- 非プリミティブ型のオブジェクト
- 辞書型としてのオブジェクト

```javascript
ex1
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
ex1;
let obj3: Record<string, unknown> = {};
let obj4: { [key: string]: unknown } = {};

obj3.foo = "bar";
obj4.foo = "baz";
```

##### 空オブジェクトを定義する プロパティを追加したくない場合

```javascript
ex1;
let obj3: Record<string, never> = {};
let obj4: { [key: string]: never } = {};

obj3.foo = "bar";
obj4.foo = "baz";
```

##### プロパティがある状態

```javascript
ex1;
let obj3: Record<string, unknown> = {
  // string[0]は、キー部分
  a: 1,
  b: "foo",
};
```

## #8 Intersection Types（交差型）と Union Types（合併型）

### Intersection Types（交差型）

#### Intersection Types とは

- 複数の型を 1 つにまとめることができるもの
- 型に名前がつけられる

##### どのような場面で使うのか

- 型が長すぎる場合
- コードの見通しを良くする
- `プリミティブ型`は合体できるが、`never型`となる

```javascript
ex1
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

### Union Types（共用型、合併型）

#### Union Types とは

- 複数の型があった場合、どれか 1 つの型が成立すれば OK
- 両方の型を満たしていても、OK
- `プリミティブ型`でもかなり使われる
- `Literal types` でもよく使われる

```javascript
ex1;
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
ex1;
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
ex1;
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

## #9 Interface と Type Alias との違い

### 宣言できる型に違いがある

- `interface` の場合
  - 宣言できるものが、オブジェクト
  - `string 型`、`number 型`などは、エラーになる
- `type alias` の場合
  - なんでも表現できる

### Open ended に準拠しているか

- Open ended とは、同じ宣言名があった場合、自動的にマージされる性質のこと

##### interface は準拠していて、マージされる

```javascript
ex1;
interface Foo {
  a: number;
}
interface Foo {
  b: number;
}

const foo: Foo = {
  /** マージされている */
  a: 1,
  b: 1,
};
```

##### type alias は準拠していないので、マージされない

```javascript
ex1
/** エラーが出る */
type Foo {
  a: number;
}
type Foo {
  b: number;
}

const foo: Foo = {
  a: 1,
  b: 1,
};
```

### Type Alias の記述方法

```javascript
ex1;
type Foo = {
  a: number,
};

const foo: Foo = {
  a: 1,
};
```

### Interface の記述方法

```javascript
ex1;
interface Foo {
  a: number;
}

const foo: Foo = {
  a: 1,
};
```

#### 継承 （型の拡張）方法が違う

##### Interface の記述方法

```javascript
ex1;
interface Foo {
  a: number;
}
interface Bar extends Foo {
  b: number;
}

const foo: Bar = {
  a: 1,
  b: 1,
};
```

##### Type Alias は継承ができない

```javascript
ex1;
type Foo = {
  a: number,
};
type Bar = Foo & {
  /** intersection typeで、＆を使って追加することしかできない！！ */
  b: number,
};

const foo: Bar = {
  a: 1,
  b: 1,
};
```

- ### プロパティをオーバーライドしたときの違い

- 予期せぬ値を事前に防ぐことができる

```javascript
ex1;
type Foo = {
  a: number,
};
type Bar = Foo & {
  a: string,
};

const foo: Bar = {
  /** プロパティにエラーが出る   */

  a: 1,
};
```

```javascript
ex2;
interface Foo {
  a: number;
}
interface Bar extends Foo {
  /** Barにエラーが出る */
  a: string;
}

const foo: Bar = {
  a: 1,
};
```

### Mapped Types が使えるかどうか

#### Mapped Types とは、他の型をもとに新しい型を作るための方法

- `Interface` は、使えない
- `Types Alias` は、使える

```javascript
ex1
type Animals = "dog" | "cat";

type Foo = {
  [key in Animals]: number;

  // dog: number;
  // cat: number;
};

const foo: Foo = {
  dog: 1,
  cat: 2,
};
```

### どっちを使えばいいか

#### type alias

- プリミティブ型や配列を使うことができる
- `open-ended` に準拠していない方が勝手にマージされなくて済む
- 必要性から考えても、プロパティのオーバーライドを考えなくてもいい
- `Mapped types` が使える

## #11 型宣言ファイル（d.ts） と外部パッケージ利用について

#### d.ts ファイルの所在( Next.js の場合 )

> node_modules > next > types > index.d.ts

#### d.ts ファイルとは

- 型定義ファイルのこと

#### 型定義ファイルとは

- ライブラリを利用する側に型を通達するためのファイル

## #12 外部パッケージが TypeScript 製でない場合の型の利用

#### React 版 d.ts ファイルの所在

> node_modules > @type > react > index.d.ts

- React は、TypeScript 製ではない

- @type の配下にあるものは、外部パッケージ自体が型定義ファイルを内容していないときに@type を使って型を外部から提供する

- DefinitelyTyped( DefinitelyTyped / types )は、型定義ファイルが格納されている外部パッケージ

- React は、DefinitelyTyped で配信されている外部パッケージをもとに型定義を読み込んでいる

#### インストール方法（読み込み方法）

> 例 @types/react

### TypeScript で開発する際のパッケージの選びかた

- GitHub のスター数
- 最新のコミット
- ==型がちゃんと使えるかどうか==

  ##### ①typescript 製であること

  - GitHub の `language` を見て、typescript の比率を確認する
  - 型定義ファイルを機械的に自動生成できるから、間違いはない

  ##### ② 例）Day.js は、javaScript で 100%作成されているが、リポジトリ内に内包されている

  - `index.d.ts `が劣っている可能性がある
  - `index.d.ts `は人間が記述しているので、間違う可能性がある

  - メンテナーが携わっている可能性が高いため、パッケージと型定義のズレがあまり考えにくい

  ##### ③Definitely Typed に型定義があるもの

  - メンテナーが携わっている可能性が低いため、パッケージと型定義のズレが出てくることが考えられる

  ##### 👎 Javascript で作成されているパッケージで、型定義ファイルが DefinitelyTyped にもない

  - ==そのパッケージは避けなければならない==
  - 型が any になってしまう

### ts ファイルをコンパイル

> npx tsc index.ts

- index.js が生成される

> npx tsc index.ts -d

- index.js と index.d.ts と型定義ファイルも同時に生成される

## #13 typeof と keyof

- どちらも==型クエリー==と呼ばれるもの
- `型クエリー`とは、指定したものから型をコピー（キャプチャ）するためのもの
  - 自分で宣言した変数
  - 外部パッケージからインポートしてきた関数

#### typeof

- ==型定義以外==のものに使う
- 型推論で導かれた型定義もキャプチャすることができる
- `Literal Types`を設定しても、==型アノテーションを指定した型==が優先されてしまう

```javascript
ex1;
export const foo: string = "123";

type Foo = typeof foo;
```

##### UseCase

```javascript
ex1;
export const obj1 = {
  foo: "foo",
  bar: "bar",
};

const obj2: typeof obj1 = {
  foo: "aaaa",
  bar: "bbbb",
};
```

```javascript
ex1;
export function double(x: number | string) {
  if (typeof x === "string") {
    return Number(x) * 2; /** if文で、xはstring型と絞り込んでいる */
  }
  /** それ以外は、number型になる */
  return x * 2;
}

console.log(double(3));
```

#### keyof

- ==型定義に対して==使う`型クエリー`
- `Literal Types`のプロパティ名を`Literal Types`として一覧で取得できるもの

```javascript
ex1
export type obj = {
  foo: string;
  bar: number;
};

type key = keyof obj;

const key: key = "foo";
```

##### typeof と keyof を組み合わせることができる

- `keyof`はプロパティ名が`string`の場合に限るわけではない

```javascript
ex1
export const Obj = {
  foo: "foo",
  111: "bar",
};

// type Obj = typeof Obj;
// type key = keyof Obj;

type key = keyof typeof Obj;

function test(x: key){ /** type key = "foo" | 111 */
  return;
}

test("foo")
```

## #14 ダウンキャストとアップキャスト

- どちらも==型を変える行為==のこと

#### ダウンキャスト

- 型推論で導かれた型が抽象的すぎる場合、プログラマー側で型を詳しくすること
- 抽象度の高い型をより詳しい型にしていくこと

#### アップキャスト

- 抽象的にすること
- ==あまり使うべきではない==
- 型を自分の力だけでは解決できない場合に使う

```javascript
ex1;
export const color = "red"; /** color: "red" */

const theme = {
  color: "red" /** color: string */,
};
```

- TypeScript が JavaScript の仕様に基づいてつくられている
- 仮に string ではなく"red"で推論されたとして、後から変更できてしまうと不都合が起きる
- オブジェクトの中のプロパティに対しては`Literal Types`で==宣言されることがない仕様==になっている

```javascript
ex1;
export const color = "red";

color = "blue";

const theme = {
  color: "red",
};

theme.color = "blue";
```

##### ダウンキャストの例

==string に対して、string でダウンキャストしなければならない==

```javascript
ex1
const theme = {
  color: "red" as "red", /** color: "red */
  color: "red" as const, /** color: "red */
};
```

###### const でダウンキャストしたものを`const assertion`

- 複数のダウンキャストされたプロパティをまとめた記述
- readonly が付与される
- widening を抑止することができる
- 何かしらの定数ファイルをつくる時によく使われる
  ( 基本的に`as const`をつける )

```javascript
ex1
const theme = {
  /** const theme: {
    readonly color: "red";
    readonly backgroundColor: "blue";
}
{ color: 'red', backgroundColor: 'blue' } */

  color: "red",
  backgroundColor: "blue",
} as const;

ex2
export const color = "red" as const;
let x = color;
/** let x: "red" */

ex3
function foo () = {
  return {foo: "foo"} as const
}

const y = foo();


export const PATH = {
  INDEX: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
} as const;

PATH.INDEX = "/";

/** const PATH: {
    readonly INDEX: "/";
    readonly LOGIN: "/login";
    readonly REGISTER: "/register";
    readonly PROFILE: "/profile";
}
*/
```

### Non-null assertion と Double assertion

##### Non-null assertion（使うべきではない、危険！）

```javascript
ex1
export function getFirstError(str?: string) {
/** undefinedの可能性を、! で無理やり消し去る */
  return str!.charAt(0);
}

改善策
export function getFirstError(str?: string) {
  if (!str) { /** 型ガード */
    return;
  }
  return str.charAt(0);
}
```

##### Double assertion (あまり使うべきではない、危険！)

- 1 度目の`as`では`アップキャスト`、2 度目の`as`では`ダウンキャスト`している
- 外部のパッケージの型が間違っている場合に==型を書き換えるために使う==

```javascript
ex1
export function getFirstError(str: number) {
  return (str as unknown as string).charAt(0);
  /** strを一旦、unknownに変更してから、stringに変更となる */
}
```

## #15 Index Signature と Mapped types

### Index Signature

- どのような時に使うか
  - オブジェクトのプロパティを==動的に追加したい時に使う==
  - 型を追記することで、型を絞り込むことができない

```javascript
ex1;
export type User = {
  name: string,
  [key: string]: string /** key の部分はなんでも良い 例)aaaa */,
  /** []の部分が、Index Signature */
};

const user: User = {
  name: "きゅん",
  account: "kyun_it",
  job: "Engineer",
};
```

- 型が増えていく時に、Union types に追記しなければならないのはデメリット

```javascript
ex1;
export type User = {
  name: string,
  age: number,
  [key: string]: string | number,
  /** number型を追記し、Union typeにすることでエラーを回避できる */
};

const user: User = {
  name: "きゅん",
  age: 47,
  account: "kyun_it",
  job: "Engineer",
};
```

- 指定していないプロパティを設定すると、`undefined`では無く、型が指定されてしまうのがデメリット

```javascript
ex1;
user.firstName;
/** (index) User[string]: string | number */
```

### Mapped types

- 汎用的
- Typescript でも色々なことに応用できる

① オブジェクトのプロパティ名を限定するときに使える
② ジェネリクスと組み合わせて便利な型をつくり出す時に使える

```javascript
ex1
export type User = {
  name: string;
} & PersonalData;

type PersonalData = {
  //   height: number;
  //   weight: number;
  [key in "height" | "weight"]: number;
};

const user: User = {
  name: "きゅん",
  height: 176,
  weight: 80,
};
```

- `[key in 〇〇]`の型を別の型から参照することができる

```javascript
ex1
export type User = {
  name: string;
} & PersonalData;

type Foo = "height" | "weight";

type PersonalData = {
  //   height: number;
  //   weight: number;
  [key in Foo]: number;
};

ex2: keyofを使う

type Foo = {
  height: number;
  weight: number;
};

type PersonalData = {
  [key in keyof Foo]: number;
};

ex3: 変数から値を参照する

const foo = {
  height: 200;
  weight: 100;
};

type PersonalData = {
  [key in keyof typeof foo]: number;
};

ex4: オプショナルにすることにより、一括で指定する
注: Index Signatureではできない
export type User = {
  name: string;
} & PersonalData;

type PersonalData = {
  /**
    type PersonalData = {
    height?: number | undefined;
    weight?: number | undefined;
  */
  [key in "height" | "weight"]?: number;
};

ex5:一括でオプショナル指定できる
type PersonalData = {
  height: number;
  weight: number;
};

type OptionalPersonalData = {
  [k in keyof PersonalData]?: PersonalData[k];

  /**
    type OptionalPersonalData = {
    height?: number | undefined;
    weight?: number | undefined;
} */
};

ex6:オプショナルを必須にする方法
type PersonalData = {
  height?: number;
  weight?: number;
};

type RequiredPersonalData = {
  [k in keyof PersonalData]-?: PersonalData[k];
  /** Mapped typesで、「-」:ハイフンをオプショナル前に追記する  */
};
```

## #16 type Guard

#### type Guard とは

- 型の絞り込み
- 型が複数存在する場合、タイプガードを使うことによって型を特定していくこと

#### type Guard の種類（基礎的）

##### typeof を使った Type Guard

- if 文の中の`return` を忘れるとコードのなかが実行されない
- `return`によって、型の絞り込みが可能

```javascript
ex1;
export const foo = (value: string | number | boolean) => {
  if (typeof value === "string") {
    return value; // value: string
  }
  if (typeof value === "number") {
    return value; // value: number
  }
  return value; // value: boolean
};
```

#### js のメソッドや演算子を使った Type Guard

```javascript
ex1;
export const foo = (value: string | string[]) => {
  if (Array.isArray(value)) {
    /** isArrayは、引数が配列かどうか判断する */
    return value; // value: string[]
  }

  return value;
};
```

#### 演算子を使った例

```javascript
export const foo = (value?: string) => {
  if (!value) {
    // value: string | undefined
    return value;
  }

  return value;
  //  value: string
};
```

#### in 演算子を使った Type Guard

- プロパティ:`nickName` が、UserB にしか指定がない場合（==全てにプロパティが指定されていない==）

```javascript
ex1;
type UserA = { name: string };
type UserB = { name: string, nickName: string };

export const foo = (value: UserA | UserB) => {
  if ("nickName" in value) {
    // valueのなかに"nickNameがあるかどうか精査"
    return value; // UserB
  }

  return value; // UserA
};
```

#### タグ付き Union Types を使った Type Guard(Discriminated Union, Tagged Union)

- プロパティ:`nickName` が、全てにが指定されている場合
- 実践でかなり使われる手法

```javascript
ex1: if文;
type UserA = { name: string, lang: "ja" };
type UserB = { name: string, lang: "en" };

export const foo = (value: UserA | UserB) => {
  if (value.lang === "ja") {
    // valueのlangが、"ja"なら〜"
    return value; // UserA
  }

  return value; // User B
};

ex2: switch文;
type UserA = { name: string, lang: "ja" };
type UserB = { name: string, lang: "en" };
type UserC = { name: string, lang: "fr" };

export const foo = (value: UserA | UserB | UserC) => {
  switch (value.lang) {
    case "ja": {
      return value;
    }
    case "en": {
      return value;
    }
    case "fr": {
      return value;
    }
    default: {
      throw new Error("lang is not defined!");
      return value;
    }
  }
};
```

## #17 ユーザー定義の型ガード

#### ユーザー定義の Type Guard がなぜ必要か

- 関数の返り値が true の場合、`is 〇〇〇`で指定した型が適用される

```javascript
ex1
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  _/** user is UserA で、型はUserAが適用される */
  return user.lang === "ja";
  /** value: UserA */
};

export const foo = (value: UserA | UserB) => {
  if (value.lang === "ja") {
    return value;
  }
  return value;
};

ex2
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang === "ja";
};

export const foo = (value: any) => {
  if (isUserA(value)) {
    return value; // value: UserA
  }
  return value; // value: any
};
```

#### Use Case

- 非同期処理
  - 非同期処理で得たデータは、型がついていないことが多い
- filter 関数
  - Typescript がまだ未完成
  - 型まで絞り込むことができない

```javascript
ex1:非同期処理でのtype guardの指定方法

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang === "ja";
};

export const foo = async () => {
  const res = await fetch("");
  const json = await res.json();
  if (isUserA(json)) {
    return json.lang;
  }
};

ex2:filter関数だけでは型を絞り込めない
const users: (UserA | UserB)[] = [
  {
    name: "きゅん",
    lang: "ja",
  },
  {
    name: "たろう",
    lang: "ja",
  },
  {
    name: "レン",
    lang: "en",
  },
];

const users: (UserA | UserB)[] = [
  {
    name: "きゅん",
    lang: "ja",
  },
  {
    name: "たろう",
    lang: "ja",
  },
  {
    name: "レン",
    lang: "en",
  },
];

👎 const japanese = users.filter((user) => user.lang === "ja");
/**
 * const japanese: (UserA | UserB)[]
[ { name: 'きゅん', lang: 'ja' }, { name: 'たろう', lang: 'ja' } ]
 */
👌 const japanese1 = users.filter(isUserA);
/**
 * const japanese1: UserA[]
[ { name: 'きゅん', lang: 'ja' }, { name: 'たろう', lang: 'ja' } ]
 */

```

## #18 Generics の基礎（重要）

- 外部パッケージは`Generics`を前提に作られていることが多い
- 外部パッケージの`メソッド`に型をつけることができない

#### Generics とは

- 型の決定を遅延できるもの

##### 由来

- T → Type の ==T==
- K → Key の ==K==
- U → Unknown の ==U==
- E → Element の ==E==

```javascript
ex1: 構文;
type Foo<T> = {
  value: T, // 構文
};

// 型の定義を後から指定することができる
const foo1: Foo<string> = {
  value: "",
};

const foo2: Foo<boolean> = {
  value: true,
};

const foo3: Foo<number> = {
  value: 47,
};
const foo4: Foo<number[]> = {
  value: [1, 2, 3, 4, 5],
};
```

```javascript
type User<T> = {
  name: string,
  state: T,
};
0;

/** ここではじめて型の決定が行われている */
type Japanese = User<"東京都" | "大阪府">;
type American = User<"CA" | "NY">;

const user1: Japanese = {
  name: "田中",
  state: "大阪府",
};

const user2: American = {
  name: "Nancy",
  state: "CA",
};
```

#### Generics の初期値

```javascript
ex1: Normal;
type Foo<T> = {
  value: T,
};

const foo1: Foo<string> = {
  value: "",
};

const foo2: Foo<number> = {
  value: 111,
};

ex2: Better;
type Foo<T = string> = {
  value: T,
};

const foo1: Foo = {
  // foo1にstringが付与されている
  value: "",
};

const foo2: Foo<number> = {
  value: 111,
};
```

#### extends を使った型の制約

- `Generics` の型引数に制約を加えたい時に `extends` を使う
- `extends`による型の制約が使われる

```javascript
type Foo<T extends string> = {
  value: T;
};

const foo1: Foo<string> = {
  value: "",
};

const foo2: Foo<number> = { // エラー発生
  value: 111,
};

const foo2: Foo<"bar"> = {
  value: "bar",
};

```

### 初期値と extends は同時に用いることが可能

```javascript
type Foo<T extends string | number = string> = {
  value: T;
};

const foo1: Foo = {
  value: "",
};
```

## #19 関数の Generics

- <>`Generics`の型が決まることで、引数（）内が決定

```javascript
ex1:基本構文/ 関数宣言

function foo<T>(arg: T) {
  return { value: arg };
}

const foo1 = foo<number[]>([1, 2]);
const foo2 = foo<string[]>(["a", "b"]);

ex2:基本構文/ 関数式・アロー関数
注: 引数の（）の前に Generics を指定

const foo = <T>(arg: T) => {
  return { value: arg };
};

```

#### 暗黙的な型解決

- Generics を指定しなくてもエラーにならない
- 引数をみて、`型推論`されるため

```javascript
ex1:
const foo2 = foo("");
const foo3 = foo(1);
const foo4 = foo(false);
```

- 型引数を使う場合はどんなときか

  - `Nullable`な場合
    - `Nullable` : `null` になりうる値

```javascript
ex1:
const foo2 = (foo < string) | (null > "");
```

#### extends による制約

- Typescript で開発するにはかなり重要！
- 引数の型の特定に必要(`unKnown`)

```javascript
ex1:error
const foo = <T extends string>(arg: T) => {
  return { value: arg };
};

const foo2 = foo<string | null>("");
/** null型は共用できないため、エラーになる */

ex2:OK
const foo = <T extends string | number | boolean[]>(arg: T) => {
  return { value: arg };
};

const foo2 = foo<string>("");
const foo3 = foo(1);
const foo4 = foo([false]);
```

- 型の絞り込みがないと、==メソッドの補完が出現しない==

```javascript
const foo = <T extends string | number>(arg: T) => {
  if (typeof arg === "string") {
    return { value: arg.toUpperCase() };
    /** string型のメソッドの補完が出現 */
  }
  return { value: arg.toFixed() };
  /** number型のメソッドの補完が出現 */
};

```

## #20Generics の型引数が複数あるパターンや Lookup types との併用

### Generics の型引数が複数あるパターン

- `初期値`や `extends` の制約を付け加えることが可能

```javascript
ex1: 基本構文;
const foo = <T, K, U>(foo: T, bar: K, baz: U) => {
  return {};
};

ex2:初期値、extends
const foo = <T extends string, K extends number, U = boolean>(
  foo: T,
  bar: K,
  baz: U
) => {
  return {};
};
```

### Generics と Lookup Types が合わさったパターン

```javascript
ex1:Lookup types
type Obj = {
  a: number,
};

type Foo = Obj["a"];
/** a が補完で出現する */

ex2:Genericsと型引数が複数の合わさった場合
const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};
// Genericsの型引数1番目のTは、第2型引数でも使うことができる
// Kにはobjのkeyが格納される

ex3:Use Case
const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

const hoge = getProperty(obj, "baz"); // 3 number
// bazを入力する前に補完が出現


ex4:Use Case
const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  obj[key] = value;
};

const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

setProperty(obj, "bar", 100);
```

### Generics を用いた例

- map 関数が Generics を内包していて、暗黙的な型解決でうまく推論している

```javascript
ex1: JSのメソッド map関数
const foo = [1, 2, 3].map((v) => v.toString());
// const foo: string[]
```

```javascript
ex1: 外部パッケージの型（Next.js）
注: コードジャンプして型を追求する
const Home: NextPage<{ foo: number }> = (props) => {
  props.foo

export type NextPage<Props = {}, InitialProps = Props> = NextComponentType<
  NextPageContext,
  InitialProps,
  Props
>
```

## #21Conditional Types と infer

#### Conditional Types とは

- 型の条件分岐を行なって型の推論を行うためのもの

```javascript
ex1:基本
type Props = {
  id: string;
  name: string;
  age: number;
};

type FilterString<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

type StringKeys = FilterString<Props>;
/** type StringKeys = "id" | "name" */


ex2:異なった記法
type Filter<T, U> = {
  [k in keyof T]: T[k] extends U ? k : never;
}[keyof T];

type StringKeys = Filter<Props, string>;
/** type StringKeys = "id" | "name" */

type NumberKeys = Filter<Props, number>;
/** type NumberKeys = "age" */

type BooleanKeys = Filter<Props, boolean>;
/** type BooleanKeys = never */
```

==- `<T>`には、`type Props` の型が格納==
==- `[k in keyof T]`は、`T` のキーが、`K` に格納する==
==- `T[k]`は、`Lookup types` は、`value` を格納する==
==- `T` は、Props==
==- `K` `は、id`, `name`, `age`==
==- `extends` は、`string` の互換性を満たすものが格納するかどうか==
==- `string` の互換性は、`id`, `name` のみ満たす==
==- `[keyof T]`で`id`, `name` の`value`が格納される==

==- `string`が`U`に格納される==

#### Infer とは

- 部分的な型抽出のこと
- `Conditional Types` と同時に使われる
- 関数の返り値だけ必要な場合に使用される

==- `(() => infer U)`の関数を満たしていれば、==
==- `infer U`は、関数の返り値という部分的ものだけ==

```javascript
ex1:
const foo = () => {
  return "";
};

type Return<T> = T extends (() => infer U) ? U : never;

type Foo = Return<typeof foo>;
/** type Foo = string */

ex2: numberを返して欲しい場合
const foo = (id: string) => {
  return 0;
};

type Return<T> = T extends (id: string) => infer U ? U : never;

type Foo = Return<typeof foo>;
/** type Foo = number */

ex3: stringを返して欲しい場合
const foo = (id: string) => {
  return 0;
};

type Return<T> = T extends (id: infer U) => number ? U : never;

type Foo = Return<typeof foo>;
/** type Foo = string */

ex4: 引数が複数の場合
const foo = (id: string, name: string) => {
  return 0;
};

type Return<T> = T extends (...args: infer U) => number ? U : never;

type Foo = Return<typeof foo>;
/** type Foo = [id: string, name: string] */

ex5:stringだけ
const foo = (id: string, name: string) => {
  return 0;
};

type Return<T> = T extends (...args: [infer U, ...any[]]) => number ? U : never;

type Foo = Return<typeof foo>;
```

## #22 実践でも多用される Utility Types

- 便利な型のライブラリ集

#### 型の変更をしなければならない場面がある

- 関数の返り値の型が欲しい
- オブジェクトのそれぞれのプロパティを`Readonly`にしたい

```javascript
ex1:Utility Typesを使った型操作

const foo = (id: string, name: string) => {
  return 0;
};

type Foo = ReturnType<typeof foo>;
```

#### Typescript が開発している Utility Types

```javascript
ex1: 基本の型;

type User = {
  name: string;
  age: number | null;
  country?: "US" | "UK" | "JP";
};

const user: User = {
  name: "きゅん",
  age: 47,
};


ex2: readonly: プロパティを変更させない;

type User = {
  name: string;
  age: number | null;
  country?: "US" | "UK" | "JP";
};

type ReadOnlyUser = Readonly<User>;

const user: ReadOnlyUser = {
  name: "きゅん",
  age: 47,
};

user.age = 20; // エラーになる


ex3: Partial: 各プロパティを optional にする;

type User = {
  name: string;
  age: number | null;
  country?: "US" | "UK" | "JP";
};

type PartialUser = Partial<User>;

const user: PartialUser = {
  name: "きゅん",
};


ex4: Required: 全てを必須にする

type User = {
  name: string;
  age: number | null;
  country?: "US" | "UK" | "JP";
};

type RequiredUser = Required<User>;

const user: RequiredUser = {
  name: "きゅん",
  age: 47,
  country: "UK",
};


ex5: Pick: オブジェクトがあった場合、必要なプロパティを選んで新しいオブジェクトを返す

type User = {
  name: string;
  //   age: number | null;
  country?: "US" | "UK" | "JP";
};

type PickUser = Pick<User, "name" | "country">; // 第2引数に必要な型

const user: PickUser = {
  name: "きゅん",
  country: "UK",
};


ex6: Omit: 必要のないプロパティを排除して、新しいオブジェクト型を生成する

type User = {
  name: string;
  //   age: number | null;
  country?: "US" | "UK" | "JP";
};

type OmitUser = Omit<User, "age">; // 第2引数に不必要な型

const user: OmitUser = {
  name: "きゅん",
  country: "UK",
};


ex7: Extract:第1型引数と第2型引数から互換性のある型だけを残して、新しい型を生成するもの

type Foo = Extract<string | number, string>;
/** type Foo = string */

type Foo = Extract<"kyun" | number, string>;
/** type Foo = "kyun" */


ex8: Exclude: 第1型引数と第2型引数から互換性のない型だけを残して、新しい型を生成するもの

type Foo = Exclude<string | number, string>;
/** type Foo = number */


ex9: NonNullable: 型引数で指定した型から、null と undefined を除いたもの

type Foo = NonNullable<string | null | undefined>;
/** type Foo = string */


ex10: Record:
・第1型引数が key で、第2型引数が value になる
・オブジェクト型のkeyとプロパティの型を指定できる

type Foo = Record<"hoge" | "fuga", number>;

const obj: Foo = {
  hoge: 1,
  fuga: 2,
  aaa: 3,  // エラーになる
};


ex11: Parameters: 関数の引数の型をTupleとして取得する

function foo(a: string, b: number[], c: boolean) {
  return;
}

type Foo = Parameters<typeof foo>;
/** type Foo = [a: string, b: number[], c: boolean]type Foo = [a: string, b: number[], c: boolean] */


ex12: Uppercase: 型引数名をすべて大文字にする

type Foo = Uppercase<"kyun">
/** type Foo = "KYUN" */


ex13: Lowercase: 型引数名をすべて小文字にする

type Foo = Lowercase<"KYUN">
/** type Foo = "kyun" */


ex14: Capitalize: 型引数名の先頭文字を大文字にする

type Foo = Capitalize<"apple">;
/** type Foo = "Apple" */


ex15: Uncapitalize: 型引数名の先頭文字を小文字にする

type Foo = Capitalize<"Apple">;
/** type Foo = "apple" */

```

## #23 外部パッケージの Utility Types

[type-fest](https://github.com/sindresorhus/type-fest)

- メンテされていて、スター数も多め

```javascript
ex1: Partial

type User = {
  name: string;
  age: number | null;
  address: {
    country: "US" | "UK" | "JP";
  };
};

type PartialUser = Partial<User>;


* ネストされた country には option が付与されない

/** type PartialUser = {
    name?: string | undefined;
    age?: number | null | undefined;
    address?: {
        country: "US" | "UK" | "JP";
    } | undefined;
}
 */

const user: PartialUser = {
  name: "きゅん",
  address: {},  // エラーになる
};


ex2: PartialDeep: インストールが必要

import { PartialDeep } from "type-fest";

type User = {
  name: string;
  age: number | null;
  address: {
    country: "US" | "UK" | "JP";
  };
};

type PartialUser = PartialDeep<User>;

const user: PartialUser = {
  name: "きゅん",
  address: {},
};

/** type PartialUser = {
    name?: string | undefined;
    age?: number | null | undefined;
    address?: PartialObjectDeep<{
        country: "US" | "UK" | "JP";
    }, {}> | undefined;
}

{ name: 'きゅん', address: {} }
*/
```

## #24 型拡張の技術 ①

#### なぜ学ぶ必要があるのか

- 型がないものや型はあるが不十分なものに対して型を付けたり、拡張する

#### 同じ名前空間で指定された定義された interface は、後から拡張可能

```javascript

ex1: 名前空間が同じでも、MyNamespace で囲むとエラーが消える

export type User = {
  name: string;
};

namespace MyNamespace {
  export const name = "きゅん";
  export type User = {   // exportが必要！
    name: string;
  };
}

type Foo = MyNamespace.User; // 補完あり
const foo = MyNamespace.name; // 補完あり


ex2: type → interfaceだとマージされる

export type User = {
  name: string;
};

namespace MyNamespace {
  export interface User {
    name: string;
  }
}

namespace MyNamespace {
  export interface User {
    age: number;
  }
}

type Foo = MyNamespace.User["name or age"]; // 補完が出現
```

#### アンビエント宣言(declare)

- `declare`とは、`Typescript`に対して型の情報だけを伝える
- 基本的には実装は含めてはならない
- Js で型がない場合、typescript で扱うとき、後からアンビエント宣言で型を付与することができる

```javascript
ex1: declare

declare var x: number;
x = 0;

ex2: アンビエントコンテキスト: exportの挙動が通常と異なる
自動的にexportが付与される

export type User = {
  name: string;
};

declare namespace MyNamespace {
  export interface User { //  アンビエントコンテキスト
    name: string;
  }
}

type Foo = MyNamespace.User;

ex3:
declare namespace MyNamespace {
  interface User {  // exportが必要がない
    name: string;
  }
}

type Foo = MyNamespace.User;
```

#### アンビエントコンテキストを全体に反映させている `d.ts` 型定義ファイル

##### ==module → import / export がある==

##### ==script → import / export がない==

```javascript
/**
 * 独立したexport宣言を持っていない場合( global: window配下にある状態 )
 */

var x: number;

/**
 * 独立していないexport宣言
 */

export const foo;

/**
 * 独立したexport宣言
 */

export {};
export default baz;
```

#### 環境変数の型を拡張

```javascript
ex1: global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly FOO: string;
  }
}

// tsファイル
process.env.FOO // 補完が出現


ex2: global.d.ts

declare global { // こちらで強制的にグローバル設定をすることができる
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly FOO: string;
    }
  }
}

export {}; // グローバルで無くなってしまう

// tsファイル
process.env.FOO // 補完が出現
```

## #25declare module を使って型定義を拡張する

#### Js・Typescript において、==1 module = 1 ファイル==

- 現代の開発は、`module`単位が基本

```javascript

ex1: 基本構文
index.ts
import foo from "foo";

foo.bar // barの補完が出現

global.d.ts
declare module "foo" {
  const bar: number;
}
 // 定義することで index.tsのエラーが消える
```

### モジュール拡張とアンビエントモジュールの違い

- global.d.ts で記述
- declare module の`{}の中`で記述すると==モジュール拡張==
- declare module の`{}以外`で記述すると==アンビエントモジュール==

```javascript
ex: アンビエントモジュール:ファイル内にimportやexportがない

declare module "foo" {
  const bar: number;
}

ex: モジュール拡張:ファイル内にimportやexportがある
import "react";

declare module "foo" {
  const bar: number;
}
```

#### モジュール拡張とアンビエントモジュールの挙動の違い

- 既存の型に型を追加するのが==モジュール拡張==
- 既存の型に型があっても、上書きして新しく型を宣言するのが==アンビエントモジュール==

```javascript
ex1: アンビエントモジュール
index.ts
import { FC, bar } from "react";

// FCが、exportされていないとエラーが出現

global.d.ts
declare module "react" {
  const bar: number;
}
```

#### declare module 内で定義したものが自動的に export になる

- `declare module` 内に独立した `export` 宣言がないことが条件
- `モジュール拡張`でも`アンビエントモジュール`でも同じ

```javascript
ex1: 独立したexport宣言がない
index.ts
import { bar } from "react"; // エラーなし

global.d.ts
declare module "react" {
  const bar: number;
}

ex2: 独立したexport宣言がある
index.ts
import { bar } from "react"; // エラーあり

global.d.ts
declare module "react" {
  const bar: number;
  export default hoge;
}
```

#### モジュール拡張とアンビエントモジュールの実践的な型拡張の例

`CFC = className を持った FunctionComponent`

```javascript
ex1: CFCのコードジャンプも可能になる
index.ts
import { CFC, FC } from "react";

const Component: CFC = (props) => {
  return <div className={props.className}>test</div>;
};


global.d.ts
import { FC } from "react";

declare module "react" {
  type CFC<p = {}> = FC<p & { className?: string }>;
}

```

#### アンビエントモジュールの実践的な型拡張の例

- `Js` がデフォルトで読み込めないファイルに対して型を定義する
- 読み込んでも型エラーにならない
- `webpack,Vite,SWC`などのバンドラーが`JS`が読み込めないファイルを処理している
- 今回のファイルでは、`Next.js`の型定義を読み込んでいるから

```javascript
ex1: index.tsx: エラーにならない;
import data from "kyun.jpg";

ex2: index.tsx: エラーにならない;
import data from "kyun.mp3";

global.d.ts
declare module "*.mp3" {
  const data: string;
  export default data;
}

```

import { NextPage } from "next";

type Foo = {
  a: number;
  b: string;
};

type Bar = {
  a: string;
  c: boolean;
};

type FooBar = Foo | Bar;

const test: FooBar = {
  /** aは、Number型でもstring型でも、OK */
  a: "",
  b: "",
  c: true,
};

//
if ("b" in test) {
  test.a.toFixed();
}

const Home: NextPage = () => {
  return (
    <>
      <div className="">test</div>
    </>
  );
};

export default Home;

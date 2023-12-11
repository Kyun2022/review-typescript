import { NextPage } from "next";

let obj3: Record<string, unknown> = {
  // string[0]は、キー部分
  a: 1,
  b: "foo",
};

let obj4: { [key: string]: unknown; foo: string } = {
  a: 1,
  s: "foo",
  foo: "foo",
};

const Home: NextPage = () => {
  return (
    <>
      <div className="">test</div>
    </>
  );
};

export default Home;

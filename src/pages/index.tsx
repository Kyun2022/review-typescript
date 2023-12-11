export default function Home() {
  return (
    <>
      <div className="">
        <Component />
      </div>
    </>
  );
}

const foo = "foo" as const; /** constアサーションでstring Literal type のまま型を維持できる*/
let bar = foo;

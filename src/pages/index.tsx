export default function Home() {
  return (
    <>
      <div className="">
        <Component />
      </div>
    </>
  );
}

const foo = (bar: "a" | "b") => {
  switch (bar) {
    case "a":
      return;
    case "b":
      return;
    default:
      bar /** 絶対に到達しない場所、ここが Never となる */
      break;
  }
};

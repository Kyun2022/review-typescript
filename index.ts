export const Obj = {
  foo: "foo",
  111: "bar",
};

// type Obj = typeof Obj;
// type key = keyof Obj;

type key = keyof typeof Obj;

// const key: key = "foo";
function test(x: key) {
  return;
}

test("foo");

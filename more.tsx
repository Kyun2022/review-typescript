type Path = {
  [key: string]: `/${string}`;
};

const path = {
  index: "/",
  about: "/about",
} as const satisfies Path;

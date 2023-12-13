type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };
type UserC = { name: string; lang: "fr" };

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
    default:
   {   throw new Error("lang is not defined!");
      return value;}
  }
};

export const en = {
  signIn: "Sign in",
  signUP: "Sign up",
  napsCount: (count: number) =>
    count === 1 ? `${count} nap` : `${count} naps`,
};

export type Text = typeof en;

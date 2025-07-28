export const ru = {
  signIn: "Войти",
  signUP: "Зарегистрироваться",
  napsCount: (count: number) =>
    count === 1 ? `${count} дневной сон` : `${count} дневных снов`,
} as const;

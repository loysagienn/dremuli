import React, { ReactNode } from "react";
import type { Text } from "./en";

const timeDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} ч`);
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes} мин`);
  }

  return parts.join(" ");
};

export const ru: Text = {
  welcomePage: {
    signIn: "Войти",
    signUp: "Зарегистрироваться",
    trackBabysSleep: "Следите за сном вашего малыша",
    monitorBabysSleep:
      "Понимайте ежедневные привычки сна с помощью наглядного таймлайна и диаграмм.",
  },
  registrationPage: {
    title: "Регистрация",
    email: "Email",
    password: "Пароль",
    agreement: (privacyPolicy: ReactNode, termsOfUse: ReactNode) => (
      <>
        Я согласен с {privacyPolicy} и&nbsp;
        {termsOfUse}
      </>
    ),
    privacyPolicy: "Политикой конфиденциальности",
    termsOfUse: "Условиями использования",
    submit: "Зарегистрироваться",
  },
  loginPage: {
    title: "Войти",
    email: "Email",
    password: "Пароль",
    submit: "Войти",
    forgetPassword: "Забыли пароль?",
  },
  restorePasswordPage: {
    restorePassword: "Восстановление пароля",
    email: "Email",
    submit: "Отправить",
    successMessage:
      "Ссылка для восстановления пароля была отправлена на ваш email",
  },
  navigation: {
    timeline: "Таймлайн",
    statistics: "Статистика",
    profile: "Профиль",
    settings: "Настройки",
  },
  timelinePage: {
    fellAsleep: "Заснула",
    fellAsleepNight: "Заснула на ночной сон",
    wokeUp: "Проснулась",
  },
  daySummary: {
    totalSleep: "Весь сон",
    nightSleep: "Ночной сон",
    nightSplit: "Ночные гуляния",
    napsCount: (count: number) =>
      count === 1
        ? `${count} дневной сон`
        : count > 1 && count < 5
        ? `${count} дневных сна`
        : `${count} дневных снов`,
    awake: "Бодрствование",
  },
  createEvent: {
    fellAsleep: "Заснула",
    wokeUp: "Проснулась",
    submit: "Сохранить",
    cancel: "Отмена",
  },
  updateEvent: {
    title: "Изменить время",
    fellAsleep: "Заснула",
    wokeUp: "Проснулась",
    submit: "Обновить",
    cancel: "Отмена",
    delete: "Удалить",
  },
  timeDuration,
} as const;

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
    exportToJson: "Экспортировать в JSON",
    importFromJson: "Импортировать из JSON",
    share: "Поделиться",
    addSleepSession: "Добавьте ваш первый интервал сна",
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
    commentPlaceholder: "Добавить комментарий...",
  },
  profilePage: {
    title: "Профиль",
    language: "Язык",
    changePassword: "Изменить пароль",
    termsOfUse: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",
    logout: "Выйти",
  },
  changePasswordPage: {
    title: "Изменить пароль",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    submit: "Изменить пароль",
  },
  settingsPage: {
    title: "Настройки",
    theme: "Тема",
    termsOfUse: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",
  },
  statisticsPage: {
    naps: "Интервалы сна",
    charts: "Графики",
    chartsInDevelopment: "Графики в разработке",
    totalSleep: "Весь сон",
    nightSleep: "Ночной сон",
    daySleep: "Дневной сон",
    awake: "Бодрствование",
  },
  exportToJsonModal: {
    inDevelopment: "В разработке",
    title: "Экспортировать в JSON",
    fromDate: "С даты",
    toDate: "По дату",
    export: "Экспортировать",
  },
  importFromJsonModal: {
    inDevelopment: "В разработке",
    title: "Импортировать из JSON",
    creatingEvents: "Создание событий...",
  },
  dropFile: {
    selectFile: "Выбрать файл",
    caption: "Перетащите файл сюда или выберите",
  },
  confirmModal: {
    confirm: "Точно?",
    approve: "Подтвердить",
    decline: "Отмена",
    delete: "Удалить",
    deleteEvent: "Удалить событие?",
  },
  shareModal: {
    title: "Поделиться",
    fromDate: "С даты",
    createLink: "Создать ссылку",
    shareLinkTitle: "Ссылка:",
  },
  timeDuration,
} as const;

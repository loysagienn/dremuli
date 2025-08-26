import React, { ReactNode } from "react";

const timeDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} h`);
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes} min`);
  }

  return parts.join(" ");
};

export const en = {
  welcomePage: {
    signIn: "Sign in",
    signUp: "Sign up",
    trackBabysSleep: "Track your baby's sleep",
    monitorBabysSleep:
      "Understand daily sleep habits through simple timeline and visual charts",
  },
  registrationPage: {
    title: "Sign up",
    email: "Email",
    password: "Password",
    agreement: (privacyPolicy: ReactNode, termsOfUse: ReactNode) => (
      <>
        I agree to the {privacyPolicy} and&nbsp;
        {termsOfUse}
      </>
    ),
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    submit: "Sign up",
  },
  loginPage: {
    title: "Sign in",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    forgetPassword: "Forget password?",
  },
  restorePasswordPage: {
    restorePassword: "Restore password",
    email: "Email",
    submit: "Submit",
    successMessage: "Reset password link has been sent to your email",
  },
  navigation: {
    timeline: "Timeline",
    statistics: "Statistics",
    profile: "Profile",
    settings: "Settings",
  },
  timelinePage: {
    fellAsleep: "Fell asleep",
    fellAsleepNight: "Fell asleep night",
    wokeUp: "Woke up",
    exportToJson: "Export to JSON",
    importFromJson: "Import from JSON",
  },
  daySummary: {
    totalSleep: "Total sleep",
    nightSleep: "Night sleep",
    nightSplit: "Night split",
    napsCount: (count: number) =>
      count === 1 ? `${count} nap` : `${count} naps`,
    awake: "Awake",
  },
  createEvent: {
    fellAsleep: "Fell asleep",
    wokeUp: "Woke up",
    submit: "Submit",
    cancel: "Cancel",
  },
  updateEvent: {
    title: "Update event",
    fellAsleep: "Fell asleep",
    wokeUp: "Woke up",
    submit: "Update",
    cancel: "Cancel",
    delete: "Delete",
  },
  profilePage: {
    title: "Profile",
    language: "Language",
    changePassword: "Change password",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    logout: "Logout",
  },
  changePasswordPage: {
    title: "Change password",
    currentPassword: "Current password",
    newPassword: "New password",
    submit: "Change password",
  },
  settingsPage: {
    title: "Settings",
    theme: "Theme",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
  },
  statisticsPage: {
    naps: "Naps",
    charts: "Charts",
    chartsInDevelopment: "Charts in development",
    totalSleep: "Total sleep",
    nightSleep: "Night sleep",
    daySleep: "Day sleep",
    awake: "Awake",
  },
  exportToJsonModal: {
    inDevelopment: "In development",
    title: "Export to JSON",
    fromDate: "From date",
    toDate: "To date",
    export: "Export",
  },
  importFromJsonModal: {
    inDevelopment: "In development",
    title: "Import from JSON",
    creatingEvents: "Creating events...",
  },
  dropFile: {
    selectFile: "Select file",
  },
  timeDuration,
};

export type Text = typeof en;

import { initRouter, RouteConfig } from "utils/router";

type HomeRoute = {
  key: "home";
};

const home: RouteConfig<HomeRoute> = {
  key: "home",
  readRoute: (path: string) => {
    if (path === "/") {
      return {
        key: "home",
      };
    }

    return null;
  },
  writeRoute: (route) => "/",
};

type ApiSettingsRoute = {
  key: "api_settings";
};

const apiSettings: RouteConfig<ApiSettingsRoute> = {
  key: "api_settings",
  readRoute: (path: string) => {
    if (path === "/api/settings") {
      return {
        key: "api_settings",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/settings",
};

type ApiUserSettings = {
  key: "api_user_settings";
};

const apiUserSettings: RouteConfig<ApiUserSettings> = {
  key: "api_user_settings",
  readRoute: (path: string) => {
    if (path === "/api/user/settings") {
      return {
        key: "api_user_settings",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/user/settings",
};

type LoginRoute = {
  key: "login";
};

const login: RouteConfig<LoginRoute> = {
  key: "login",
  readRoute: (path: string) => {
    if (path === "/login") {
      return {
        key: "login",
      };
    }

    return null;
  },
  writeRoute: (route) => "/login",
};

type LogoutRoute = {
  key: "logout";
};

const logout: RouteConfig<LogoutRoute> = {
  key: "logout",
  readRoute: (path: string) => {
    if (path === "/logout") {
      return {
        key: "logout",
      };
    }

    return null;
  },
  writeRoute: (route) => "/logout",
};

type RegisterRoute = {
  key: "register";
};

const register: RouteConfig<RegisterRoute> = {
  key: "register",
  readRoute: (path: string) => {
    if (path === "/register") {
      return {
        key: "register",
      };
    }

    return null;
  },
  writeRoute: (route) => "/register",
};

type NotFoundRoute = {
  url: string;
  key: "not_found";
};

const notFound: RouteConfig<NotFoundRoute> = {
  key: "not_found",
  readRoute: (path: string, searchParams: URLSearchParams) => {
    let url = path;

    const searchString = searchParams.toString();

    if (searchString) {
      url = `${url}?${searchString}`;
    }

    return {
      url,
      key: "not_found",
    };
  },
  writeRoute: (route) => route.url,
};

type ApiNotFoundRoute = {
  url: string;
  key: "api_not_found";
};

const apiNotFound: RouteConfig<ApiNotFoundRoute> = {
  key: "api_not_found",
  readRoute: (path: string, searchParams: URLSearchParams) => {
    if (path === "/api" || path.startsWith("/api/")) {
      let url = path;

      const searchString = searchParams.toString();

      if (searchString) {
        url = `${url}?${searchString}`;
      }

      return {
        url,
        key: "api_not_found",
      };
    }

    return null;
  },
  writeRoute: (route) => route.url,
};

type ApiRegisterUser = {
  key: "api_register_user";
};

const apiRegisterUser: RouteConfig<ApiRegisterUser> = {
  key: "api_register_user",
  readRoute: (path: string) => {
    if (path === "/api/register") {
      return {
        key: "api_register_user",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/register",
};

type ApiLogin = {
  key: "api_login";
};

const apiLogin: RouteConfig<ApiLogin> = {
  key: "api_login",
  readRoute: (path: string) => {
    if (path === "/api/login") {
      return {
        key: "api_login",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/login",
};

type ProfileRoute = {
  key: "profile";
};

const profile: RouteConfig<ProfileRoute> = {
  key: "profile",
  readRoute: (path: string) => {
    if (path === "/profile") {
      return {
        key: "profile",
      };
    }

    return null;
  },
  writeRoute: (route) => "/profile",
};

type ProfilePasswordRoute = {
  key: "profile_password";
};

const profilePassword: RouteConfig<ProfilePasswordRoute> = {
  key: "profile_password",
  readRoute: (path: string) => {
    if (path === "/profile/password") {
      return {
        key: "profile_password",
      };
    }

    return null;
  },
  writeRoute: (route) => "/profile/password",
};

type ApiChangePasswordRoute = {
  key: "api_change_password";
};

const apiChangePassword: RouteConfig<ApiChangePasswordRoute> = {
  key: "api_change_password",
  readRoute: (path: string) => {
    if (path === "/api/password") {
      return {
        key: "api_change_password",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/password",
};

type ForgetPassword = {
  key: "forget_password";
};

const forgetPassword: RouteConfig<ForgetPassword> = {
  key: "forget_password",
  readRoute: (path: string) => {
    if (path === "/forget-password") {
      return {
        key: "forget_password",
      };
    }

    return null;
  },
  writeRoute: (route) => "/forget-password",
};

type ApiForgetPassword = {
  key: "api_forget_password";
};

const apiForgetPassword: RouteConfig<ApiForgetPassword> = {
  key: "api_forget_password",
  readRoute: (path: string) => {
    if (path === "/api/forget-password") {
      return {
        key: "api_forget_password",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/forget-password",
};

type ResetPassword = {
  key: "reset_password";
  token: string | null;
};

const resetPassword: RouteConfig<ResetPassword> = {
  key: "reset_password",
  readRoute: (path, searchParams) => {
    if (path === "/reset-password") {
      const token = searchParams.get("token");

      return {
        key: "reset_password",
        token,
      };
    }

    return null;
  },
  writeRoute: (route) => {
    if (route.token) {
      return `/reset-password?token=${route.token}`;
    }

    return "/reset-password";
  },
};

type ApiResetPassword = {
  key: "api_reset_password";
};

const apiResetPassword: RouteConfig<ApiResetPassword> = {
  key: "api_reset_password",
  readRoute: (path: string) => {
    if (path === "/api/reset-password") {
      return {
        key: "api_reset_password",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/reset-password",
};

type ApiEvents = {
  key: "api_events";
};

const apiEvents: RouteConfig<ApiEvents> = {
  key: "api_events",
  readRoute: (path: string) => {
    if (path === "/api/events") {
      return {
        key: "api_events",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/events",
};

type ApiEvent = {
  key: "api_event";
  eventId: string;
};

const apiEvent: RouteConfig<ApiEvent> = {
  key: "api_event",
  readRoute: (path: string) => {
    if (!path.startsWith("/api/events/")) {
      return null;
    }

    const eventId = path.slice(12);

    if (eventId && !eventId.includes("/")) {
      return {
        key: "api_event",
        eventId,
      };
    }
    return null;
  },
  writeRoute: (route) => `/api/events/${route.eventId}`,
};

type CreateEvent = {
  key: "create_event";
};

const createEvent: RouteConfig<CreateEvent> = {
  key: "create_event",
  readRoute: (path: string) => {
    if (path === "/events/create") {
      return {
        key: "create_event",
      };
    }

    return null;
  },
  writeRoute: (route) => "/events/create",
};

type UpdateEvent = {
  key: "update_event";
  eventId: string;
};

const updateEvent: RouteConfig<UpdateEvent> = {
  key: "update_event",
  readRoute: (path: string) => {
    if (path.startsWith("/events/") && path.endsWith("/update")) {
      const eventId = path.slice(8, -7);

      if (!eventId.includes("/")) {
        return {
          key: "update_event",
          eventId,
        };
      }
    }

    return null;
  },
  writeRoute: (route) => `/events/${route.eventId}/update`,
};

type TermsOfUse = {
  key: "terms_of_use";
  lang: "en" | "ru";
};

const termsOfUse: RouteConfig<TermsOfUse> = {
  key: "terms_of_use",
  readRoute: (path: string) => {
    if (path === "/legal/terms-of-use") {
      return {
        key: "terms_of_use",
        lang: "en",
      };
    }
    if (path === "/legal/terms-of-use/ru") {
      return {
        key: "terms_of_use",
        lang: "ru",
      };
    }

    return null;
  },
  writeRoute: (route) =>
    route.lang === "en" ? "/legal/terms-of-use" : "/legal/terms-of-use/ru",
};

type PrivacyPolicy = {
  key: "privacy_policy";
  lang: "en" | "ru";
};

const privacyPolicy: RouteConfig<PrivacyPolicy> = {
  key: "privacy_policy",
  readRoute: (path: string) => {
    if (path === "/legal/privacy-policy") {
      return {
        key: "privacy_policy",
        lang: "en",
      };
    }
    if (path === "/legal/privacy-policy/ru") {
      return {
        key: "privacy_policy",
        lang: "ru",
      };
    }

    return null;
  },
  writeRoute: (route) =>
    route.lang === "en" ? "/legal/privacy-policy" : "/legal/privacy-policy/ru",
};

type ApiCsrfToken = {
  key: "api_csrf_token";
};

const apiCsrfToken: RouteConfig<ApiCsrfToken> = {
  key: "api_csrf_token",
  readRoute: (path: string) => {
    if (path === "/api/csrf-token") {
      return {
        key: "api_csrf_token",
      };
    }

    return null;
  },
  writeRoute: (route) => "/api/csrf-token",
};

type TestPage = {
  key: "test_page";
};

const testPage: RouteConfig<TestPage> = {
  key: "test_page",
  readRoute: (path: string) => {
    if (path === "/test") {
      return {
        key: "test_page",
      };
    }

    return null;
  },
  writeRoute: (route) => "/test",
};

type Settings = {
  key: "settings";
};

const settings: RouteConfig<Settings> = {
  key: "settings",
  readRoute: (path: string) => {
    if (path === "/settings") {
      return {
        key: "settings",
      };
    }

    return null;
  },
  writeRoute: (route) => "/settings",
};

type StatisticsNaps = {
  key: "statistics_naps";
};

const statisticsNaps: RouteConfig<StatisticsNaps> = {
  key: "statistics_naps",
  readRoute: (path: string) => {
    if (path === "/statistics/naps") {
      return {
        key: "statistics_naps",
      };
    }

    return null;
  },
  writeRoute: (route) => "/statistics/naps",
};

type StatisticsCharts = {
  key: "statistics_charts";
};

const statisticsCharts: RouteConfig<StatisticsCharts> = {
  key: "statistics_charts",
  readRoute: (path: string) => {
    if (path === "/statistics/charts") {
      return {
        key: "statistics_charts",
      };
    }

    return null;
  },
  writeRoute: (route) => "/statistics/charts",
};

export const router = initRouter(
  home,
  login,
  logout,
  register,
  profile,
  profilePassword,
  forgetPassword,
  resetPassword,
  createEvent,
  updateEvent,
  termsOfUse,
  privacyPolicy,
  settings,
  statisticsNaps,
  statisticsCharts,
  testPage,
  apiSettings,
  apiUserSettings,
  apiRegisterUser,
  apiLogin,
  apiChangePassword,
  apiForgetPassword,
  apiResetPassword,
  apiEvents,
  apiEvent,
  apiCsrfToken,
  apiNotFound,
  notFound
);

export type AppRoute = ReturnType<typeof router.readRoute>;
export type AppRouteKey = AppRoute["key"];

router.writeRoute({ key: "home" });

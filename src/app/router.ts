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

export const router = initRouter(
  home,
  login,
  logout,
  register,
  profile,
  profilePassword,
  forgetPassword,
  resetPassword,
  apiSettings,
  apiRegisterUser,
  apiLogin,
  apiChangePassword,
  apiForgetPassword,
  apiResetPassword,
  apiNotFound,
  notFound
);

export type AppRoute = ReturnType<typeof router.readRoute>;

router.writeRoute({ key: "home" });

import { AppRoute, router } from "app/router";

async function getCsrfToken(): Promise<string> {
  const response = await fetch("/api/csrf-token");

  if (!response.ok) {
    return "";
  }

  const result = await response.json();

  return result.token || "";
}

const csrfTokenPromise = getCsrfToken();

export async function request(route: AppRoute, method: string, body?: any) {
  const url = router.writeRoute(route);

  const csrfToken = await csrfTokenPromise;

  const options: RequestInit = {
    method,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Request error");
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  if (!result.data) {
    throw new Error("Empty response");
  }

  return result.data;
}

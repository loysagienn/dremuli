function prettifyPath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

export function parseUrl(url: string): [string, URLSearchParams] {
  const [urlPath, queryString] = url.split("?");

  const path = prettifyPath(urlPath);

  const searchParams = new URLSearchParams(queryString);

  return [path, searchParams];
}

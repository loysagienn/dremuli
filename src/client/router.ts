import { Store } from "types";
import { selectRoute } from "selectors";
import { routeToAction } from "actions";
import { router } from "app/router";

const { history } = window;

export const connectStoreToHistory = ({
  subscribe,
  getState,
  dispatch,
}: Store) => {
  let currentRoute = selectRoute(getState());

  window.addEventListener("popstate", (event) => {
    const route = event.state;

    if (route) {
      currentRoute = route;

      dispatch(routeToAction(route));
    }
  });

  history.replaceState(currentRoute, "", router.writeRoute(currentRoute));

  const storeCallback = () => {
    const route = selectRoute(getState());

    if (route === currentRoute) {
      return;
    }

    const url = router.writeRoute(route);

    history.pushState(route, "", url);

    currentRoute = route;
  };

  return subscribe(storeCallback);
};

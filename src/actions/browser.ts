export type SetPageVisibility = {
  type: "SET_PAGE_VISIBILITY";
  visible: boolean;
};

export function setPageVisible(visible: boolean): SetPageVisibility {
  return {
    type: "SET_PAGE_VISIBILITY",
    visible,
  };
}

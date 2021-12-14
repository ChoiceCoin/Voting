export const collapseOrExpandElement = (element: HTMLElement, condition: boolean) => {
  if (condition) {
    element.style.maxHeight = "0";
  } else {
    element.style.maxHeight = element?.scrollHeight + "px";
  }
};
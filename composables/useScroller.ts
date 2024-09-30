export function useScroller() {
  function scrollTo(elementId: string) {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView();
    }
  }

  return { scrollTo };
}

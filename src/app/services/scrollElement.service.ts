export class ScrollElementService {

  public scrollTop = (element: HTMLElement, speed: number = 200) => {
    window.requestAnimationFrame(() => {
      element.scrollTop = 0
    });
  };

  public isElementScrolledToBottom = (element: HTMLElement, latitude: number = 0) => {
    let spaceToScroll = this._getPossibleScrollingRange(element);
    let currentScrollTopPosition = element.scrollTop;
    console.log(spaceToScroll, currentScrollTopPosition);
    return spaceToScroll - currentScrollTopPosition < latitude
  };

  public isScrollingPossible = (element: HTMLElement): boolean => {
    return this._getPossibleScrollingRange(element) > 0;
  };

  private _getPossibleScrollingRange = (element: HTMLElement): number => {
    return element.scrollHeight - element.clientHeight;
  };
}
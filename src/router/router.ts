import { RouterLocation } from "./routerLocation";

/**
 * Router manages locations.
 *
 * Send a string that can be converted into a reg ex.
 *
 * examples:
 *
 * base: ""
 * hard url: "other"
 * url params: "a/(c|.*)/b" || "a/(c|\\d*)/b"
 * query string "?a=1"
 *
 * returns
 * location: "other"
 * url params: {c: "123"}
 * query string: {a: "1"}
 *
 * To construct the router send in the element the router should control.
 *
 * For registering each route pass the string and a function to register.
 * The function should return HTML the router will place the html in the page.
 */
export class Router {
  public static routerListeners: Array<(event?: PopStateEvent) => void> = [];
  private locations: RouterLocation[] = [];

  constructor(public element: HTMLElement) {
    this.listenToChange = this.listenToChange.bind(this);
    Router.routerListeners.push(this.listenToChange);
  }

  public clearIntervals() {
    const intNum = setInterval(() => { return; }, 9000);
    for (let i = 0; i < (intNum as any); i++) {
      clearInterval(i);
    }
  }

  public clearTimeouts() {
    const timeNum = setTimeout(() => { return; }, 9000);
    for (let i = 0; i < (timeNum as any); i++) {
      clearTimeout(i);
    }
  }

  public listenToChange(event?: PopStateEvent) {
    this.clearIntervals();
    this.clearTimeouts();

    let location: Location;
    if (event) {
      location = (event.target as Window).location;
    } else {
      location = window.location;
    }

    // tslint:disable-next-line:prefer-const
    const hash = this.cleanHash(location.hash);

    let rendered = false;

    this.locations.forEach((loc: RouterLocation) => {
      const urlParams = loc.match(hash);
      if (urlParams && !rendered) {
        rendered = true;
        const query = this.processQuery(location.search);
        const html = loc.fun(hash, urlParams, query);
        this.element.innerHTML = html;
        // tslint:disable-next-line:no-unused-expression
        loc.callback && loc.callback();
      }
    });
  }

  public register(
    location: string,
    fun: (
      location: string,
      data: { [key: string]: string },
      query: { [key: string]: string },
    ) => string,
    callback?: any,
  ) {
    this.locations.push(new RouterLocation(location, fun, callback));
  }

  private cleanHash(hash: string) {
    return hash.replace(/^#?\/?/, "").replace(/\/$/, "");
  }

  private processQuery(search: string) {
    search = search.replace(/^\?/, "");
    if (!search) {
      return {};
    }
    const params = search.split("&");
    const query: { [key: string]: string } = {};
    params.forEach((param) => {
      if (param) {
        const [key, value] = param.split("=");
        query[key] = value || "";
      }
    });
    return query;
  }
}

window.onpopstate = (event?: PopStateEvent) => {
  Router.routerListeners.forEach((fun: (event?: PopStateEvent) => void) => {
    fun(event);
  });
};

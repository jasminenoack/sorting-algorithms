import { Router } from "../../src/router/router";

describe("router", () => {
  let router: Router;
  let baseRouteFun: jasmine.Spy;
  let otherRouteFun: jasmine.Spy;
  let baseRoute: string;
  let location: any;
  let changeLocationFun: any;
  let event: any;
  let originalHtml: string;
  let otherHtml: string;

  beforeEach(() => {
    baseRouteFun = jasmine.createSpy("base");
    originalHtml = "<div>Original</div>";
    baseRouteFun.and.returnValue(originalHtml);
    otherRouteFun = jasmine.createSpy("other");
    otherHtml = "<div>Other</div>";
    otherRouteFun.and.returnValue(otherHtml);
    baseRoute = "^$";
    location = {
      hash: "",
      host: "127.0.0.1:8080",
      hostname: "127.0.0.1",
      href: "http://127.0.0.1:8080/#/app/ts/s",
      origin: "http://127.0.0.1:8080",
      pathname: "/",
      port: "8080",
      protocol: "http:",
      search: "",
    };
    event = {
      target: {
        location,
      },
    };
    router = new Router(document.body);
    changeLocationFun = window.onpopstate;
    router.register("^$", baseRouteFun);
    router.register("^other$", otherRouteFun);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("routes", () => {
    describe("base", () => {
      it("should find '' ", () => {
        location.hash = "";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, {});
        expect(otherRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#' ", () => {
        location.hash = "#";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, {});
        expect(otherRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#/' ", () => {
        location.hash = "#/";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, {});
        expect(otherRouteFun).not.toHaveBeenCalled();
      });
    });

    describe("not base", () => {
      it("should find 'other' ", () => {
        location.hash = "other";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#other' ", () => {
        location.hash = "#other";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#/other' ", () => {
        location.hash = "#/other";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });

      it("should find 'other/' ", () => {
        location.hash = "other/";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#other/' ", () => {
        location.hash = "#other/";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });

      it("should find '#/other/' ", () => {
        location.hash = "#/other/";
        changeLocationFun(event);
        expect(otherRouteFun).toHaveBeenCalledWith("other", {}, {});
        expect(baseRouteFun).not.toHaveBeenCalled();
      });
    });

    describe("should handle search", () => {
      it("should find ?a=1", () => {
        location.hash = "#/";
        location.search = "?a=1";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, { a: "1" });
        expect(otherRouteFun).not.toHaveBeenCalled();
      });

      it("should find ?a=1&b=2", () => {
        location.search = "?a=1&b=2";
        location.hash = "#/";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, { a: "1", b: "2" });
        expect(otherRouteFun).not.toHaveBeenCalled();
      });

      it("should find ?a=1&c", () => {
        location.search = "?a=1&c";
        location.hash = "#/";
        changeLocationFun(event);
        expect(baseRouteFun).toHaveBeenCalledWith("", {}, { a: "1", c: "" });
        expect(otherRouteFun).not.toHaveBeenCalled();
      });
    });
  });

  describe("url params", () => {
    let matchListener: any;
    let nonMatchListener: any;
    beforeEach(() => {
      matchListener = jasmine.createSpy("match");
      nonMatchListener = jasmine.createSpy("non-match");
    });

    it("should handle a/(c|.*)/b", () => {
      router.register("a/(c|.*)/b", matchListener);
      router.register("a/b/c", nonMatchListener);

      location.hash = "a/abc/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/abc/b", { c: "abc" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/123/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/123/b", { c: "123" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/a1d/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/a1d/b", { c: "a1d" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/x/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/x/b", { c: "x" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();
    });

    it("should handle (a|.*)/(c|.*)/(b|.*)", () => {
      router.register("(a|.*)/(c|.*)/(b|.*)", matchListener);
      router.register("a/b/c", nonMatchListener);

      location.hash = "q/r/s";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "q/r/s", { a: "q", b: "s", c: "r" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "this/is/cat";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "this/is/cat", { a: "this", b: "cat", c: "is" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();
    });

    it("should handle a/(c|.)/b", () => {
      router.register("a/(c|.)/b", matchListener);
      router.register("a/b/c", nonMatchListener);

      location.hash = "a/x/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/x/b", { c: "x" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/xi/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledTimes(1);
      expect(nonMatchListener).not.toHaveBeenCalled();
    });

    it("should handle a/(c|.{3})/b", () => {
      router.register("a/(c|.{3})/b", matchListener);
      router.register("a/(c|.{2})/c", nonMatchListener);

      location.hash = "a/x/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledTimes(0);
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/xin/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/xin/b", { c: "xin" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();
    });

    it("should handle a/(c|\d+)/b", () => {
      router.register("a/(c|\\d+)/b", matchListener);
      router.register("a/(c|.*)/c", nonMatchListener);

      location.hash = "a/xi/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledTimes(0);
      expect(nonMatchListener).not.toHaveBeenCalled();

      location.hash = "a/123/b";
      changeLocationFun(event);
      expect(matchListener).toHaveBeenCalledWith(
        "a/123/b", { c: "123" }, {},
      );
      expect(nonMatchListener).not.toHaveBeenCalled();
    });
  });

  describe("change html", () => {
    it("Should change html if original is called", () => {
      location.hash = "";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(originalHtml);
    });

    it("should change html if other is called", () => {
      location.hash = "other";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(otherHtml);
    });

    it("should go back and forth when others are called", () => {
      location.hash = "";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(originalHtml);

      location.hash = "other";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(otherHtml);

      location.hash = "";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(originalHtml);

      location.hash = "other";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(otherHtml);
    });

    it("should only do the first that matches", () => {
      router.register("^$", otherRouteFun);
      location.hash = "";
      changeLocationFun(event);
      expect(document.body.innerHTML).toEqual(originalHtml);
    });

    it("should allow for a callback", () => {
      const callback = jasmine.createSpy();
      router.register("^test$", baseRouteFun, callback);
      location.hash = "#test";
      changeLocationFun(event);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

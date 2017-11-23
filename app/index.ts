import { setUpHeaders } from "./../src/pages/header";
import { setUpIndex } from "./../src/pages/index";
import { Router } from "./../src/router/router";

// const router = new Router();

// tslint:disable-next-line:no-var-requires
// const tpl = require("../templates/index.njk");
// const html = tpl.render();

// console.log(html)
// window.onpopstate = function (event) {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };

setUpHeaders();

const contentEl = document.getElementById("content");
const router = new Router(contentEl);
router.register("^$", setUpIndex);

(window as any).onpopstate();

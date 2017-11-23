import { setUpHeaders } from "./../src/pages/header";
import { indexCallback, setUpIndex } from "./../src/pages/index";
import { profileCallback, setUpProfile } from "./../src/pages/profile";
import { scatterCallback, setUpScatter } from "./../src/pages/scatter";
import { Router } from "./../src/router/router";
import { setUpQueens } from "./../src/tools/queensBackground";

setUpHeaders();

const contentEl = document.getElementById("content");
const router = new Router(contentEl);
router.register("^$", setUpIndex, indexCallback);
router.register("^scatter$", setUpScatter, scatterCallback);
router.register("^profile$", setUpProfile, profileCallback);

(window as any).onpopstate();
setUpQueens();

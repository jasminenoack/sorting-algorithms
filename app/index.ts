import { setUpHeaders } from "./../src/pages/header";
import { indexCallback, setUpIndex } from "./../src/pages/index";
import { profileCallback, setUpProfile } from "./../src/pages/profile";
import { scatterCallback, setUpScatter } from "./../src/pages/scatter";
import { setUpSingle, singleCallback } from "./../src/pages/single";
import { setUpStick, stickCallback } from "./../src/pages/stick";
import { Router } from "./../src/router/router";
import { setUpQueens } from "./../src/tools/queensBackground";

setUpHeaders();

const contentEl = document.getElementById("content");
const router = new Router(contentEl);
router.register("^$", setUpIndex, indexCallback);
router.register("^scatter$", setUpScatter, scatterCallback);
router.register("^profile$", setUpProfile, profileCallback);
router.register("^single$", setUpSingle, singleCallback);
router.register("^stick$", setUpStick, stickCallback);

(window as any).onpopstate();
setUpQueens();

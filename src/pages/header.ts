import { Router } from "./../router/router";

const baseHeader = "Sorting Algorithms";
const headerEl = document.getElementById("header");

const router = new Router(headerEl);

export const setUpHeaders = () => {
  // fallback for all endpoints not matched
  router.register(".*", () => {
    return `<div>${baseHeader}</div>`;
  });
};

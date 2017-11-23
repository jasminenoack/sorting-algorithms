export const blog = {
  "Bogobogo Sort": "http://jasminenoack.tumblr.com/tagged/bogobogo/chrono",
  "Bogosort && Bozosort": "http://jasminenoack.tumblr.com/tagged/bogosort/chrono",
  "Bubble Sort": "http://jasminenoack.tumblr.com/tagged/bubble%20sort/chrono",
  "Cocktail Sort": "http://jasminenoack.tumblr.com/tagged/cocktail%20sort/chrono",
  "Comb Sort": "http://jasminenoack.tumblr.com/tagged/comb%20sort/chrono",
  "Cycle Sort": "http://jasminenoack.tumblr.com/tagged/cycle%20sort/chrono",
  "Gnome Sort": "http://jasminenoack.tumblr.com/tagged/gnome%20sort/chrono",
  "Heap Sort": "http://jasminenoack.tumblr.com/tagged/heap%20sort/chrono",
  "Sorting": "http://jasminenoack.tumblr.com/tagged/sorting/chrono",
};

export const tools = {
  "Profile Graphs": "#profile",
  "Scatter Animations": "#scatter",
};

export const learn = {
  "Rosetta Code": "https://rosettacode.org/wiki/Category:Sorting_Algorithms",
  "Sound of Sorting": "http://panthema.net/2013/sound-of-sorting/",
  "Wikipedia": "https://en.wikipedia.org/wiki/Sorting_algorithm",
};

export const setUpIndex = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/index.njk");
  const html = tpl.render({
    blog,
    learn,
    tools,
  });

  return html;
};

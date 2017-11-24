import { Board, Verbosity } from "../board";
import { BoardDisplay } from "../display/board";
import { OrderedShuffle, ReversedShuffle } from "../shuffles";
import { _75 } from "../sizes";
import { Comb } from "../sorts/comb/base";
import { Heap } from "../sorts/heap/base";
import { OddEven } from "../sorts/oddEven/base";
import { Smooth } from "../sorts/smooth/base";
import { Integer } from "../valueTypes";

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
  "Single Sort": "#single",
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

const createReversedSet = () => {
  const reverseElement = document.getElementById("reverse-sorts");
  const display = new BoardDisplay(reverseElement, 200, 200);

  const size = _75;
  const valueType = Integer;
  const shuffle = ReversedShuffle;

  const board2 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort2 = new Comb(board2);
  const board4 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort4 = new Heap(board4);
  const board5 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort5 = new OddEven(board5);
  const board7 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort7 = new Smooth(board7);

  display.add({
    board: board2,
    name: "rev-comb",
    sort: sort2,
  });
  display.add({
    board: board4,
    name: "rev-heap",
    sort: sort4,
  });
  display.add({
    board: board5,
    name: "rev-odd-even",
    sort: sort5,
  });
  display.add({
    board: board7,
    name: "rev-smooth",
    sort: sort7,
  });

  display.setupAuto();
};

const createOrderedSet = () => {
  const OrderedElement = document.getElementById("ordered-sorts");
  const display = new BoardDisplay(OrderedElement, 200, 200);

  const size = _75;
  const valueType = Integer;
  const shuffle = OrderedShuffle;

  const board2 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort2 = new Comb(board2);
  const board4 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort4 = new Heap(board4);
  const board5 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort5 = new OddEven(board5);
  const board7 = new Board(size, shuffle, valueType, Verbosity.None);
  const sort7 = new Smooth(board7);

  display.add({
    board: board2,
    name: "ord-comb",
    sort: sort2,
  });
  display.add({
    board: board4,
    name: "ord-heap",
    sort: sort4,
  });
  display.add({
    board: board5,
    name: "ord-odd-even",
    sort: sort5,
  });
  display.add({
    board: board7,
    name: "ord-smooth",
    sort: sort7,
  });

  display.setupAuto();
};

export const indexCallback = () => {
  createOrderedSet();
  createReversedSet();
};

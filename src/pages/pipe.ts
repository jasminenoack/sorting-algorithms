import { PipeDisplay } from "../display/pipe";

export const setUpPipe = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  return "<div>Pipe</div>";
};

const index = 1;

export const pipeCallback = () => {
  // the wrapper for the boards
  // const boardsElement = document.getElementById("boards");
  // const display = new BoardDisplay(boardsElement, 500, 500);

  // // controls
  // const createButton = document.getElementById("create");

  // // on create
  // jquery(createButton).click(createBoard.bind(this, display));

  // const autoElement = document.getElementById("auto");
  // jquery(autoElement).click(() => {
  //   display.setupAuto();
  //   if (display.interval) {
  //     autoElement.innerText = "Stop";
  //   } else {
  //     autoElement.innerText = "Auto";
  //   }
  // });

  // const stepElement = document.getElementById("step");
  // jquery(stepElement).click(display.step.bind(display));
};

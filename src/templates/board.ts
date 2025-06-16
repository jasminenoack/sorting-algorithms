export interface BoardCtx {
  name: string;
  title: string;
  width: number;
  height: number;
  margin?: number;
  verbosity: number;
  disabled?: boolean;
  board: any;
  shuffleTitle: string;
  sort: any;
  sortName: string;
}

export function boardData(ctx: BoardCtx): string {
  let out = '';
  if (ctx.verbosity > 2) {
    out += ` <span class="nowrap">Order Type: ${ctx.shuffleTitle}</span>`;
    out += ` <span class="nowrap">Value Type: ${ctx.board.valueType.title}</span>`;
    out += ` <span class="nowrap">Point Count: ${ctx.board.size.label}</span>`;
  }
  if (ctx.verbosity > 1) {
    out += ` <span class="nowrap">Steps: ${ctx.sort.steps}</span>`;
    out += ` <span class="nowrap">Comparisons: ${ctx.sort.comparisons}</span>`;
    out += ` <span class="nowrap">Moves: ${ctx.sort.swaps}</span>`;
  }
  return out;
}

export function boardTemplate(ctx: BoardCtx): string {
  return `<div class="wrapper" id="${ctx.name}">
  <h1>${ctx.title}</h1>
  <span class="data">
    <div class="board-information">${boardData(ctx)}</div>
    ${ctx.verbosity > 3 ? `<button class="remove" ${ctx.disabled ? 'disabled' : ''}>X</button>` : ''}
    ${ctx.verbosity > 1 ? `<button class="reset" ${ctx.disabled ? 'disabled' : ''}>Reset</button>` : ''}
    <svg viewBox="0 0 ${ctx.width + 40} ${ctx.height + 40}">
      <g transform="translate(20, 20)" class="board"></g>
      <g transform="translate(20, 20)" class="shadow"></g>
    </svg>
  </span>
</div>`;
}

export function listTemplate(ctx: BoardCtx): string {
  return `<div id="${ctx.name}" class="item">
  <p class="list-wrapper">${ctx.sortName}. <b>Order Type</b>: ${ctx.shuffleTitle}. <b>Value Type</b>: ${ctx.board.valueType.title}. <b>Point Count</b>: ${ctx.board.size.label}. <b class="swaps">Swaps.</b> <b class="comps">Comps.</b> <span class="remove"><u>Remove</u></span></p>
</div>`;
}

export function pipeTemplate(ctx: BoardCtx): string {
  return `<article>
  <div style="position:relative;" id="${ctx.name}" class="pipe-wrapper">
    <h3>${ctx.title}</h3>
    <div class="board-information">${boardData(ctx)}</div>
    ${ctx.verbosity > 3 ? `<button class="remove" ${ctx.disabled ? 'disabled' : ''}>X</button>` : ''}
    ${ctx.verbosity > 1 ? `<button class="reset" ${ctx.disabled ? 'disabled' : ''}>Reset</button>` : ''}
    <svg class="pipe" height="${ctx.height + 20 * 2}" width="${ctx.width + (ctx.margin || 0) * 2}">
      <g transform="translate(${ctx.margin || 0}, 20)" class="board"></g>
    </svg>
  </div>
</article>`;
}

export function sticksTemplate(ctx: BoardCtx): string {
  return `<article>
  <div style="position:relative;" id="${ctx.name}" class="stick-wrapper">
    <h3>${ctx.title}</h3>
    <div class="board-information">${boardData(ctx)}</div>
    ${ctx.verbosity > 3 ? `<button class="remove" ${ctx.disabled ? 'disabled' : ''}>X</button>` : ''}
    ${ctx.verbosity > 1 ? `<button class="reset" ${ctx.disabled ? 'disabled' : ''}>Reset</button>` : ''}
    <svg class="sticks" height="${ctx.height + 20 * 2}" width="${ctx.width + (ctx.margin || 0) * 2}">
      <g transform="translate(${ctx.margin || 0}, 20)" class="board"></g>
    </svg>
  </div>
</article>`;
}

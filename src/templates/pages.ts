import { home, sortControl, orderControl, countControl, valuesControl, runButtons, checkboxes, profileButtons } from './controls';

export function scatterPage(ctx: any): string {
  return `${home()}<h2>Scatter Plots</h2><div>This visualization uses scatter plots to show the sort.</div><article class="sorting"><div class="controls clear"><div>${sortControl(ctx)}${countControl(ctx)}${orderControl(ctx)}${valuesControl(ctx)}</div>${runButtons}</div><div id="boards"></div></article><style>#content {width:90%;max-width:none;}</style>`;
}

export function pipePage(ctx: any): string {
  return `${home()}<h2>Pipe</h2><div>This visualization shows the profile for a given sort.</div><article class="sorting"><div class="controls clear"><div>${sortControl(ctx)}${countControl(ctx)}${orderControl(ctx)}${valuesControl(ctx)}</div>${runButtons}</div></article><div id="pipe"></div><style>path{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:0.6;}</style>`;
}

export function singlePage(ctx: any): string {
  return `${home()}<div class="controls clear"><div>${sortControl(ctx)}${orderControl(ctx)}</div></div><div id="single"></div><style>.wrapper{display:block;margin:auto;width:500px;}</style>`;
}

export function stickPage(ctx: any): string {
  return `${home()}<article class="sorting"><div class="controls clear"><div>${sortControl(ctx)}${countControl(ctx)}${orderControl(ctx)}${valuesControl(ctx)}</div>${runButtons}</div></article><div id="sticks"></div>`;
}

export function profilePage(ctx: any): string {
  return `${home()}<h2>Profiles</h2><div>This visualization shows the profile for a given sort.</div><article class="sorting"><div class="controls clear"><div>${sortControl(ctx)}${countControl(ctx)}${orderControl(ctx)}${valuesControl(ctx)}${checkboxes}</div>${profileButtons}<div>Sorts: <span id="sorts"></span></div></div><div id="graph"></div><div id="previous"></div><style>path{stroke:black;fill:none;} .line{fill:none;}</style></article>`;
}

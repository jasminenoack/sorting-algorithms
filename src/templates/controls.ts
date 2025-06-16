export function home(): string {
  return `<div><a href="../../index.html">Index</a></div><div><a href="javascript:history.back()"><< Back</a></div>`;
}

export function sortControl({ sorts, defaults }: { sorts: [string, any][]; defaults: any }): string {
  const options = sorts.map(([key, info]) => `<option value="${key}"${defaults.sort === key ? ' selected' : ''}>${info.title}</option>`).join('');
  return `<label>  Sort:  <select id="sort">${options}</select></label>`;
}

export function orderControl({ shuffles, defaults }: { shuffles: [string, any][]; defaults: any }): string {
  const options = shuffles.filter(([, v]) => v.title).map(([key, info]) => `<option value="${key}"${defaults.shuffle === key ? ' selected' : ''}>${info.title}</option>`).join('');
  return `<label>  Order:  <select id="order">${options}</select><label>`;
}

export function countControl({ sizes, defaults }: { sizes: [string, any][]; defaults: any }): string {
  const options = sizes.map(([key, info]) => `<option value="${key}"${defaults.count === key ? ' selected' : ''}>${info.label}</option>`).join('');
  return `<label>  Point count:  <select id="size">${options}</select><label>`;
}

export function valuesControl({ valueTypes, defaults }: { valueTypes: [string, any][]; defaults: any }): string {
  const options = valueTypes.map(([key, info]) => `<option value="${key}"${defaults.valueType === key ? ' selected' : ''}>${info.title}</option>`).join('');
  return `<label>  Values:  <select id="value-type">${options}</select><label>`;
}

export const checkboxes = '<label>Swaps<input type="checkbox" id="swaps" checked></label><label>Comparisons<input type="checkbox" id="comps"></label>';

export const runButtons = `<div class="button-wrapper">
  <div class="run-buttons">
    <button id="create">Create</button>
    <button id="step">Step</button>
    <button id="auto">Auto</button>
  </div>
</div>
<style>
  .run-buttons { position: fixed; z-index: 100000; }
  .button-wrapper { float: right; height: 36px; width: 196px; }
</style>`;

export const profileButtons = '<button id="create">Create</button><button id="run">Run</button>';

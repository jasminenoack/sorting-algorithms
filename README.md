# sorting-algorithms

Visual demonstrations of common sorting algorithms.
The interface now relies on [Chart.js](https://www.chartjs.org/) together with D3.js for rendering graphs, replacing the older nvd3 library. Chart.js is bundled directly with the application's code instead of being loaded via a separate script tag.

## Requirements

This project requires Node.js version 20 or higher. The requirement is
enforced via the `engines` field in `package.json`.

## Installation

Install the dependencies:

```bash
npm install
```

## Building

Build the project with:

```bash
npm run build
```

Run the development build and watch for changes with:

```bash
npm run build:watch
```

Both commands output the bundled file into the `dist/` directory which is
referenced by `index.html`.

## Running tests

Execute the Karma test suite:

```bash
npm test
```

The tests run in a jsdom environment so no browser installation is required.

## Formatting

Run Prettier to check code style:

```bash
npm run lint
```

Automatically fix formatting issues with:

```bash
npm run format
```

## Demo

<http://jasminenoack.com/sorting-algorithms/>

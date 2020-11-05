# Impossible Chessboard Puzzl
This is a sandbox / solver for The Impossible Chessboard Puzzle. I first heard about this puzzle on the YouTube channel, [3Blue1Brown](https://www.youtube.com/c/3blue1brown/). I'd recommend watching [that video](https://www.youtube.com/watch?v=wTJI_WuZSwE&t=14s) if you haven't already!

The logic behind the solution (and the programming) is linked to Hamming codes. 3blue1brown also has a great [video on that](https://www.youtube.com/watch?v=X8jsijhllIA), which in [part 2](https://www.youtube.com/watch?v=b3NxrZOu_CE) explains how the solution can be solved with a single XOR operation. That part of the code can be found in [src/state.js](src/state.js).

Check out the [live demo](http://funwithtriangles.net/impossible-chessboard/).

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deploy by creating a server in `dist`.

```bash
cd dist && http-server
```
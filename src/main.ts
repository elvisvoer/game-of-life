import "./style.css";

type Point = {
  x: number;
  y: number;
};

type D3Cell = {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
  coord: Point;
};

const CELL_SIZE = 24;
const START_OFFSET = 1;

const NUM_CELLS_X = Math.floor(window.innerHeight / CELL_SIZE) - 10;
const NUM_CELLS_Y = Math.floor(window.innerWidth / CELL_SIZE);

declare const d3: any;

class GameOfLife {
  private _displayData: D3Cell[][] = [];
  private _delta: number = 500;

  public isRunning: boolean = false;
  public fuzziness: number = 0;
  public onNextTick?: Function;

  constructor() {
    this._displayData = this.getBoardDisplayData();

    let lastTime = new Date().getTime();
    const timer = () => {
      requestAnimationFrame(timer);
      var currentTime = new Date().getTime();

      if (currentTime - lastTime >= this._delta) {
        this.tick();
        lastTime = currentTime;
      }
    };
    // autostart
    timer();
  }

  set speed(s: number) {
    this._delta = (100 - s) * 10;
  }

  public render(rootElementSelector: string | Element | null) {
    const width = NUM_CELLS_Y * CELL_SIZE + START_OFFSET * 2;
    const height = NUM_CELLS_X * CELL_SIZE + START_OFFSET * 2;

    const toggleCellState = (coord: Point) => {
      if (this.isRunning || this.isOutOfBounds(coord)) {
        return;
      }

      const alive = this._displayData[coord.x][coord.y]?.alive;
      this.setIsAlive(coord, !alive);
    };

    let lastCell = { x: -1, y: -1 };
    const checkHasEnteredCell = (coord: Point) => {
      if (lastCell.x === coord.x && lastCell.y === coord.y) {
        return false;
      }

      lastCell = { ...coord };
      return true;
    };

    const grid = d3
      .select(rootElementSelector)
      .append("svg")
      .attr("width", `${width}px`)
      .attr("height", `${height}px`)

      .on("mousemove touchmove", function () {
        d3.event.preventDefault();
        // select cells on mouse move + ctrl key or mobile touch
        if (d3.event.type === "mousemove" && !d3.event.ctrlKey) {
          return;
        }
        // @ts-ignore
        const [mouseX, mouseY] = d3.mouse(this);
        const coord = {
          x: Math.ceil(mouseY / CELL_SIZE) - 1,
          y: Math.ceil(mouseX / CELL_SIZE) - 1,
        };
        if (checkHasEnteredCell(coord)) {
          toggleCellState(coord);
        }
      });

    const row = grid
      .selectAll(".row")
      .data(this._displayData)
      .enter()
      .append("g")
      .attr("class", "row")
      .append("g")
      .attr("class", "column");

    row
      .selectAll(".square")
      .data(function (d: D3Cell) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("class", "square")
      .attr("id", function (d: D3Cell) {
        return `c-${d.coord.x}-${d.coord.y}`;
      })
      .attr("x", function (d: D3Cell) {
        return d.x;
      })
      .attr("y", function (d: D3Cell) {
        return d.y;
      })
      .attr("width", function (d: D3Cell) {
        return d.width;
      })
      .attr("height", function (d: D3Cell) {
        return d.height;
      })
      .style("fill", "transparent")
      .style("stroke", "#000")
      .on("click", (d: D3Cell) => toggleCellState(d.coord));
  }

  public reset() {
    this.isRunning = false;

    this._displayData.forEach((line) =>
      line.forEach((cell) => {
        this.setIsAlive(cell.coord, false);
      })
    );
  }

  public tick() {
    if (!this.isRunning) {
      return;
    }

    let allDied = true;

    const count = this.getAllNeighborsCount(this._displayData);
    count.forEach((line, row) =>
      line.forEach((neighborsCount, col) => {
        const cell = this._displayData[row][col];
        if (
          (cell.alive && [2, 3].includes(neighborsCount)) ||
          (!cell.alive && [3].includes(neighborsCount))
        ) {
          allDied = false;
          this.setIsAlive(cell.coord, true);
        } else {
          this.setIsAlive(cell.coord, false);
        }
      })
    );

    this.onNextTick?.(allDied);
  }

  private setIsAlive(coord: Point, isAlive: boolean) {
    this._displayData[coord.x][coord.y].alive = isAlive;

    const cell = d3.select(`#c-${coord.x}-${coord.y}`);
    cell
      .transition()
      .duration(this.fuzziness)
      .style("fill", isAlive ? "gold" : "transparent");
  }

  private getAllNeighborsCount(data: D3Cell[][]): number[][] {
    const result: number[][] = [];
    for (let row = 0; row < data.length; row++) {
      result.push([]);
      for (let col = 0; col < data[row].length; col++) {
        const count = this.countNeighbors(data, data[row][col].coord);
        result[row].push(count);
      }
    }

    return result;
  }

  private countNeighbors(data: D3Cell[][], { x, y }: Point): number {
    let total = 0;

    const check = (p: Point) => {
      if (!this.isOutOfBounds(p) && data[p.x][p.y].alive) {
        total++;
      }
    };

    [
      { x: x - 1, y: y + 0 },
      { x: x - 1, y: y + 1 },
      { x: x + 0, y: y + 1 },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y + 0 },
      { x: x + 1, y: y - 1 },
      { x: x + 0, y: y - 1 },
      { x: x - 1, y: y - 1 },
    ].forEach((dir) => check(dir));

    return total;
  }

  private isOutOfBounds(coord: Point) {
    return (
      coord.x < 0 ||
      coord.x > NUM_CELLS_X - 1 ||
      coord.y < 0 ||
      coord.y > NUM_CELLS_Y - 1
    );
  }

  private getBoardDisplayData() {
    const displayData: D3Cell[][] = [];
    let xPosition = START_OFFSET;
    let yPosition = START_OFFSET;

    for (let row = 0; row < NUM_CELLS_X; row++) {
      displayData.push([]);

      for (let col = 0; col < NUM_CELLS_Y; col++) {
        displayData[row].push({
          x: xPosition,
          y: yPosition,
          width: CELL_SIZE,
          height: CELL_SIZE,
          alive: false,
          coord: {
            x: row,
            y: col,
          },
        });

        xPosition += CELL_SIZE;
      }

      // starting new raw so we need to reset xPosition
      xPosition = START_OFFSET;

      yPosition += CELL_SIZE;
    }

    return displayData;
  }
}

// main
const startButton: HTMLButtonElement = document.querySelector("#start")!;
const resetButton: HTMLButtonElement = document.querySelector("#reset")!;
const speedSlider: HTMLInputElement = document.querySelector("#speed")!;
const fuzzinessSlider: HTMLInputElement = document.querySelector("#fuzziness")!;
const game = new GameOfLife();
let generations = 0;

game.render("#game");
game.onNextTick = (allDied: boolean) => {
  setStatus(++generations);

  if (allDied) {
    setIsRunning(false);
  }
};

startButton.addEventListener("click", () => {
  if (!game.isRunning) {
    init();
  }

  setIsRunning(!game.isRunning);
});

resetButton.addEventListener("click", () => {
  game.reset();
  init();
});

speedSlider.addEventListener("input", () => {
  game.speed = Number(speedSlider.value);
});

fuzzinessSlider.addEventListener("input", () => {
  game.fuzziness = Number(fuzzinessSlider.value) * 10;
});

function setIsRunning(isRunning: boolean) {
  game.isRunning = isRunning;

  if (isRunning) {
    startButton.classList.add("active");
  } else {
    startButton.classList.remove("active");
  }
}

function setStatus(gen: number) {
  document.querySelector("#status")!.innerHTML = `Generations: ${gen}`;
}

function init() {
  setIsRunning(false);
  generations = 0;
  game.speed = 50;
  game.fuzziness = 0;
  setStatus(generations);
  speedSlider.value = "50"
  fuzzinessSlider.value = "0";
}

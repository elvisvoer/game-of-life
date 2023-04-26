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

const CELL_SIZE = 50;
const START_OFFSET = 10;

const NUM_CELLS_X = Math.floor(window.innerHeight / CELL_SIZE);
const NUM_CELLS_Y = Math.floor(window.innerWidth / CELL_SIZE);

declare const d3: any;

class GameOfLife {
  private _displayData: D3Cell[][] = [];

  constructor() {
    this._displayData = this.getBoardDisplayData();
  }

  public render(rootElementSelector: string | HTMLElement) {
    const grid = d3
      .select(rootElementSelector)
      .append("svg")
      .attr("width", `100vw`)
      .attr("height", `100vh`);

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
      .on("click", (d: D3Cell) => {
        console.log("click");
        d.alive = !d.alive;
        this.setCellColor(d.coord, d.alive ? "gold" : "transparent");
      });
  }

  public setCellColor(coord: Point, color: string) {
    d3.select(`#c-${coord.x}-${coord.y}`).style("fill", color);
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

const game = new GameOfLife();
game.render(document.body);

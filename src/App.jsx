import React from "react";
import "./App.css";
import Grid from "./Grid";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    // The speed that the program should be running
    this.speed = 10000;

    const { router, params, location, routes } = this.props;

    this.query = new URLSearchParams(location.search);
    this.column = Number(this.query.get("column"));
    this.row = Number(this.query.get("row"));

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      generation: 0,
      wholeGrid: Array(this.row)
        .fill(0)
        .map((row) => new Array(this.column).fill(false)),
      percentage: 20,
      total: 0,
      speed: 1000,
    };
  }

  // Changing the state of the individual box
  selectBox = (row, col) => {
    let gridCopy = arrayCopy(this.state.wholeGrid);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      wholeGrid: gridCopy,
    });
  };

  // Spawn random live boxes when the function is called
  seed = () => {
    let gridCopy = arrayCopy(this.state.wholeGrid);

    // Let 5% of the total boxes be active: get how many boxes needs to be alive
    // Mark (total boxes * 0.95) boxes as alive
    let totalBox = this.row * this.column;
    let fivePercentActiveCount = Math.ceil(
      (totalBox * this.state.percentage) / 100
    );
    let chosen = [];
    this.setState({
      total: chosen.length,
    });
    while (fivePercentActiveCount > 0) {
      let temp = Math.floor(Math.random() * (totalBox - 1) + 1);
      if (!chosen.includes(temp)) {
        chosen.push(temp);
        fivePercentActiveCount = fivePercentActiveCount - 1;
      }
    }

    // Change the on-off state of the randomly chosen box
    while (chosen.length > 0) {
      let r = Math.floor(chosen[0] / this.column);
      let c = chosen[0] % this.column;
      gridCopy[r][c] = true;
      chosen.shift();
    }

    this.setState({
      wholeGrid: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.logic, this.state.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  // Reset the grid to all dead boxes
  resetButton = () => {
    let grid = Array(this.row)
      .fill()
      .map(() => Array(this.column).fill(false));
    this.setState({
      wholeGrid: grid,
      generation: 0,
      total: 0,
    });
  };

  handleSubmit = (event) => {

    event.preventDefault();
  };

  handleChange(event) {
    this.setState({ speed: event.target.value });
  }

  // Main game logic
  logic = () => {
    let g = this.state.wholeGrid;
    let g2 = arrayCopy(g);
    let temp = 0;

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let count = 0;

        if (g[i][j]) {
          temp++;
        }

        // Finding adjacent boxes that has determinative value of the current box
        if (i > 0) {
          if (g[i - 1][j]) {
            count++;
          }
        }

        if (i > 0 && j > 0) {
          if (g[i - 1][j - 1]) {
            count++;
          }
        }

        if (i > 0 && j < this.column - 1) {
          if (g[i - 1][j + 1]) {
            count++;
          }
        }

        if (j < this.column - 1) {
          if (g[i][j + 1]) {
            count++;
          }
        }

        if (j > 0) {
          if (g[i][j - 1]) {
            count++;
          }
        }

        if (i < this.row - 1) {
          if (g[i + 1][j]) {
            count++;
          }
        }

        if (i < this.row - 1 && j > 0) {
          if (g[i + 1][j - 1]) {
            count++;
          }
        }

        if (i < this.row - 1 && this.column - 1) {
          if (g[i + 1][j + 1]) {
            count++;
          }
        }

        // If alive and have more than three and less than two live neighbours, becomes dead
        if (g[i][j] && (count < 2 || count > 3)) {
          g2[i][j] = false;
        }

        // If dead and have three neighbours, it becomes live cell
        if (!g[i][j] && count === 3) {
          g2[i][j] = true;
        }
      }
    }

    this.setState({
      wholeGrid: g2,
      generation: this.state.generation + 1,
      total: temp,
    });
  };

  componentDidMount() {
    this.playButton();
    this.seed();
  }

  render() {
    return (
      <div>
        <h1>The Conway's Game of Life</h1>
        <div className="buttonBar">
          <button onClick={this.playButton}>Play</button>
          <button onClick={this.pauseButton}>Pause</button>
          <button onClick={this.resetButton}>Reset</button>
          <button onClick={this.seed}>Re-seed</button>

          <form onSubmit={this.handleSubmit}>
            <label>
              Set speed:
              <input
                type="number"
                value={this.state.speed}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <Grid
          wholeGrid={this.state.wholeGrid}
          rows={this.row}
          cols={this.column}
          selectBox={this.selectBox}
        />

        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default withRouter(App);

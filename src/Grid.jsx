import React from "react";
import Box from "./Box";

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.cols * 14;
    let rowsArr = [];
    let boxClass = "";
    let temp = 0;
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        if (this.props.wholeGrid[i][j]) {
          temp++;
        }
        boxClass = this.props.wholeGrid[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        <h3>Total alive boxes: {temp}</h3>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;

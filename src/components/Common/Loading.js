import React, { Component } from "react";

class Loading extends Component {
  render() {
    var html = "";

    if (this.props.show) {
      html = (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: "2",
            backgroundColor: "#000000c2",
            top: "0px",
            left: "0px"
          }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ height: "inherit" }}
          >
            <div
              className="spinner-grow align-self-center"
              role="status"
              style={{ width: "2.5rem", height: "2.5rem", color: "#b1d236" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    return html;
  }
}

export default Loading;

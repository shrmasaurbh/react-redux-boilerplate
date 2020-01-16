import React, { Component } from "react";

import errorImg from "../assets/images/404.gif";

class NotFoundComponent extends Component {
  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <img src={errorImg} alt="Error Page" />
        </div>
      </div>
    </div>
    );
  }
}

export default NotFoundComponent;


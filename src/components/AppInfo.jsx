import React, { Component } from 'react';

class AppInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: "v1.0",
    };
  }

  render() {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "gray" }}>
        TravelPro {this.state.version}
      </p>
    );
  }
}

export default AppInfo;
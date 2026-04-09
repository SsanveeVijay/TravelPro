import React, { Component } from 'react';

// Class Component (older React approach)
class AppInfo extends Component {

  // Constructor → used to initialize state
  constructor(props) {
    super(props);

    // State in class components
    this.state = {
      version: "v1.0",
    };
  }

  render() {
    return (
      // Inline styling
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "gray" }}>
        TravelPro {this.state.version}
      </p>
    );
  }
}

export default AppInfo;
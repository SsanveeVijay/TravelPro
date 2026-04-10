import React, { Component } from 'react';

// Class Component
class AppInfo extends Component {

  // Constructor → used to initialize state
  constructor(props) {
    super(props);

    // State in class components
    this.state = {
      version: "v1.0",
    };
  }
// Lifecycle method (runs after component is mounted)
  componentDidMount() {
    console.log("AppInfo component mounted");
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
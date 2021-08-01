import React, { Component } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  handlingData = async (e) => {
    e.preventDefault();
    let locationName = e.target.location.value;
    // console.log(locationName);
    const result = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${locationName}&format=json`
    );
    console.log(result.data[0]);
    this.setState({
      data: result.data[0],
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handlingData}>
          <label>
            <h3>Type Your Location</h3>
          </label>
          <input
            type="text"
            placeholder="enter your location"
            name="location"
          ></input>
          <input type="submit" placeholder="Explore"></input>
        </form>
        {/* <div>
          <h4>Location Information:</h4>
          {this.state.data.lon && <p>Longitude: {this.state.data.lon}</p>}
          {this.state.data.lat && <p>Latitude: {this.state.data.lat}</p>}
          {this.state.data.display_name && (
            <p>City Name: {this.state.data.display_name}</p>
          )}
        </div> */}

        <ListGroup>
          <ListGroup.Item variant="primary">
          {this.state.data.lon && <p>Longitude: {this.state.data.lon}</p>}
          </ListGroup.Item>
          <ListGroup.Item variant="secondary">
          {this.state.data.lat && <p>Latitude: {this.state.data.lat}</p>}
          </ListGroup.Item>
          <ListGroup.Item variant="success">
          {this.state.data.display_name && (
            <p>City Name: {this.state.data.display_name}</p>
          )}
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default App;

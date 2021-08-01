import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from "react-bootstrap/ListGroup";
import Image from 'react-bootstrap/Image'
import './App.css'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      viewMap:false,
      errorMesage: false,
      message:"Unable to geocode"
    };
  }

  handlingData = async (e) => {
    e.preventDefault();
    let locationName = e.target.location.value;
    // console.log(locationName);
    const result = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${locationName}&format=json`
    );
    try{
      this.setState({
        data: result.data[0],
        viewMap: true
      });

    }catch{
      this.setState({
        errorMesage: true
        // mapData:map.mapData
        // mapData:map.mapData[0]
      });

    }
    // let latData = this.state.data.lat;
    // let lonData = this.state.data.lon;
    // console.log(this.state.data.lat);
    // const map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${latData},${lonData}&zoom=1-18`);
    console.log(result.data[0]);
    // console.log(map)
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

        <ListGroup id = "group">
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
        {/* <img src = {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.data.lat},${this.state.data.lon}&zoom=1-18`} alt = 'map'/> */}

        { this.state.viewMap &&
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.data.lat},${this.state.data.lon}&zoom=1-18`} id = "img" fluid />
        }
        {
          this.state.errorMesage &&
          this.state.message
        }

            
      </div>
    );
  }
}

export default App;

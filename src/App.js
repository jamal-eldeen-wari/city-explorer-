import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      forecastData: [],
      viewMap: false,
      errorMesage: false,
      message: "Unable to geocode",
    };
  }

  handlingData = async (e) => {
    e.preventDefault();
    let locationName = e.target.location.value;
    // console.log(locationName);
    const result = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${locationName}&format=json`
    );
    const locationIQData = result.data[0];
    const forecast = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/weather-bit?latitude=${locationIQData.lat}&longitude=${locationIQData.lon}`
    );
    const movieDBData = result.data[0].display_name.split(",")[0];
    console.log(movieDBData);
    const movie = await axios.get(`${process.env.REACT_APP_SERVER_URL}/movie?city=${movieDBData}`)
    console.log(movie);
    try {
      this.setState({
        data: locationIQData,
        results:movieDBData,
        forecastData: forecast.data,
        movieData:movie.data,
        viewMap: true,
      });
    } catch {
      this.setState({
        errorMesage: true,
      });
    }
    console.log(result.data[0]);
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

        {this.state.viewMap && (
          <Image
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.data.lat},${this.state.data.lon}&zoom=1-18`}
            fluid
          />
        )}
        {this.state.errorMesage && this.state.message}

        {this.state.forecastData &&
          this.state.forecastData.map((weather) => {
            return (
              <section>
                {/* <p>{weather.date}</p>
                <p>{weather.description}</p> */}
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Weather-Bit Data 🌤️</Card.Title>
            <Card.Text>
            <p>{weather.date}</p>
            <p>{weather.description}</p>
            </Card.Text>
          </Card.Body>
        </Card>
              </section>
            );
          })}
           {this.state.movieData &&
         this.state.movieData.map((mov) =>{
           return(
             <div>
               <p>Title:{mov.title}</p>
               <p>Overview{mov.overview}</p>
               <p>Average Votes:{mov.average_votes}</p>
               <p>Total Votes:{mov.total_votes}</p>
               <Image src ={mov.image_url} alt="movie"/>
               <p>Popularity:{mov.popularity}</p>
               <p>Released:{mov.released_on}</p>
             </div>
           )

         })

         }

      </div>
    );
  }
}

export default App;

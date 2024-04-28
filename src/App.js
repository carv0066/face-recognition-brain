// Importing React library and Component class
import React, { Component } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./Components/Navigation/Navigation";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank";


const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin", // Chooses which pages will be shown and keeps track of where we are on the page
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    },
  };

// App class component extending React's Component class
class App extends Component {
  // Constructor method for initializing the state
  constructor() {
    // Calling the constructor of the parent class (Component)
    super();

    // Initializing the state with an empty input
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // Event handler for finding the location of faces
  calculateFaceLocation = (data) => {
    //Selecting the bounding box data to use
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    //adds an ID to the image
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    //returning object
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  // Event handler for displaying the face box
  displayFaceBox = (box) => {
    // Setting the box state to update the face box location
    this.setState({ box: box });
  };

  // Event handler for input changes
  onInputChange = (event) => {
    // Setting the input state to the entered value
    this.setState({ input: event.target.value });
  };

  //Event handler for detect button clicks
  onButtonSubmit = () => {
    // Setting the imageUrl state to the current input value
    this.setState({ imageUrl: this.state.input });
    fetch('https://smart-brain-backend-am83.onrender.com/imageurl', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          //if response is equal to true then
          fetch('https://smart-brain-backend-am83.onrender.com/image', {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  //Event handler for route changes
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);//Changes the state of to the empty intialState
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  // Render method to define the structure of the App component
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      // Main container for the App component
      <div className="App">
        <>
          {/* Displaying a random message or leave it empty */}
          <div></div>

          {/* ParticlesBg component for background particles animation */}
          <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
        </>

        {/* Navigation component for the application */}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {/* Conditional rendering based on the value of this.state.route */}
        {route === "home" ? (
          //
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : //
        route === "signin" ? (
          //
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

// Exporting the App component for use in other parts of the application
export default App;

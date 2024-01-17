// Importing React library and Component class
import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';


const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'fe496818dcae4370b151fc4bbb9bb7d1';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'cjeternal21';       
    const APP_ID = 'face-recognition-brain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    //I use the imageUrl parameter so that the image becomes dynamic
    const IMAGE_URL = imageUrl;

    //Setting up the JSON that will be sent to clarifai 
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

// Creating requestOptions object for the fetch request
const requestOptions = {
    method: 'POST',  // Using the HTTP POST method for the request
    headers: {
        'Accept': 'application/json',  // Specifying that the response should be in JSON format
        'Authorization': 'Key ' + PAT  // Including the Clarifai API key in the request headers
    },
    body: raw  // Including the JSON data in the request body
};

return requestOptions;
}


// App class component extending React's Component class
class App extends Component {

  // Constructor method for initializing the state
  constructor() {
    // Calling the constructor of the parent class (Component)
    super();

    // Initializing the state with an empty input
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin', // Chooses which pages will be shown and keeps track of where we are on the page
      isSignedIn: false

    }
  }

  // Event handler for finding the location of faces
  calculateFaceLocation = (data) => {
    //Selecting the bounding box data to use
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //adds an ID to the image
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //returning object
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  // Event handler for displaying the face box
  displayFaceBox = (box) => {
    // Setting the box state to update the face box location
    this.setState({box:box});
  }
  
  // Event handler for input changes
  onInputChange = (event) => {
    // Setting the input state to the entered value
    this.setState({input: event.target.value});
  }

  //Event handlet for detect button clicks
  onButtonSubmit = () => {
    // Setting the imageUrl state to the current input value
    this.setState({imageUrl: this.state.input});
  
     // Making a fetch request to the Clarifai API
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .then(response => console.log("hi", response))
    .catch(error => console.log('error', error));

  }

  //Event handler for route changes
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }else if(route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

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
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {/* Conditional rendering based on the value of this.state.route */}
        { route === 'home' 
        //
          ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        // 
          : (
            route === 'signin'
            //
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

// Exporting the App component for use in other parts of the application
export default App;

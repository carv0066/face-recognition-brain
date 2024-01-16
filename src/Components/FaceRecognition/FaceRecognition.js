// Importing necessary dependencies and styles
import React from "react";
import './FaceRecognition.css';

const faceRecognition = ({ imageUrl, box }) => {
    return(
        //Making sure image is centered
        <div  className="center ma ">
            {/* Adding images from URl and ensuring correct size*/}
            <div className="absolute mt2">
                <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto" />
                {/* Adding styles for the border of the recognized face, div is left empty */}
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} ></div>
            </div>
        </div>
    );
}
// Exporting the component for use in other parts of the application
export default faceRecognition;
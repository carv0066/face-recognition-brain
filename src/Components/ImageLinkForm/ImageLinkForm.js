// Importing necessary dependencies and styles
import React from "react";
import './ImageLinkForm.css';

// ImageLinkForm functional component
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        // Container for the form
        <div>
            {/* Instructional text */}
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try.'}
            </p>
            {/* Container for the form with centering */}
            <div className="center">
                {/* Form styling with padding and shadow */}
                <div className="form pa4 br3 shadow-5">
                    {/* Input field for image URL */}
                    <input className="f4 pa2 w-70" type="text" onChange={onInputChange} />
                    {/* Detect button */}
                    <button 
                        className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

// Exporting the component for use in other parts of the application
export default ImageLinkForm;

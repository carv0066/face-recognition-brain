import React from "react";
import Tilt from 'react-parallax-tilt'; // Importing the react-parallax-tilt library with npm
import brain from './brain.png'; // Importing the brain image
import './Logo.css'; // Importing the styles for the Logo component

const Logo = () => {
    return (
        <div className="ma4 mt0">
            {/* Adding Logo image with tilt animation from npm and applying styles */}
            <Tilt className="Tilt br2 shadow-2 p3" style={{ width: '150px' }}>
                <div style={{ height: '150px' }}>
                    <img
                        style={{ paddingTop: '25px', height: '100px' }}
                        src={brain} // Using the brain image as the source
                        alt="Logo" // Alt text for accessibility
                    />
                </div>
            </Tilt>
        </div>
    );
}
// Exporting the Logo component as the default export
export default Logo;

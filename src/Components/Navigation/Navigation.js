import React from "react";

// Navigation component - displays a navigation bar with a "Sign Out" link
const Navigation = ({ onRouteChange }) => {
    return (
        // Using a <nav> element with flexbox styling to align content to the end
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* Link styled as a paragraph with a pointer cursor */}
            <p
            onClick={() => onRouteChange('signin')}//Added an arrow function so that it doesn't run inmediatly as soon as the page loads
            className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
    );
}

// Exporting the Navigation component as the default export
export default Navigation;

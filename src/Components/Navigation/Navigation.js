import React from "react";

// Navigation component - displays a navigation bar with a "Sign Out" link
const Navigation = ({ onRouteChange, isSignedIn }) => {
if(isSignedIn){
    return (
            // Using a <nav> element with flexbox styling to align content to the end and at the top
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* Link styled as a paragraph with a pointer cursor */}
                <p
                onClick={() => onRouteChange('signout')}//Added an arrow function so that it doesn't run inmediatly as soon as the page loads
                className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    } else {
        return(
            //Same as above but I'm returning one nav with two p tags for the Sign In and the register
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
            </nav>
        )
    }
}

// Exporting the Navigation component as the default export
export default Navigation;

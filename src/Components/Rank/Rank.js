// Importing React library
import React from "react";

// Rank functional component
const Rank = ({ name, entries }) => {
    return (
        // Container for the rank information
        <div>
            {/* Displaying the user's rank information with a white text color and f3 font size */}
            <div className="white f3">
            {`${name}, your current entry count is...`}
            </div>

            {/* Displaying the user's rank number with a white text color and f1 font size */}
            <div className="white f1">
                {entries}
            </div>
        </div>
    );
}

// Exporting the Rank component for use in other parts of the application
export default Rank;

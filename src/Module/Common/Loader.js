import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

function Loader(props) {
    return (
        <ClockLoader
        size={40}
        className="loader"
        color="#5d5386"
      />
    );
}

export default Loader;
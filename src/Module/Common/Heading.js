import React from 'react';

function Heading({ headingText, buttonComponent }) {
    return (
        <div className="row">
            <div className="page-header">
                <div className="d-flex align-items-center">
                    <h2 className="page-header-title"> {headingText} </h2>
                    {
                        buttonComponent !== ''
                            ?
                            buttonComponent
                            :
                            ''
                    }

                </div>
            </div>
        </div>
    );
}

export default Heading;
import React from 'react';

const MsjError = (props) => {
    return (
            <div className="row mt-4">
        <div className="col-12 alert alert-danger">
            <h5 className="text-center">ERROR!</h5>
            <p className="text-center">{props.text1} <strong>{props.text2}</strong></p>
        </div> 
        </div>
    );
};

export default MsjError;
import React from 'react';

import './loading.css';

export default (props) => {
    let message = "";

    if(props.message) {
       message = props.message; 
    }

    return (
        <div>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
            <h3 className='text-center'>{message}</h3>
        </div>
    )
}
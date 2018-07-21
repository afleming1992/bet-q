import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

const IconNumberBlock = (props) => {
    
    var background = {
        backgroundColor: `$(props.color)`
    };


    return (
        <div className="icon-block" style={{backgroundColor: props.colour}}>
            <div className="icon-block-icon">
                <FontAwesomeIcon icon={props.icon} size='3x' />
            </div>
            <h4 className="icon-block-description">{props.description}</h4>
            <h3 className="icon-block-figure">{props.figure}</h3>
        </div>
    )
}

export default IconNumberBlock;
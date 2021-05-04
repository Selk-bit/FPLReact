import React from 'react';
import './Balance.css'

const balance = (props) => {
    return(
        <div className="score-counter" id="zbiii">
            <p className="score-text">Your Blance: {props.balance}</p>
        </div>
    );
}


export default balance ; 
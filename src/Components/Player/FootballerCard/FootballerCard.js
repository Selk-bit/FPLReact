import React from 'react'; 
import './FootballerCard.scss';


const card = (props) => {
    return (
        <div className="footballer-card">
        <img src={props.image} alt />
        <a href className="footballer-name">{props.name}</a>
        <a href className="footballer-position">Position: {props.position}</a>
        <a href className="footballer-team">Team: {props.team}</a>
        </div>
    );
}

export default card;
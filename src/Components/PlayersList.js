import React, { Component } from 'react';
import './PlayersList.css';
import Player from './Player/Player';




class PlayersList extends Component {


    render () {
        let Goalkeepers = Object.keys(this.props.Players.Goal)
            .map(i => {
            return <Player kit={this.props.Players.Goal[i][0]} price={this.props.Players.Goal[i][1]} name={i} id={this.props.Players.Goal[i][2]} addGoalieClicked={this.props.addGoalieClicked} addGoalie={this.props.addGoalie}>{i}</Player>});
        let Defenders = Object.keys(this.props.Players.Deffense)
            .map(i => {
              return <Player kit={this.props.Players.Deffense[i][0]} price={this.props.Players.Deffense[i][1]} id={this.props.Players.Deffense[i][2]} PlayerName={this.props.PlayerName} name={i} addDefender={this.props.addDefender}>{i}</Player>});
        let Midfielders = Object.keys(this.props.Players.Midfield)
            .map(i => {
              return <Player kit={this.props.Players.Midfield[i][0]} price={this.props.Players.Midfield[i][1]} id={this.props.Players.Midfield[i][2]} PlayerName={this.props.PlayerName} name={i} addMidfielder={this.props.addMidfielder}>{i}</Player>});
        let Forwards = Object.keys(this.props.Players.Attack)
            .map(i => {
              return <Player kit={this.props.Players.Attack[i][0]} price={this.props.Players.Attack[i][1]} id={this.props.Players.Attack[i][2]} PlayerName={this.props.PlayerName} name={i} addForward={this.props.addForward}>{i}</Player>});



        return (
        <div className="toggle-container">
        <ul className="toggle-list">
          <li className="toggle-list__title">Goalkeepers</li>
          {Goalkeepers}
          <li className="toggle-list__title">Defenders</li>
          {Defenders}
          <li className="toggle-list__title">Midfielders</li>
          {Midfielders}
          <li className="toggle-list__title">Forwards</li>
          {Forwards}
        </ul>
      </div>
        )
    }
}

export default PlayersList; 
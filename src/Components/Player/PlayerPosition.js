import React, {Component} from 'react'; 
import DefaultShirt from '../../assets/Default.png';
import GlassesShirt from '../../assets/Glasses.png';
import RedsShirt from '../../assets/Reds.png';
import Card from './FootballerCard/FootballerCard'

import './PlayerPosition.scss';


class Player extends Component {
    state = {
        isclicked: false,
        name: "",
        img: '', 
        team: '', 
        position: ''
    }

    componentDidUpdate(){
        if(this.props.fieldclicked && this.state.isclicked == true) {
            this.setState({isclicked: false, name: '', img: ''})
        }

    }

    both = (i, j, k) => {
        this.props.clickplayer();
        this.playerclicked(i, j, k);
    }

    playerclicked = (playername, playerimg, num) => {
        let position = ''
        if(num == 0){position = "GoalKeeper"}
        if(num >= 1 && num <= 4){position = "Deffender"}
        if(num >= 5 && num <= 7){position = "Midfielder"}
        if(num >= 8 && num <= 10){position = "Forward"}
        let team = this.props.PlayerTeam[num]
        this.setState({isclicked: true, name: playername, img: playerimg, team: team , position: position})
    }

    RenderDefenderShirt = (i) => {
        return <img onClick={() => this.both(this.props.PlayerName[i], this.props.UrlsOnPitch[i], i)} src={this.props.PlayerTeam[i] === "blues" ? GlassesShirt : RedsShirt} style={{cursor: "pointer"}} className={"Defense-" + i + "-Position"} />;
    }

    RenderPosition = () => {
        let holder = [];

        for(let i=0; i<11; i++) {
            this.props.AddPlayerClicked[i] ? 
            holder.push(
                <div>
                <img src="https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png" onClick={() => this.props.removeDefence(this.props.PlayerName[i])} className={"removeDefender" + i} ></img>
                {this.RenderDefenderShirt(i)}
                <div className={"Defender" + i + "div"}><p className="Text">{this.props.PlayerName[i]}</p></div>
            </div>)
            : 
            holder.push(<img src={DefaultShirt} className={"Defense-" + i + "-Position"} />)
                
        }

        return holder;
    }

render() {
    return (
        <div>
        {this.state.isclicked ? <Card name={this.state.name} image={this.state.img} team={this.state.team} position={this.state.position}/> : ''}
        {this.RenderPosition()}
        </div>
    );
             
}
}


export default Player ;

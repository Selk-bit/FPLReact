import React, {Component} from 'react'; 
import './Player.css';
import Kit from '../../assets/Kit.png'; 
import KitRed from '../../assets/KitRed.png'; 
import pipe from '../../assets/pipe.png'; 




class Player extends Component  {

    which = (a) => {
        this.props.addDefender ? this.props.addDefender(a) : 
            this.props.addMidfielder ? this.props.addMidfielder(a) : 
                this.props.addForward(a);
    }

    renderElement = () => {
        let check = false;
        if(this.props.PlayerName){
            for(let i=0; i<11; i++) {
                if(this.props.PlayerName[i] == this.props.name) {
                    check = true;
                }
            }
        }

        if(check)
           { return  <a>{this.props.kit == "blues" ? 
                 <img alt="Info" src={Kit} className="icon"></img> 
                 : 
                 <img alt="Info" src={KitRed} className="icon"></img>}</a>;}
        return  <a  onClick={ () => this.which(this.props.name)}>{this.props.kit == "blues" ? 
             <img alt="Info" src={Kit} className="icon"></img> 
             : 
             <img alt="Info" src={KitRed} className="icon"></img>} </a>;
     }
    

render() { 
    return (
        <div>
        {this.props.addGoalie ?

            <li className="toggle-list__item">
                {this.props.addGoalieClicked ?
                    <a>
                       {this.props.kit == "blues" ? 
                            <img alt="Info" src={Kit} className="icon"></img> 
                            : 
                            <img alt="Info" src={KitRed} className="icon"></img>} 
                    </a>
                 :
                    <a  onClick={ () => this.props.addGoalie(this.props.name)}>
                       {this.props.kit == "blues" ? 
                            <img alt="Info" src={Kit} className="icon"></img> 
                            : 
                            <img alt="Info" src={KitRed} className="icon"></img>} 
                    </a>
                }
            <p className='text'>{this.props.children}</p>
            <img alt="Info" src={pipe} className="pipe"></img>
            <p className='price'>{this.props.price}£</p>

            </li> 

        : 
            <li className="toggle-list__item">
            {this.renderElement()}
            <p className='text'>{this.props.children}</p>
            <img alt="Info" src={pipe} className="pipe"></img>
            <p className='price'>{this.props.price}£</p>
            </li>

        }
        </div>
    );
}
}


export default Player; 
import React, {Component} from 'react';
import './Pitch.css';
import PlayerPosition from './Player/PlayerPosition';

class Pitch extends Component  {
  state = {
    fieldclicked: true
  }

  clickfield = () => {
    this.setState({
      fieldclicked: true
    })

  }

  clickplayer = () => {
    this.setState({
      fieldclicked: false
    })
  }

  render() {
    return (
      <div id="escenario">
        <input type="checkbox" id="conmutador-input" />
        <div id="contenedor-responsive" title="Responsive behavior, resize your browser ;)">
        {!this.state.fieldclicked ? <div onClick={this.clickfield} className="blur"></div> : ''}
        <PlayerPosition 
           AddPlayerClicked={this.props.AddPlayerClicked}
           removeDefence={this.props.removeDefence}
           PlayerName={this.props.PlayerName}
           PlayerTeam={this.props.PlayerTeam}
           fieldclicked={this.state.fieldclicked}
           clickplayer={this.clickplayer}
           UrlsOnPitch={this.props.UrlsOnPitch} />
            <div className="contenedor-campo">
              <div id="esquina-superior-izquierda" />
              <div id="esquina-superior-derecha" />
              <div id="esquina-inferior-izquierda" />
              <div id="esquina-inferior-derecha" />
              <div id="linea-vertical-medio-campo-arriba" />
              <div id="linea-vertical-medio-campo-abajo" />
              <div id="zona-central">
                <div id="area-grande-izquierda" />
                <div id="area-pequena-izquierda" />
                <div id="medio-campo-izquierda" />
                <div id="semicirculo-izquierda" />
                <div id="penalty-izquierda" />
                <div id="linea-vertical-medio-campo-medio" />
                <div id="circulo-central" />
                <div id="area-grande-derecha" />
                <div id="area-pequena-derecha" />
                <div id="medio-campo-derecha" />
                <div id="semicirculo-derecha" />
                <div id="penalty-derecha" />
              </div>
            </div>
        </div>
      </div>
    );
  }
}


export default Pitch;
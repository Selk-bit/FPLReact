import React from 'react'; 
import './addPlayer.css';
import Select from 'react-select';
import axios from '../axios-orders';
import { storage } from "../firebaseconfig";
import SimpleReactValidator from 'simple-react-validator';



const teams = [
    { value: 'blues', label: 'Blues' },
    { value: 'reds', label: 'Reds' },
  ]

const positions = [
    { value: 'Goal', label: 'Golie' },
    { value: 'Deffense', label: 'Defender' },
    { value: 'Midfield', label: 'Midfielder' },
    { value: 'Attack', label: 'Forwarder' },
  ]

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }


class NewPlayer extends React.Component {
    constructor() {
      super();
      this.validator = new SimpleReactValidator();
    }

    state = {
        name: '', 
        price: null,
        team: '',
        position: '', 
        image: '', 
        imageValidate : 1,
    }




    handleName = (e) =>  {
      this.setState({
          name: e.target.value,
      });
  }

    handlePrice = (e) =>  {
      this.setState({
          price: e.target.value,
      });
  }

    handleTeam = (e) =>  {
      this.setState({
          team: e,
      });
  }

    handlePosition = (e) =>  {
      this.setState({
        position: e,
      });
  }

    handleImage = (e) =>  {
      this.setState({
        image: e.target.files[0]
      });
  }

    onDrop = (picture) =>  {
        this.setState({
            image: picture,
        });
    }


    postdata = () => {
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
      let datime = date + '/' + time;
      let extention = '';
      if(this.state.image.name) {
        let imgname = this.state.image.name;
        extention = imgname.split('.').pop();
        console.log(extention)
      }
      if (this.validator.allValid() && this.validator.fieldValid('name') && this.validator.fieldValid('price') && extention == 'png') {
        let position = this.state.position.value;
        let name = this.state.name;
        let price = this.state.price;
        let team = this.state.team.value;
        let data = {[name]: [team, price, datime]}
  
        axios.patch('/players/' + position + '.json', data)
        .then(response => console.log(response))
        .catch(error => console.log(error))
  
  
         const uploadTask = storage.ref(`PlayerImages/${this.state.name}`).put(this.state.image);
         uploadTask.on(
           "state_changed",
           error => {
             console.log(error);
           },
         );
      } else {
        if(this.validator.allValid() && extention != '') {
          this.setState({imageValidate: 0})
        }
        this.validator.showMessages();
        this.forceUpdate();
      }
    }


    render() {
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <label className="tab">Add a Player</label>
                    <p>{this.state.Url}</p>
                    <div className="login-form">
                        <div className="sign-up-htm">
                            <div className="group">
                            <label htmlFor="user" className="label">Player's Name</label>
                            <input id="user" type="text" value={this.state.name} className="input" onChange={this.handleName} />
                            {this.validator.message('name', this.state.name, 'required|alpha')}
                            </div>
                            <div className="group">
                            <label htmlFor="user" className="label">Player's Price</label>
                            <input id="user" type="text" value={this.state.price} className="input" onChange={this.handlePrice} />
                            {this.validator.message('price', this.state.price, 'required|numeric')}
                            </div>
                            <div className="group">
                            <label htmlFor="pass" className="label">Player's Photo</label>
                            <input type="file" style={{display: "none"}} ref={imageinput => this.imageinput = imageinput} onChange={this.handleImage}></input>
                            <button className="Button" onClick={() => this.imageinput.click()}>Upload Image</button>
                            {this.validator.message('image', this.state.image, 'required')}
                            {this.state.imageValidate == 0 ? <p>The Image should be a transparent PNG</p> : <p></p>}
                            </div>
                            <div className="group">
                            <label htmlFor="pass" className="label">Player's Team</label>
                            <Select styles={customStyles} value={this.state.team} options={teams} onChange={this.handleTeam} />
                            {this.validator.message('team', this.state.team, 'required')}
                            </div>
                            <div className="group">
                            <label htmlFor="pass" className="label">Player's Position</label>
                            <Select styles={customStyles} value={this.state.position}  options={positions} onChange={this.handlePosition}/>
                            {this.validator.message('position', this.state.position, 'required')}
                            </div>

                            <div className="group">
                            <input type="submit" className="button" onClick={this.postdata} />
                            </div>
                            <div className="hr" />
                            <div className="foot-lnk"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 


export default NewPlayer;
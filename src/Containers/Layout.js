import React, { Component } from 'react';
import './Layout.css'; 
import '../Components/PlayersList';
import PlayersList from '../Components/PlayersList';
import Pitch from '../Components/Pitch'; 
import Balance from '../Components/Balance'; 
import axios from '../axios-orders';
import { storage } from "../firebaseconfig";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';




class Layout extends Component {

    //   Players: {
    //      Goal: {Salim: "blues", Yassine: "blues", Adam: "reds"},
    //      Deffense: {Oussama: "blues", Adel: "blues", l7amz: "blues", Tarik: "blues",  Adnan: "reds",  Boazza: "reds",  nigga: "reds"},
    //      Midfield: {Ou7moz: "blues", Zeggaf: "blues"},
    //      Attack: {Ou7mot: "blues", Adnan: "blues"}
    //  },

    state = {
        Players: null,
        AddPlayerClicked : [],
        PlayerName: [],
        PlayerTeam: [],
        BluesNum: 0,
        RedsNum: 0,
        Url: [],
        UrlsOnPitch: [],
        isRetrieved: false,
        balance: 150,
    }

    componentDidMount(){        
        axios.get('/players.json')
        .then(response => {
            this.setState({Players: response.data})

        })
        .catch(error => console.log(error))




    }

    componentDidUpdate(){
        let saver = [];
        let urlsaver = {}
        if(this.state.Players && this.state.isRetrieved == false){
        let Golie = Object.keys(this.state.Players.Goal);
        let Deffence = Object.keys(this.state.Players.Deffense);
        let Midfielder = Object.keys(this.state.Players.Midfield);
        let Attackers = Object.keys(this.state.Players.Attack);
        let two = Golie.concat(Deffence)
        let three = two.concat(Midfielder)
        let arr = three.concat(Attackers)
        for(let i = 0; i<arr.length; i++){
            storage.ref(`PlayerImages/`+ arr[i]).getDownloadURL().then((res) => {
                urlsaver = {[arr[i]]: res}
                saver[i] = urlsaver;
                this.setState({Url: saver, isRetrieved: true})
            });
        }
    }


    }





    GoalieAdd = (name) => {
        let Numblues = this.state.BluesNum;
        let Numreds = this.state.RedsNum;
        let holder = this.state.AddPlayerClicked;
        let holderV2 = this.state.PlayerName;
        let piturls = this.state.UrlsOnPitch;
        let playerteam = this.state.PlayerTeam;
        let currentbalance = this.state.balance - this.state.Players.Goal[name][1];
        for(let i=0; i<this.state.Url.length; i++){
            let zbi = this.state.Url[i];
            if(zbi[name]){
                piturls[0] = zbi[name];
            }

        }
        if((Numblues <= 2 && this.state.Players.Goal[name][0] == "blues") || (Numreds <= 2 && this.state.Players.Goal[name][0] == "reds") ) {
            holder[0] = true; 
            holderV2[0] = name;
            playerteam[0] = this.state.Players.Goal[name][0];
            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance});
            if(this.state.Players.Goal[name][0] == "blues" ) {this.setState({BluesNum: Numblues+1})}
            if(this.state.Players.Goal[name][0] == "reds") {this.setState({RedsNum: Numreds+1})}
        }
        
        else { 

            NotificationManager.error("Can't add more Than Three Players From One Team", 'Info', 5000,);
        }
            
            
    }


    DefenderAdd = (name) => {
        let holder = this.state.AddPlayerClicked;
        let holderV2 = this.state.PlayerName;
        let Numblues = this.state.BluesNum;
        let Numreds = this.state.RedsNum;
        let piturls = this.state.UrlsOnPitch;
        let playerteam = this.state.PlayerTeam;
        let currentbalance = this.state.balance - this.state.Players.Deffense[name][1];
        let ifstill = false;

        for(let i = 1; i<5; i++){
            if(this.state.PlayerName[i] == "Default" || this.state.PlayerName[i] == null ) {
                 ifstill = true;    
            }
        }


        if(ifstill) {

            if((Numblues <= 2 && this.state.Players.Deffense[name][0] == "blues") || (Numreds <= 2 && this.state.Players.Deffense[name][0] == "reds")) {
                if(this.state.AddPlayerClicked[1] && this.state.AddPlayerClicked[2] && this.state.AddPlayerClicked[3]) {
                    holder[4] = true;
                    holderV2[4] = name;
                    playerteam[4] = this.state.Players.Deffense[name][0];
                    for(let i=0; i<this.state.Url.length; i++){
                        let zbi = this.state.Url[i];
                        if(zbi[name]){
                            piturls[4] = zbi[name];
                        }
                    }
                    this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                else {
                    if(this.state.AddPlayerClicked[1] && this.state.AddPlayerClicked[2] && !this.state.AddPlayerClicked[3]) {
                        holder[3] = true;
                        holderV2[3] = name;
                        playerteam[3] = this.state.Players.Deffense[name][0];
                        for(let i=0; i<this.state.Url.length; i++){
                            let zbi = this.state.Url[i];
                            if(zbi[name]){
                                piturls[3] = zbi[name];
                            }
                        }
                        this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                    else {
                        if(this.state.AddPlayerClicked[1] && !this.state.AddPlayerClicked[2] ) {
                            holder[2] = true;
                            holderV2[2] = name;
                            playerteam[2] = this.state.Players.Deffense[name][0];
                            for(let i=0; i<this.state.Url.length; i++){
                                let zbi = this.state.Url[i];
                                if(zbi[name]){
                                    piturls[2] = zbi[name];
                                }
                            }
                            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                        else {
                            holder[1] = true;
                            holderV2[1] = name;
                            playerteam[1] = this.state.Players.Deffense[name][0];
                            for(let i=0; i<this.state.Url.length; i++){
                                let zbi = this.state.Url[i];
                                if(zbi[name]){
                                    piturls[1] = zbi[name];
                                }
                            }
                            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                    }
                    
                }

                if(this.state.Players.Deffense[name][0] == "blues" ) {this.setState({BluesNum: Numblues+1})}
                if(this.state.Players.Deffense[name][0] == "reds") {this.setState({RedsNum: Numreds+1})}
            }

            else {
                NotificationManager.error("Can't add more Than Three Players From One Team", 'Info', 5000,);

            }
        }

        else {
            NotificationManager.error("No place Left", 'Info', 5000,);

        }


    }

    MidfielderAdd = (name) => {
        let holder = this.state.AddPlayerClicked;
        let holderV2 = this.state.PlayerName;
        let Numblues = this.state.BluesNum;
        let Numreds = this.state.RedsNum;
        let piturls = this.state.UrlsOnPitch;
        let playerteam = this.state.PlayerTeam;
        let currentbalance = this.state.balance - this.state.Players.Midfield[name][1];
        let ifstill = false;

        for(let i = 5; i<8; i++){
            if(this.state.PlayerName[i] == "Default" || this.state.PlayerName[i] == null ) {
                 ifstill = true;    
            }
        }


        if(ifstill) {

            if((Numblues <= 2 && this.state.Players.Midfield[name][0] == "blues") || (Numreds <= 2 && this.state.Players.Midfield[name][0] == "reds")) {
                if(this.state.AddPlayerClicked[5] && this.state.AddPlayerClicked[6]) {
                    holder[7] = true;
                    holderV2[7] = name;
                    playerteam[7] = this.state.Players.Midfield[name][0];
                    for(let i=0; i<this.state.Url.length; i++){
                        let zbi = this.state.Url[i];
                        if(zbi[name]){
                            piturls[7] = zbi[name];
                        }
                    }
                    this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                else {
                    if(this.state.AddPlayerClicked[5] && !this.state.AddPlayerClicked[6]) {
                        holder[6] = true;
                        holderV2[6] = name;
                        playerteam[6] = this.state.Players.Midfield[name][0];
                        for(let i=0; i<this.state.Url.length; i++){
                            let zbi = this.state.Url[i];
                            if(zbi[name]){
                                piturls[6] = zbi[name];
                            }
                        }
                        this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                    else {

                            holder[5] = true;
                            holderV2[5] = name;
                            playerteam[5] = this.state.Players.Midfield[name][0];
                            for(let i=0; i<this.state.Url.length; i++){
                                let zbi = this.state.Url[i];
                                if(zbi[name]){
                                    piturls[5] = zbi[name];
                                }
                            }
                            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})
                    }
                    
                }

                if(this.state.Players.Midfield[name][0] == "blues" ) {this.setState({BluesNum: Numblues+1})}
                if(this.state.Players.Midfield[name][0] == "reds") {this.setState({RedsNum: Numreds+1})}
            }

            else {
                NotificationManager.error("Can't add more Than Three Players From One Team", 'Info', 5000,);

            }
        }

        else {
            NotificationManager.error("No place Left", 'Info', 5000,);

        }

    }


    ForwardAdd = (name) => {
        let holder = this.state.AddPlayerClicked;
        let holderV2 = this.state.PlayerName;
        let Numblues = this.state.BluesNum;
        let Numreds = this.state.RedsNum;
        let piturls = this.state.UrlsOnPitch;
        let playerteam = this.state.PlayerTeam;
        let currentbalance = this.state.balance - this.state.Players.Attack[name][1];
        let ifstill = false;

        for(let i = 8; i<11; i++){
            if(this.state.PlayerName[i] == "Default" || this.state.PlayerName[i] == null ) {
                 ifstill = true;    
            }
        }


        if(ifstill) {

            if((Numblues <= 2 && this.state.Players.Attack[name][0] == "blues") || (Numreds <= 2 && this.state.Players.Attack[name][0] == "reds")) {
                if(this.state.AddPlayerClicked[8] && this.state.AddPlayerClicked[9]) {
                    holder[10] = true;
                    holderV2[10] = name;
                    playerteam[10] = this.state.Players.Attack[name][0];
                    for(let i=0; i<this.state.Url.length; i++){
                        let zbi = this.state.Url[i];
                        if(zbi[name]){
                            piturls[10] = zbi[name];
                        }
                    }
                    this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                else {
                    if(this.state.AddPlayerClicked[8] && !this.state.AddPlayerClicked[9]) {
                        holder[9] = true;
                        holderV2[9] = name;
                        playerteam[9] = this.state.Players.Attack[name][0];
                        for(let i=0; i<this.state.Url.length; i++){
                            let zbi = this.state.Url[i];
                            if(zbi[name]){
                                piturls[9] = zbi[name];
                            }
                        }
                        this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})}
                    else {

                            holder[8] = true;
                            holderV2[8] = name;
                            playerteam[8] = this.state.Players.Attack[name][0];
                            for(let i=0; i<this.state.Url.length; i++){
                                let zbi = this.state.Url[i];
                                if(zbi[name]){
                                    piturls[8] = zbi[name];
                                }
                            }
                            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam, balance: currentbalance})
                    }
                    
                }

                if(this.state.Players.Attack[name][0] == "blues" ) {this.setState({BluesNum: Numblues+1})}
                if(this.state.Players.Attack[name][0] == "reds") {this.setState({RedsNum: Numreds+1})}
            }

            else {
                NotificationManager.error("Can't add more Than Three Players From One Team", 'Info', 5000,);

            }
        }

        else {
            NotificationManager.error("No place Left", 'Info', 5000,);

        }

    }


    DefenderRemove = (name) => {
        let holder = this.state.AddPlayerClicked;
        let holderV2 = this.state.PlayerName;
        let piturls = this.state.UrlsOnPitch;
        let playerteam = this.state.PlayerTeam;
        let currentbalance;
        let index = holderV2.indexOf(name);


        for(let i = 0; i<11; i++) {
            if(index == i) {
                holder[i] = false; 
                holderV2[i] = null;
                piturls[i] = null;
                playerteam[i] = null;
            this.setState({AddPlayerClicked: holder, PlayerName: holderV2, UrlsOnPitch: piturls, PlayerTeam: playerteam});
            }
        }

        let Numblues = this.state.BluesNum;
        let Numreds = this.state.RedsNum;
        let removedteam;
        if(this.state.Players.Goal[name]) {
            removedteam = this.state.Players.Goal[name][0]
            currentbalance = this.state.balance + Number(this.state.Players.Goal[name][1])
        }

        if(this.state.Players.Deffense[name]) {
            removedteam = this.state.Players.Deffense[name][0]
            currentbalance = this.state.balance + Number(this.state.Players.Deffense[name][1])

        }

        if(this.state.Players.Midfield[name]) {
            removedteam = this.state.Players.Midfield[name][0]
            currentbalance = this.state.balance + Number(this.state.Players.Midfield[name][1])

        }

        if(this.state.Players.Attack[name]) {
            removedteam = this.state.Players.Attack[name][0]
            currentbalance = this.state.balance + Number(this.state.Players.Attack[name][1])

        }

        if( removedteam == "blues" ) {this.setState({BluesNum: Numblues-1, balance: currentbalance})}
        if( removedteam == "reds" ) {this.setState({RedsNum: Numreds-1, balance: currentbalance})}
    }




    render() {

        let pitch = null; 
        let playerList = null;
        let balance = null;


        if(this.state.Players){
            let addGoalieClicked = this.state.AddPlayerClicked[0];

            pitch = (
                <Pitch 
                AddPlayerClicked={this.state.AddPlayerClicked}
                removeDefence={this.DefenderRemove}
                PlayerName={this.state.PlayerName}
                PlayerTeam={this.state.PlayerTeam}
                UrlsOnPitch={this.state.UrlsOnPitch}/>
            );

            playerList = (
                <PlayersList Players={this.state.Players}
                addGoalie={this.GoalieAdd}
                addDefender={this.DefenderAdd}
                addMidfielder={this.MidfielderAdd}
                addForward={this.ForwardAdd}
                addGoalieClicked={addGoalieClicked}
                PlayerName={this.state.PlayerName} />
            );

            balance = (
                <Balance
                balance={this.state.balance}/>

            
            );
        }

        
        return (
            <div>
             {playerList}
             {balance}
             {pitch}
             <NotificationContainer/>
            </div>
        ); 

    }
}


export default Layout; 
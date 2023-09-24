import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      count: 16,
      color1:"red",
      color2:"darkgreen"
    };
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/');
    this.socket.onmessage = (e) => {

      const data = JSON.parse(e.data);
    
      const receivedMessage = data.message.data;
      
      this.setState({
        color1: !receivedMessage.lamp? "red":"darkred",
        color2: !receivedMessage.lamp? "darkgreen":"lime",
        count: receivedMessage.temp,
        currentTemp: receivedMessage.currentTemp,
      });
    };


  }
  componentDidMount(){
      axios
        .get('http://127.0.0.1:8000/contact/')
        .then((res) => {
          const currentTemp = res.data.data[0].attributes.currentTemp;
          const Temp = res.data.data[0].attributes.temp;
          const Lamp = res.data.data[0].attributes.lamp;
          this.setState({
            color1: !Lamp? "red":"darkred",
            color2: !Lamp? "darkgreen":"lime",
            count: Temp,
            currentTemp: currentTemp,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }
  render(){
  return (
    <div class="ac-control-panel">
        <div class="lamp" style={{backgroundColor: this.state.color1}}></div>
        <div class="temperature-display">{this.state.count}</div>
        <div class="lamp" style={{backgroundColor: this.state.color2}}></div>
    </div>
  );}
}

export default App;

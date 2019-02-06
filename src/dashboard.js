import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const microphone = require('./microphone');

class Dashboard extends React.Component {
  static socket = null;

  componentDidMount() {
    this.openSocket();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  openSocket = () => {
    this.socket = new WebSocket('ws://20.20.20.20:7777');;
    this.socket.onmessage = this.onMessage;
    this.socket.onopen = this.onSocketOpen;

    this.socket.onerror = (err) => {
        console.log("Error - "+err);
    };
    this.socket.onclose = () => {
        console.log("[SOCKET] Closed");
    };
  };

  onSocketOpen = () => console.log('[SOCKET] connected');

  onMessage = event => {

    console.log("[SOCKET] OnMessage " + event.data);

    //const json = JSON.parse(event.data);

  };

  handleStart = () => {
      microphone.turnOn();
  };

  handleStop = () => {
      microphone.turnOff();
  };

  render() {
    return (
        <Card>
            <CardHeader title="Welcome to the administration" />
            <CardContent>Lorem ipsum sic dolor amet...

                <button id="my-start-button" onClick={this.handleStart}>Start</button>
                <button id="my-stop-button" onClick={this.handleStop}>Stop</button>

            </CardContent>
        </Card>
    )
  }
}

export default Dashboard;
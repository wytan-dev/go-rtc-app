import React , {Component} from 'react';
import { connect, sendMessage } from './api'
import './App.css';
import Header from './Components/Header/Header';
import ChatHistory from './Components/ChatHistory/ChatHistory';

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      chatHistory: []
    }
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }

  send() {
    console.log("Hello World");
    sendMessage("Hello World");
  }

  render(){
    return(
      <div className="App">
        <Header/>
        <ChatHistory chatHistory={this.state.chatHistory} />
        <button onClick={this.send}>Hit</button>
      </div>
    )
  }
}
export default App;

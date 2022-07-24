import React, {Component} from 'react';
import axios from "axios";
import "./App.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId();
  console.log(this.state.playerName);
}

handleChange = (event) => {
  const replace = event.target.value.split(' ').join('_');
  if(replace.length > 0) {
    this.setState({playerName: replace})
  } else {
    //alert("Please type players name")
    console.log('error')
  }
}

getPlayerId = () => {
  axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
  .then(async res => {
    if(res.data.data[0] === undefined){
      alert("This player does not exist or hasn't played yet!")
      console.log('error')
    } else if(res.data.data.length > 1) {
      alert("Please specify the name more!")
      console.log('error')
    } else {
      await this.getPlayerStats(res.data.data[0].id)
    }
  }).catch(err => {
    console.log(err);
  })
}

getPlayerStats = (playerId) => {
  axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`)
  .then(async res => {
    console.log(res.data.data)
    this.setState({ playerStats: res.data.data[0]})
  }).catch(err => {
    console.log(err);
  })
}

  render(){
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className='Forma' type="text" value={this.state.value} 
            onChange={this.handleChange} 
            placeholder=" Enter players name"/>
          </label>
          <input className='Submit' type="submit" value="Submit"/>
        </form>
        GP : {this.state.playerStats["games_played"]}
        <br />
        PPG : {this.state.playerStats["pts"]}
        <br />
        APG : {this.state.playerStats["ast"]}
        <br />
        OREB : {this.state.playerStats["oreb"]}
        <br />
        DREB : {this.state.playerStats["dreb"]}
        <br />
        BLK: {this.state.playerStats["blk"]}
        <br />
        3P% : {this.state.playerStats["fg3_pct"]}
        <br />
      </div>
    );
  }
}

export default App;
import React from 'react';
import './App.css';
//import * as territories from './territories.json';

const countryNames = ['Russia', 'China', 'India', 'Brazil', 'USA', 'Europe'];
const startingCash = [0,0,30,20,17,15,10];
// should be determined at game start
const playerNames = ['Alex', 'Chris'];

// players have cash and investments, init blank arrays for countries
const initPlayerHoldings = (players, countryNames) => {
  return players.map((playerName) => {
    return { 
      "name":playerName,
      "holdings": countryNames.map((countryName) => {
        return {
          name:countryName,
          investments: []
        };
      }),
      "cash": startingCash[playerNames.length]
    }
  });
};

class PlayerCell extends React.Component { 
  render() {
    return (
      <td className={this.props.country.name}>
        {this.props.country.investments.reduce(
          (display, num) => 
          display ? display + `, ${num.toString()}` : num.toString(), undefined )}
      </td>
    );
  }
}
class PlayerRow extends React.Component {
  render(){
    const playerCellList = this.props.player.holdings.map(
      (country) =>
        <PlayerCell key={this.props.player.name+country.name} country={country} />
    );
    return (
      <tr>  
        <td key={this.props.player.name}>{this.props.player.name} </td>
        {playerCellList}
      </tr>
    );
  }
}

class PlayerGridHeader extends React.Component {
  render(){  
    return (
      <thead>
        <tr>
          <th key='playerName'> Player Name </th>
          {countryNames.map(
            (country) => 
            (<th className={country} key={country}> {country} </th>)
          )}
        </tr>
      </thead>
    );
  }
}


class PlayerGrid extends React.Component {
  componentDidMount(){
    //fetch();
  }

  render() {
    // console.log(this.props.players);
    const playerRows = this.props.players.map( 
      (player) =>
      (<PlayerRow key={player.name} player={player} />) 
    );

    return (
      <table>
        <PlayerGridHeader key={'playerGridHeader'} />
        <tbody>
          {playerRows}
        </tbody>
      </table>
    );
  }
}

class Track extends React.Component {
  render(){
    let track = [...Array(26).keys()].map( 
      (num) =>
      <td key={num}> {num}</td> 
    );

    return (
      <table><tbody><tr>
      {track}
      </tr></tbody></table>
    );
  }
}
 
class Board extends React.Component {
  render() {
    return ( <canvas className="Board" /> );
  }
}


function App() {
  const players = initPlayerHoldings(playerNames, countryNames)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PlayerGrid name="playerGrid" players={players}/>
      <Track name="track" />
      <Board name="board" />
    </div>
  );
}
/*

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

board, 
  displays pieces, factories, armies, ships, countries 
rondel
  
score track 

*/

export default App;

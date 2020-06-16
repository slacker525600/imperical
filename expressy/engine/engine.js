const countryList =["russia",
    "china",
    "india",
    "america",
    "brazil",
    "europe",
];
// not sure about this ... could go really abstract and make it the function to call for the country action
const rondel = ['tax','factory','produce','manuver','invest','import','produce','manuver'];
const unwritten = {
    "board": {
        "map" : {"spaces" : [""], "links":[{"to":"","from":""}]},
        "scores": {}
    },
    "players": [],
};
const startingMoney = [0,0,30,20,15,12,12]


class Share {
    constructor(stake){
        this.owner = 'c'; // options.playernames[0] ?
        this.stake=stake;
    }

}

class Country {
    constructor(name){
        this.name = name;
        this.rondelLoc = null;
        this.scoreTrack = 0;
        this.shares = Range(9).map((val) => new Share(val+1));
    }

    getOwners(){
        // cached? why loop when could save on incremental updates
        const owners = {};

        var sorted = [];
        for(var key in owners) {
            sorted[sorted.length] = key;
        }
        sorted.sort();
    };

    getController(){
        return Object.keys(getOwners())[0];
    }

    act(){
        // find owner,

        // send present owner options, wait for owner input.
    };

    getAvailableActions(){

    }
}
// could make this less interesting
class Player {
    constructor(name, startingMoney){
        this.name = name;
        this.money = startingMoney;
    }
}


class baseGame {
/* phases of game, 
bid by country 
take actions based on same order, 

to implement later 
blind bidding cutover? 
*/

    constructor(options){
        this.players = options.playerNames.map((name) => 
            new Player(name,startingMoney[options.playerNames.length])
            );
        this.options = options;
        this.countries = countryList.map((name) => new Country(name));
        this.turn = 0;
        this.actingCountryIndex = 0;
        this.bidding = true;
    }

    getCountryScores(player) {
        let total = 0;
        // do I feel better if the reduce is a filter and a sum?
        return this.countries.reduce((total, country) => 
            total + country.scoreTrack / 5 * 
                country.shares.reduce((acc, share) => 
                    acc + share.owner == player ? share.stake : 0
                )
        );
    };

    getPlayerScore(player) {
        return player.money + getCountryScores(player.name);
    };

    getScores() { 
        let scores = {};
        game.players.forEach(player => {
            scores[player.name] = getPlayerScore(player, countryScores);
        });
        return scores;
    };
    
    nextActor() {
        this.actingCountryIndex++;
        return this.actingCountry();
    };

    actingCountry() {
        return this.countries[this.actingCountryIndex % this.countries.length];
    };

    isOver() {
        var country = this.actingCountry();
        // console.log(country);
        if (country.scoreTrack >= 25) {
            console.log('game over');
            return true;
        }
        // this is a placeholder to actually calculating score. 
        // was just trying to make sure game ends eventually
        country.scoreTrack ++;
        return false;
    };

    isValidAction(action){
        return this.actingCountry().getAvailableActions().contains(action)
    }

    handleBiddingAction(player, action){
        // action can be buy or pass 
        // player must be next in list 
        turn = turn % this.players.length;
        if (! ['buy', 'pass'].contains(action.name)){
            return "Not a valid action for this phase of the game";
        } else if (player != this.players[turn]){
            return "not your turn to bid";
        } else if (action.share.cost > this.players[turn].money) {
            return "Not enough money to buy selected share";
        } else if (!this.actingCountry().shares.contains(action.share.value)){
            return "This share has already been purchased";
        }
        this.turn++;

        if(action.name == 'buy'){
            this.players[turn].money -= action.share.cost;
            this.players[turn].shares.append(
                this.actingCountry().shares.remove(action.share.value))
        }
        return undefined;
    }

    isValidRequest(player, action){
        if (this.bidding){
            return this.handleBiddingAction(player,action);
        } else if(player != nextActor().getController())
            // should swiss bank stop? happen here? 
            return "Player is not controller for active country";
        // else if (isValidAction(action))
        //   return "Not a legal move"
        return undefined;
    }

};

console.log('About to instantiate the game');

// game loop 
// default start at russia. 
let lastCompletedMove = 'europe';

const options = {
    'randomness': {
        'rondel': true,
    },
    'playerNames': [
        'c',
        'a'
    ],

};
/*
// old method 'running game' from cli 
var game = new baseGame( options);
console.log(`starting game ${JSON.stringify(game)}`);
// broadcast feature to ui, ? 

while (!game.isOver()) {
  // find country next in order
  // find player that controls country, 
  // player makes move. 
  console.log(`in game ${JSON.stringify(game)}`);
  const results = game.nextActor().act();
  
  console.log(results);
  // broadcast(results);
}
*/

module.exports = new baseGame(options);
 
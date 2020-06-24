const countryList =[
    'russia',
    'china',
    'india',
    'america',
    'brazil',
    'europe',
];

const rondel = [
    'tax',
    'factory',
    'produce',
    'manuver',
    'invest',
    'import',
    'produce',
    'manuver'
];

const buyPhaseActions = [
    'buy', 
    'pass'
];

const unwritten = {
    'board': {
        'map' : {'spaces' : [''], 'links':[{'to':'','from':''}]},
        'scores': {}
    },
    'players': [],
};

const startingMoney = [
    0, // 0 player game not playable
    0, // 1 player game not playable
    30,
    20,
    15,
    12,
    12
];


class Share {
    constructor(stake){
        this.owner = undefined;
        this.stake=stake;
    }
    setOwner(owner){
        this.owner = owner;
    }
}

class Country {
    constructor(name){
        this.name = name;
        this.rondelLoc = null;
        this.scoreTrack = 0;
        this.shares = [...Array(9).keys()].map((val) => new Share(val+1));
    }

    getOwners(){
        const owners = {};

        var sorted = [];
        for(var key in owners) {
            sorted[sorted.length] = key;
        }
        sorted.sort();
    };

    getControlingPlayer(){
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
        this.shares = [];
    }
}


class baseGame {
    constructor(options){
        this.players = options.playerNames.map((name) => 
            new Player(name,startingMoney[options.playerNames.length])
            );
        this.options = options;
        this.countries = countryList.map((name) => new Country(name));
        this.turn = 0;
        this.actingCountryIndex = 0;
        this.buyPhase = true;
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
        if (buyPhase){
            return this.buyingPlayer();
        } else {
            this.actingCountryIndex++;
            return this.actingCountry().getControlingPlayer();    
        }
    };

    buyingPlayer(){
        const playerIndex = turn % this.players.length + this.actingCountryIndex;
        return players[playerIndex]; 
    }

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
        // route should verify action is valid before calling
        // action can be buy or pass 
        // player must be next in list 
        this.turn++;
        const turn = this.turn % this.players.length;

        if(action.name == 'buy'){
            this.players[turn].money -= action.share.cost;
            this.players[turn].shares.append(
                this.actingCountry().shares.remove(action.share.value))
        }
        return undefined;
    }

    isValidRequest(player, action){
        if(player != this.nextActor()) {
            // should swiss bank stop? happen here? 
            // if country passing invest and has money next actor is swiss bank array ordered by 
            return "Player is not in control";
        } else if (this.buyPhase){
            if (! buyPhaseActions.contains(action.name)){
                return "Not a valid action for this phase of the game";
            } else if (player != this.buyingPlayer()){
                return "Player requesting action not your turn to buy";
            } else if (action.share.cost > this.players[turn].money) {
                return "Not enough money to buy selected share";
            } else if (!this.actingCountry().shares.contains(action.share.value)){
                return "This share has already been purchased";
            }
        } else {
            // else if (isValidAction(action))
            //   return "Not a legal move"
            // check details of action. 
            return 'Not yet implemented, ie finish buy phase first chris';
        } 
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
 
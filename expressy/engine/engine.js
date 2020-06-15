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
        this.rondelLoc = null;
        var vals = [1,2,3,4,5]; // whats the js shorthand for 1:9
        // this will need to be updated to 1-9 forget all the values though
        this.shares = vals.map((val) => new Share(val));
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
}
// could make this less interesting
const startingMoney = [0,0,30,20,15,12,12]
class Player {
    constructor(name, startingMoney){
        this.name = name;
        this.money = startingMoney;
    }
}

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

class baseGame {
    constructor(options){
        this.players = options.playerNames.map((name) => 
            new Player(name,startingMoney[options.playerNames.length])
            );
        this.options = options;
        this.countries = countryList.map((name) => new Country(name));
        this.actingCountryIndex = 0;
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
        // only need to check the 
        // this.actingCountryIndex
        // for (var i = 0; i < this.countries.length; i++){
            var country = this.actingCountry();
            // console.log(country);
            if (country.scoreTrack >= 25) {
                console.log('game over');
                return true;
            }
            //console.log(`increasing score for ${JSON.stringify(country)}`)
             country.scoreTrack ++;
        // }
        return false;
    };

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
 
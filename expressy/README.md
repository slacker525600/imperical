generated with https://expressjs.com/en/starter/generator.html 

npm install
DEBUG=myapp:* npm start

updated config to use port 3300 instead of 3000, as react and express both use the same default ports

avoiding lobby for now
a lobby provides:
  a list of games
    join
    observe
  ability to create a new game 

a game provides:
  a state 
  a set of actions a player may take at a given moment 

a game must track:
  who can act 
  any blocking requests 

a player tells the game what actions they want to take  

creating a game requires:
  rules  // we'll bake this into the game 
  players

after a few googles ... thinking of upgrading to use 
https://github.com/boardgameio/boardgame.io/blob/master/package.json 
think most of the 'logic ' implemented to date will port right in, 
defaults to react dom logic, so frontend should slide into same idea 
get a lot for free woo 
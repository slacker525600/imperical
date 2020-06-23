var express = require('express');
var router = express.Router();
var engine = require('../engine/engine');

engine.baseGame

/* GET home page. */
router.post('/', function(req, res, next) {
  /* request must contain
    player making request, 
    and action to take 
    // verify that request is from actor 
    // verify that actor's move is according to rules. 
  */
  const err = engine.isValidRequest(req.player, req.action);
  if (err){
    res.status(400);
    res.json({"error_message":err});
  }

  console.log(`in game ${JSON.stringify(engine)}`);
  const results = engine.nextActor().act(req.action);
  
  console.log(results);
  res.json(engine);
  //res.render('index', { title: 'Express' });
});

// get endpoint will always return full game state 
// is this overkill maybe, will it be more complicated ?
router.get('/', function(req, res, next) {
  console.log(`in game ${JSON.stringify(engine)}`);
  res.json(engine);
  //res.render('index', { title: 'Express' });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var engine = require('../engine/engine');

engine.baseGame

/* GET home page. */
router.post('/', function(req, res, next) {
  /* request must contain
    player making request, 
    and action to take 
  */
  const err = engine.isValidRequest(req.player, req.action)
  if (err){
    res.status(400);
    res.json({"error_message":err});
  }
  console.log(`in game ${JSON.stringify(engine)}`);
  const results = engine.nextActor().act();
  
  console.log(results);
  res.json(engine);
  //res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  console.log(`in game ${JSON.stringify(engine)}`);
  res.json(engine);
  //res.render('index', { title: 'Express' });
});


module.exports = router;

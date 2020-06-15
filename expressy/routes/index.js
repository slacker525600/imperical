var express = require('express');
var router = express.Router();
var engine = require('../engine/engine');

engine.baseGame

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`in game ${JSON.stringify(engine)}`);
  const results = engine.nextActor().act();
  
  console.log(results);
  res.json(engine);
  //res.render('index', { title: 'Express' });
});

module.exports = router;

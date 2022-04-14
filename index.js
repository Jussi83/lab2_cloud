const port = process.env.port || 3000;

const express = require('express');

const app = express();

app.get('/calc', function (req, res) {
  let parameters = req.query;
  let opt = parameters.operation;
  let nr1 = 0;
  let nr2 = 0;
  try {
    nr1 = parseInt(parameters.numberone);
    nr2 = parseInt(parameters.numbertwo);
    if ((typeof (opt) === 'string') && typeof (nr1) === 'number' && typeof (nr2) === 'number') {
      if ((opt === 'add') || (opt === 'sub') || (opt === 'div') || (opt === 'mul')) {
        let result = calc(opt, nr1, nr2);
        res.status(result._error ? 500 : 200);
        res.json(result);
      } else {
        res.status(400);//Bad request
        res.json(null);
      }
    } else {
      res.status(400);
      res.json(null);
    }
  } catch (error) {
    res.status(500);//server internal error
    res.json(null);
  }
});
app.get('/', function (req, res) {
  res.status(404);//Page not available
  res.json(null);
});
//start webserver on port ?
app.listen(port);

//calculation functions
function calc(operation, nr1, nr2) {
  let result = 0;
  switch (operation) {
    case 'add':
      result = nr1 + nr2;
      break;
    case 'sub':
      result = nr1 - nr2;
      break;
    case 'div':
      result = nr1 / nr2;
      break;
    case 'mul':
      result = nr1 * nr2;
      break;
  }
  return result;
}
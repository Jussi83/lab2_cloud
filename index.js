const port = process.env.PORT || 3000;

const express = require('express');//setting up express

const app = express();

app.get('/calc', function (req, res) {//calling endpoint calc
  let parameters = req.query;
  let operationen = parameters.operation;
  let nr1 = 0;
  let nr2 = 0;
  try {
    nr1 = parseInt(parameters.numberone);
    nr2 = parseInt(parameters.numbertwo);
    if ((typeof (operationen) === 'string') && typeof (nr1) === 'number' && typeof (nr2) === 'number') {
      if ((operationen === 'add') || (operationen === 'sub') || (operationen === 'div') || (operationen === 'mul')) {
        let result = calc(operationen, nr1, nr2);
        res.status(result._error ? 500 : 200);//checks https status
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
    res.status(500);//Internal server error!
    res.json(null);
  }
});

app.get('/', function (req, res) {
  res.status(404);//page not found
  res.json(null);
});

app.get('*', function (req, res) {
  res.status(404);
  res.json(null);
});

//start the webserver on which port you desire and it will listen
app.listen(port, () => {
  console.log("server listen on port: " + port)
});

// calulator function
function calc(op, num1, num2) {
  let result = 0;
  switch (op) {
    case 'add':
      result = num1 + num2;
      break;
    case 'sub':
      result = num1 - num2;
      break;
    case 'div':
      result = num1 / num2;
      break;
    case 'mul':
      result = num1 * num2;
      break;
  }
  return result;
}  
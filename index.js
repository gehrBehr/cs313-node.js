var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
const path = require('path')

const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', handleMath)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


  function handleMath(request, response) {
    var requestUrl = url.parse(request.url, true);
  
    console.log("Query parameters: " + JSON.stringify(requestUrl.query));
  
    // TODO: Here we should check to make sure we have all the correct parameters
  
    var postageType = requestUrl.query.mailType;
    var operand1 = Number(requestUrl.query.operand1);
    var operand2 = Number(requestUrl.query.operand2);
  
    computeOperation(response, operation, operand1, operand2);
  }
  
  function computeOperation(response, op, left, right) {
    op = op.toLowerCase();
  
    var result = 0;
  
    if (op == "add") {
      result = left + right;
    } else if (op == "subtract") {
      result = left - right;		
    } else if (op == "multiply") {
      result = left * right;
    } else if (op == "divide") {
      result = left / right;
    } else {
      // It would be best here to redirect to an "unknown operation"
      // error page or something similar.
    }
  
    // Set up a JSON object of the values we want to pass along to the EJS result page
    var params = {operation: op, left: left, right: right, result: result};
  
    // Render the response, using the EJS page "result.ejs" in the pages directory
    // Makes sure to pass it the parameters we need.
    response.render('pages/result', params);
  
  }

  function calculate(req,res){
  
    var Operand_one = req.query.Operand_one;
    var Operand_two = req.query.Operand_two;
    var operator = req.query.operator;

    one = parseInt(Operand_one);
    two = parseInt(Operand_two);

    var result = 0;

    switch (operator) {
      case "add":
       result = one + two; 
        break;
      case "sub":
       result = one - two; 
        break;
      case "mult":
      result = one * two; 
        break;
      case "divi":
      result = one / two; 
        break;  
      default:
      result = -1;
        break;
    }

    console.log(result);

  }

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
    var weight = Number(requestUrl.query.weight);
  
    computeOperation(response, postageType, weight);
  }
  
  function computeOperation(response, type, weight) {
    type = type.toLowerCase();
  
    var price = 0;

    switch (type) {
      case "stamped":
        if(weight <= 1){
          price = 0.50;
        }else if(weight > 1 && weight <= 2){
          price = 0.71;
        }else if(weight > 2 && weight <= 3){
          price = 0.92;
        }else if(weight > 3 && weight <= 3.5){
          price = 1.13;
        }
        else{
          type = flat;
        }
      case "metered":
        if(weight <= 1){
          price = 0.47;
        }else if(weight > 1 && weight <= 2){
          price = 0.68;
        }else if(weight > 2 && weight <= 3){
          price = 0.89;
        }else if(weight > 3 && weight <= 3.5){
          price = 1.10;
        }
        else{
          type = flat;
        }
      case "flat":
        if(weight <= 4){
          price = 3.50;
        }else if(weight > 4 && weight <= 8){
          price = 3.75;
        }else if(weight > 8 && weight <= 9){
          price = 4.10;
        }else if(weight > 9 && weight <= 10){
          price = 4.45;
        }else if(weight > 10 && weight <= 11){
          price = 4.80;
        }else if(weight > 11 && weight <= 12){
          price = 5.15;
        }else if(weight > 12 && weight <= 13){
          price = 5.50;
        }else{
          price = -1;
        }      
        break;
      case "firstClass":
        if(weight <= 4){
          price = 3.50;
        }else if(weight > 4 && weight <= 8){
          price = 3.75;
        }else if(weight > 8 && weight <= 9){
          price = 4.10;
        }else if(weight > 9 && weight <= 10){
          price = 4.45;
        }else if(weight > 10 && weight <= 11){
          price = 4.80;
        }else if(weight > 11 && weight <= 12){
          price = 5.15;
        }else if(weight > 12 && weight <= 13){
          price = 5.50;
        }else{
          price = -1;
        }   
        break;  
      default:
        break;
    }
  
    // Set up a JSON object of the values we want to pass along to the EJS result page
    var params = {type: type, weight: weight, price: price};
  
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

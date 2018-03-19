const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', calculate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));




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

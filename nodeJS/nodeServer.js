// content of index.js
const { Pool, Client } = require('pg');
const connectionString = 'postgresql://ta_user:ta_pass@127.0.0.1:5432/familyhistory'
const http = require('http');
const port = 3000;

const pool = new Pool({
  connectionString: connectionString,
});



const requestHandler = (request, response) => {
  console.log(request.url);
  if(request.url == "/home"){
    console.log("Request handler home was called.");
    // response.writeHead(200, {"Content-Type": "text/html"});
    // response.write('<h1>Welcome to the Home Page</h1>');
    pool.query('SELECT * FROM person', (err, res) =>{
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(res));
      pool.end();
      response.end();
    });
    
  }
  else if(request.url == '/getData'){

    console.log("Request handler Json was called.");
    response.writeHead(200, {"Content-Type": "application/json"});
    var otherArray = ["Name", "class"];
    var otherObject = { item1: "Adam Gehring", item2: "cs313" };
    var json = JSON.stringify({ 
        anObject: otherObject, 
        anArray: otherArray, 
        another: "item"
    });
    response.end(json);
    }
    else{
        console.log("Request handler Json was called.");
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write('<h1>404 Not Found</h1>');
        response.end();
    }
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
  
});
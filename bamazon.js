var http = require("http");
var mysql = require("mysql");
var url = require("url");
var PORT = 8000; 
var fs = require("fs");
var socketio = require('socket.io');


var inquirer = require("inquirer");
var serverMan = http.createServer(handleRequest);
serverMan.listen(PORT, function() {
  // Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bigdad",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});




function handleRequest (req, res) {

	var urlParts = url.parse(req.url);
     
    switch (urlParts.pathname) {
     case "/":
      displayUser(urlParts.pathname, req, res);
      break;
    case "/manager":
      displayManager(urlParts.pathname, req, res);
      break;
    case "/superviser":
      displaySuperviser(urlParts.pathname, req, res);
      break;
    default:
      display404(urlParts.pathname, req, res);
    }

}



function displayUser(url, req, res) {
   fs.readFile("index.html", function(err, data) {
    data  += "<div><a href='/'>User</a></div>";
    data += "<div><a href='/manager'>Manager</a></div>";
    data += "<div><a href='/superviser'>Superviser</a></div>";
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
 
}


function displayManager(url, req, res) {
  var myHTML = "<html>";
  myHTML += "<body><h1>Manager</h1>";
  myHTML += "<div><a href='/'>User</a></div>";
  myHTML += "<div><a href='/manager'>Manager</a></div>";
  myHTML += "<div><a href='/superviser'>Superviser</a></div>";
  myHTML += "</body></html>";
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(myHTML);
}





function displaySuperviser(url, req, res) {
  var myHTML = "<html>";
  myHTML += "<body><h1>Superviser</h1>";
  myHTML += "<div><a href='/'>User</a></div>";
  myHTML += "<div><a href='/manager'>Manager</a></div>";
  myHTML += "<div><a href='/superviser'>Superviser</a></div>";
  myHTML += "<div></body></html>";
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(myHTML);
}


function display404(url, req, res) {
  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.write("<h1>404 Not Found </h1>");
  res.end("The page you were looking for: " + url + " can not be found ");
}



var io = socketio.listen(serverMan);
io.sockets.on('connection', function(socket){
  //console.log("clinet connected!");
   
   socket.on('listfirst' , function(data){
     connection.query('SELECT * FROM products', function(err, res){
        if(err){
           throw err;
        }
        //console.log(res);
        
        var dataSQL = [] ;

        for (var i = 0; i < res.length; i++) {
        var x = res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity;
        dataSQL.push(x);
        }
           
        
        socket.emit('firstlist', dataSQL); 
        //console.log(res); 
        /*
        connection.end(function(err){
          if(err)
            throw err; 

        }); 
        */  
     });
    
  });
  

  


  socket.on('rint' , function(data){
     var insertWord = data[0];
     var number = parseInt(data[1]+""); 
     connection.query( "select  item_id, stock_quantity FROM products WHERE ?",[{product_name : insertWord }],
      function (err, res) {
          if (err) {
            throw err;
          }


        
        //console.log(res[0].stock_quantity);
        //console.log(res[0].item_id);
       
        if(res[0].stock_quantity  >= number )  {
          var changeValue = res[0].stock_quantity - number; 
          //console.log(changeValue );
          var transferdata = [] ; 
          transferdata.push(res[0].item_id);
          transferdata.push(changeValue);
          //console.log(transferdata);
          socket.emit('updateQ', transferdata);

        }else{  
        var data = "Insufficient quantity!";
        socket.emit('smart', data);
        }         

        
      });
      
      


      
  });


  socket.on('updateR' , function(data){
          console.log(data);
          connection.query( "UPDATE products SET  ? WHERE ?", [{stock_quantity: data[1]},{ item_id :data[0]}] ,function (err, res) {
                if (err) {
                  throw err;
                }

          console.log('SUCCESS, updated ', res.affectedRows, 'rows');
          socket.emit('goback');

          });
        


  });

  

});







/*
connection.query('select * from products ', function(err, res){
       if(err){
        throw err;
       }

        //console.log(res);

        connection.end(function(err){
        if(err)
    	throw err; 

    }); 

});
*/

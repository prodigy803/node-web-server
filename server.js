const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

//app.use(express.static(__dirname + '/public'));//this is the middle ware: we have now shifted it after the middleware

app.use((req, res, next)=>{//next exists when you want to tell when the all the middleware functions are done.
  var now = new Date().toString();//this gives the current time:

  var log = `${now}:${req.method} ${req.url}`;

  console.log(log);

  fs.appendFileSync('server.log',log +'\n');
  next();
});

app.use(express.static(__dirname + '/public'));//this is the middle ware:

// app.use((req,res,next)=>{//since there is no next() command, the following commands wont be executed:
//   res.render('maintanence.hbs')
// });

hbs.registerHelper('getCurrentYear',() =>{

  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.get('/', (req,res)=>{
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: "Pushkaraj",
  //   likes:[
  //     'Movies',
  //     'Food'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle:'Home',
    messageBody:'Heres some text',
    //currentYear:new Date().getFullYear()
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/about',(req,res)=>{
  //res.send('<h1>About Page</h1>');
  res.render('about.hbs',{
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});


app.get('/bad',(req,res)=>{
  res.send({
    errorMessage :'Unable to serve up the page'
  });


});
app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});

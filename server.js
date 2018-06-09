var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(request, respond){
    console.log('========> inside "/"');
    if (!request.session.counter){
        request.session.counter = 1;
    }
    else{
        request.session.counter++
    }
    let counter = request.session.counter;
    console.log('counter =>',request.session.counter)
    respond.render('counter', {counter:counter});
})

app.get('/add', function(request, response){
    console.log('========> inside "/add"');
    request.session.counter +=2;
    let counter = request.session.counter;
    response.redirect('/')
    // response.render('counter', {counter:counter});
})

app.get('/reset', function(request, respond){
    console.log('==> clear session <==');
    console.log(session)
    request.session.destroy();
    console.log(session)
    respond.redirect('/')
})

app.listen(8000, function(){
    console.log("listening on 8000")
})
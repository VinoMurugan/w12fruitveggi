const express = require('express');
const app = express();
const jsxEngine = require
('jsx-view-engine')
//data

const fruits = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM packag
const vegetables = require('./models/vegetables.js');
//ADDING OUR VIEW TEMPLATES
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));


app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


//routes
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    res.render('fruits/Index', { fruits: fruits });
});

//new - get the form to add a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

//DELETE


//UPDATE


//CREATE
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    // res.send('data received');
    res.redirect('/fruits');
});

//EDIT



app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('fruits/show',{
        fruit: fruits[req.params.indexOfFruitsArray]
    })//render the info using the 
});

// FOR VEGETABLES 
app.get('/vegetables/', (req, res) => {
    try{
    // res.send(fruits);
    res.render('vegetables/Index', { vegetables: vegetables });
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});


//new - get the form to add a new fruit
app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});

//DELETE


//UPDATE


//CREATE
app.post('/vegetables', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    vegetables.push(req.body);
    console.log(vegetables);
    res.send('data received');
});



//EDIT


app.get('/vegetables/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('vegetables/show',{
        vegetable: vegetables[req.params.indexOfFruitsArray]
    })

});

app.listen(3000, () => {
    console.log('listening');
});



//Add dotenv
require('dotenv').config()

//loading Express
const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

const methodOverride = require('method-override')

const mongoose = require('mongoose')
// connect to Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
// // IMPORT DOTENV MODULE TO CONNECT TO YOUR ENV FILE
// const dotenv = require("dotenv");

//data
const fruits = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM packag
const vegetables = require('./models/vegetables.js');
const Fruit = require('./models/fruit.js');
const Vegetable = require("./models/vegetable.js");

//ADDING OUR VIEW TEMPLATES
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());


//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})

// seed route
app.get('/fruits/seed', async (req, res)=>{
  try {
      await Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ])
      res.redirect('/fruits')
  } catch (error) {
      console.error(error)
    }
});


//ROUTES INDUCES
//Index route - All the fruits

// Index route - All the fruits
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {fruits: fruits});
  } catch(error) {
    console.error(error);
  }
});



// //routes
// app.get('/fruits/:id', (req, res) => {
//     // res.send(fruits);
//     res.render('fruits/Index', { fruits: fruits });
// });

//new - get the form to add a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

//DELETE
app.delete('/fruits/:id', async (req, res)=>{
  try {
      await Fruit.findByIdAndRemove(req.params.id)
      res.redirect('/fruits')//redirect back to fruits index
  } catch(error) {
      console.error(error);
    }
  })

//UPDATE

app.put("/fruits/:id",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    // fruits.push(req.body);
     await Fruit.findByIdAndUpdate(req.params.id, req.body)

    res.redirect("/fruits")

  } catch(error) {
    console.log(error)
  }
})

//CREATE
//Create - Add a new fruit to your fruits
app.post("/fruits",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    // fruits.push(req.body);
     await Fruit.create(req.body)

    res.redirect("/fruits")

  } catch(error) {
    console.log(error)
  }
})

//EDIT
app.get('/fruits/:id/edit', async (req, res)=>{
  try {
      const foundFruit = await Fruit.findById(req.params.id)
      res.render('fruits/Edit', 
      {fruit: foundFruit})
  } catch(error) {
      console.log(error)
    }
})


//add show route
app.get("/fruits/:id", async (req, res) => {

    try {
      const fruit = await Fruit.findById(req.params.id);
  
      res.render("fruits/Show", {fruit: fruit})
    } catch(error) {
      console.log(error)
    }
  });


// INDEX FOR VEGETABLES 
app.get('/vegetables/', async (req, res) => {
    try{
    // res.send(fruits);
    const vegetables = await Vegetable.find();
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
app.delete('/vegetables/:id', async (req, res)=>{
  try {
      await Vegetable.findByIdAndRemove(req.params.id)
      res.redirect('/vegetables')//redirect back to fruits index
  } catch(error) {
      console.error(error);
    }
  })


//UPDATE
app.put('/vegetables/:id',async (req, res)=>{
  try{
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    //  vegetables.push(req.body);
    await Vegetable.findByIdAndUpdate(req.params.id, req.body)

    res.redirect("/vegetables")

  } catch(error) {
    console.log(error)
  }
})


//CREATE
app.post('/vegetables',async (req, res)=>{
  try{
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    //  vegetables.push(req.body);
    await Vegetable.create(req.body)
    res.redirect("/vegetables")

  } catch(error) {
    console.log(error)
  }
})



//EDIT
app.get('/vegetables/:id/edit', async (req, res)=>{
  try {
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render('vegetables/Edit', 
      {vegetable: foundVegetable})
  } catch(error) {
      console.log(error)
    }
})


//SHOE FOR VEGETABLES
app.get('/vegetables/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('vegetables/show',{
        vegetable: vegetables[req.params.indexOfFruitsArray]
    })

});

app.listen(3000, () => {
  console.log('listening')
})



const express = require('express');
const port = process.env.PORT || 7000;

const app = express();

const mongoose = require('./config/mongoose');

app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views', './views');


const global_variable = require('./models/variables');

async function generate(){
    await global_variable.deleteMany({});
    await global_variable.create({
        high_point : 301,
        low_point : 180,
        min_height : 0.8,
        min_distance : 20,
        no_of_notches : 3
    })
}


generate();

app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`App listening on post ${port}`);
})


const express = require('express');
const port = process.env.UWG_RUNNING_PORT;

const app = express();

const mongoose = require('./config/mongoose');

app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views', './views');


const global_variable = require('./models/variables');

async function generate(){
    await global_variable.deleteMany({});
    await global_variable.create({
        high_point : 408,
        low_point : 160,
        min_height : 0.4,
        min_distance : 15,
        no_of_notches : 6
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


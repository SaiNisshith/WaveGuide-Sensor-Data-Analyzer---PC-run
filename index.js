const express = require('express');
const port = process.env.UWG_RUNNING_PORT;
const app = express();
var watch = require('node-watch');
const regression = require('./controllers/regression');
const find_temp_vs_time = require('./controllers/find_temp_vs_time');
const mongoose = require('./config/mongoose');
const fs = require('fs-extra')

app.use('/',require('./routes/index'));


let regressionEquations = [];
let ref_Tof = [];
let check = false;
async function getRegressionEquation(){
    try {
        let t = await regression.ToT_Functions;
        regressionEquations = t.temp_Functions;
        ref_Tof = t.ref_Tof;
        
        check = true;
        return;
    } catch (error) {
        console.log("Error getting regression e")
    }
    
}

let non = process.env.UWG_NUMBER_OF_NOTCHES,
    low_point = process.env.UWG_LOW_POINT,
    high_point = process.env.UWG_HIGH_POINT,
    min_height = process.env.UWG_MIN_HEIGHT;

watch(process.env.UWG_TRACKING_FOLDER, { recursive: true , filter: /\.csv$/}, async function(evt, name) {
   
    if(evt == "update"){
     let k = {};
    //  console.log(name, evt);
     try {
        if(!check){
            await getRegressionEquation();
            check = true;
         }
         if(regressionEquations.length==0){
             console.log("Error getting the reg equations");
             return;
         }
         let getThetempvsTime = await find_temp_vs_time.fillintoDB(non,name,low_point,high_point,min_height,regressionEquations,ref_Tof);
        await fs.remove(name, err => {
          if (err) return console.error(err)
        //   console.log('success!')
        })
         console.log(getThetempvsTime);
         return;
     } catch (error) {
         console.log("Error :", err );
     }
    }
 });

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`App listening on post ${port}`);
})


const regression = require('./../controllers/regression');
const find_temp_vs_time = require('./../controllers/find_temp_vs_time');
const global_variable = require('../models/variables');
var watch = require('node-watch');
const fs = require('fs-extra')
const path = require('path');

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
module.exports.Monitor = function(req,res){
    watch(path.resolve(req.query.folderName), { recursive: true , filter: /\.csv$/}, async function(evt, name) {
        if(evt == "update"){
         let k = {};
        //  console.log(name, evt);
         try {
            let global_var = await global_variable.find({});

            let non = global_var[0].no_of_notches,
            low_point = global_var[0].low_point,
            high_point = global_var[0].high_point,
            min_height =global_var[0].min_height,
            min_distance = global_var[0].min_distance;
            if(!check){
                let k = await getRegressionEquation();
                check = true;
             }
             if(regressionEquations.length==0){
                 console.log("Error getting the reg equations");
                 return;
             }
             let getThetempvsTime = await find_temp_vs_time.fillintoDB(non,name,low_point,high_point,min_height,regressionEquations,ref_Tof,min_distance);
            await fs.remove(name, err => {
              if (err) return console.error(err)
            //   console.log('success!')
            })
             console.log(getThetempvsTime);
             return;
         } catch (error) {
             console.log("Error :", error );
         }
        }
     });
     return res.redirect('/');
}
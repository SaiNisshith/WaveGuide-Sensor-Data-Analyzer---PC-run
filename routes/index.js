const express = require('express');
const router = express.Router();
const find_peaks = require('./../controllers/find_peaks');
const refresh_all_tof = require('./../controllers/refresh_all_tof');
const find_tof = require('./../controllers/find_tof');
const TimeVsTemp = require('../models/timevstemp');
const mongoose = require('../config/mongoose');
const find_temp_vs_time = require('./../controllers/find_temp_vs_time');
var watch = require('node-watch');
const fs = require('fs-extra');
const monitor = require('../controllers/getTempvsTime');
const global_variable = require('../models/variables');
const path = require('path');

console.log("Router is loaded");



router.get("/get_temp_data/:sensor",async (req,res)=>{
    try{
        let sensor = parseInt(req.params.sensor);
        let plot = await TimeVsTemp.find({});
        let x = [],y=[];
        for(let i=0; i<plot.length; i++){
            let time = new Date(plot[i].createdAt + (5*60*60*1000 + 30*60*1000));
            x.push(time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear() +" ; "+ time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
            y.push(parseFloat(plot[i].temperature[sensor-1]));
        }
        return res.status(200).send({
            x : x,
            y : y
        })
    }catch(error){
        return res.status(422).json({
            "error" : "Error occured while getting the temp vs time data"
        })
    }
})

router.get('/changeVariables',async function(req,res){
    let hi = parseFloat(req.query.high_point),
        lo = parseFloat(req.query.low_point),
        mi = parseFloat(req.query.min_height),
        non = parseInt(req.query.no_of_notches);
        md = parseFloat(req.query.min_distance);
    await global_variable.deleteMany({});
    await global_variable.create({
        high_point : hi,
        low_point : lo,
        min_height : mi,
        min_distance : md,
        no_of_notches : non
    })
    return res.redirect('back');
})

router.get('/refresh',async function(req,res){
    let glob = await global_variable.find({});
    // console.log(glob);
    let non = glob[0].no_of_notches,
        high_point = glob[0].high_point,
        low_point = glob[0].low_point,
        min_height = glob[0].min_height,
        min_distance = glob[0].min_distance;
    try {
        await refresh_all_tof.readTheExcelFiles(parseInt(non),path.resolve(req.query.path),parseFloat(low_point),parseFloat(high_point),parseFloat(min_height),parseFloat(min_distance));
        return res.redirect('/');
    } catch (error) {
        return res.status(422).json({
            err : `Error occured while refreshing the time of flight data ${error}`
        })
    }
})

router.get('/getTimevsTemp',monitor.Monitor);

router.use('/download',require('./download'));

router.get('/',async (req,res)=>{
    let go = await global_variable.find({});
    return res.render('main',{
        global_variable : go[0]
    });
})
module.exports = router;





module.exports = router;
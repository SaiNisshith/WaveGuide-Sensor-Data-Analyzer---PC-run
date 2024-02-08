const express = require('express');
const router = express.Router();
const find_peaks = require('./../controllers/find_peaks');
const refresh_all_tof = require('./../controllers/refresh_all_tof');
const find_tof = require('./../controllers/find_tof');
const regression = require('./../controllers/regression');

let non = parseInt(process.env.UWG_NUMBER_OF_NOTCHES),
    data_load = process.env.UWG_DATA_FEED_PATH,
    low_point = parseFloat(process.env.UWG_LOW_POINT),
    high_point = parseFloat(process.env.UWG_HIGH_POINT),
    min_height = parseFloat(process.env.UWG_MIN_HEIGHT);

console.log("Router is loaded");

router.get('/refresh',async (req,res)=>{
    
    try {
        let alltof = {};
        await refresh_all_tof.readTheExcelFiles(non,data_load,low_point,high_point,min_height).then(data=>{
            alltof = data;
        });
        return res.status(200).json({
            refreshed_tofs : alltof
        })
    } catch (error) {
        return res.status(422).json({
            err : "Error occured while refreshing the time of flight data"
        })
    }
})

router.get('/get_peaks',async (req,res)=>{
    console.log(req.query);
    try {
        let k = [];
        let no_of_nothches = req.query.no_of_nothches? parseFloat(req.query.no_of_nothches) : non,
            low_point = req.query.low_point ? parseFloat(req.query.low_point) : low_point,
            high_point = req.query.high_point ? parseFloat(req.query.high_point) : high_point,
            min_height = req.query.min_height ? parseFloat(req.query.min_height) : min_height;
        await find_peaks.findPeaks(no_of_nothches,req.query.filePath,low_point,high_point,min_height).then(data => {
            k = data;
        });
        return res.status(200).json({
            "peaks_data(µ sec)" : k
        })
    } catch (error) {
        return res.status(422).json({
            "error" : "Error occured while getting the peaks kindly check the algorithm or data"
        })
    }
    
})


router.get("/find_temp",async (req,res)=>{
    try {
        let tof = req.query.time_of_flight;
        let sensor = req.query.sensor ? req.query.sensor : 1;
        let getTvsTFuctions = await regression.ToT_Functions;
        return res.status(200).json({
            sensor : sensor,
            "temperature(°C)" : getTvsTFuctions.temp_Functions[sensor-1](tof)[1]
        })
    } catch (error) {
        return res.status(422).json({
            "error" : "Error occured while getting the temperature" 
        })
    }
    
})





module.exports = router;
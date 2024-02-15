const express = require('express');
const router = express.Router();
const writeXlsxFile = require('write-excel-file/node');
const fs = require('fs');
const Long_time_vs_temp = require('../models/long_time_vs_temp'); 
const path = require('path');

const schema = [
    {
      column: 'Sensor-1 Temperature',
      type: Date,
      format: 'dd/mm/yyyy hh:mm AM/PM',
      value: student => student.temperature[0]
    },
    {
        column: 'Name',
        type: String,
        value: student => student.name
    },
  ]

async function GenerateExcel(pat,from,to){
    try {

        let data= await Long_time_vs_temp.find({createdAt: {
            $gte: from,
            $lte: to
        }});
        // console.log(data);
        let schema = [{
            column: 'Time',
            type: String,
            value: row => {
                let k = new Date(row.createdAt);
                let options = {timeZone: 'Asia/Kolkata', timeZoneName: 'short'};
                let istDateString = k.toLocaleString('en-IN', options);
                return istDateString;
            }
          }]
        if(data.length > 0){
            for(let i=0; i<data[0].temperature.length; i++){
                schema.push({
                    column : `Sensor-${i+1} Temperature(°C)`,
                    type : Number,
                    value : row=> {return parseFloat(row.temperature[i])}
                })
            }
        }
       return await writeXlsxFile(data, {
            schema,
            filePath: pat
          })  
    } catch (error) {
        console.log(error);
        return error;
    }
}


  
router.get('/generate-excel',async (req, res) => {
    let pat = req.query.path;
    let from = req.query.from ,to=req.query.to;
    from = new Date(from);
    to  = new Date(to);
    await GenerateExcel(path.resolve(pat),from,to);
    return res.redirect('/');
})
module.exports = router;
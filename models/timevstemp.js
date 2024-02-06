const mongoose = require('mongoose');

const time_vs_temp_Schema = new mongoose.Schema({
    temperature : [{
        type: mongoose.Schema.Types.Decimal128
    }]
},{timestamps:true});

const TimeVsTemp = mongoose.model('Time_vs_Temperature',time_vs_temp_Schema);
module.exports = TimeVsTemp;
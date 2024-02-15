const mongoose = require('mongoose');

const variable = new mongoose.Schema({
    high_point : {
        type : mongoose.Schema.Types.Decimal128,
    },
    low_point : {
        type : mongoose.Schema.Types.Decimal128
    },
    min_height : {
        type : mongoose.Schema.Types.Decimal128,
    },
    min_distance : {
        type : mongoose.Schema.Types.Decimal128
    },
    no_of_notches : {
        type :Number
    }
});

const Variables = mongoose.model('Variables',variable);
module.exports = Variables;
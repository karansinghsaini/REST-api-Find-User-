const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating geo schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});


//creating schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is requied']
    },
    job: {
        type: String
    } ,
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
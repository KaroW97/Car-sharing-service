const Car = require('../database/model/Car')

exports.find = (query) => Car.find(query)

exports.createCar = (data) => Car.create(data)

exports.updateOne = ({ filter, update }) => Car.updateOne(filter, update)

exports.updateMany = ({ filter, update }) => Car.updateMany(filter, update)

exports.findOneAndDelete = ({ vin }) => Car.findOneAndDelete({ vin })
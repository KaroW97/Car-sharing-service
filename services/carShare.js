const carShare = require('../database/model/CurrentSharing')

exports.find = (query) => carShare.find(query)

exports.create = (data) => carShare.create(data)

exports.delete = (query) => carShare.deleteMany(query)

exports.create = (data) => new carShare(data)
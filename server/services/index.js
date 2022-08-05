const { checkFuelHandler } = require('./checkFuel')
const { notAuthHandler } = require('./notAuth')
const { addNewHandler } = require('./addNew')
const { addNewRunHandler } = require('./addNewCurrentRun')
const { changeStatusHandler } = require('./changeStatus')
const { updateLocationHandler } = require('./updateLocation')
const { deleteHandler } = require('./delete')

module.exports = {
  checkFuelHandler,
  notAuthHandler,
  addNewHandler,
  addNewRunHandler,
  changeStatusHandler,
  updateLocationHandler,
  deleteHandler
}

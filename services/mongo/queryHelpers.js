exports.createUpdateQuery = (filter) => {
  const query = { filter: {}, update: {} }

  if (filter.$or) query.filter = { $or: filter.$or }
  if (filter.$and) query.filter = { $and: filter.$and }
  if (filter.$set) query.update = { $set: filter.$set }
  if (filter.$push) query.update = { $push: filter.$push }

  return query
}

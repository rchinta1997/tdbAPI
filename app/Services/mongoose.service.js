class MongooseService {
  constructor(Model) {
    this.model = Model;
  }

  aggregate(pipeline) {
    return this.model.aggregate(pipeline).exec();
  }

  create(body) {
    return this.model.create(body);
  }

  count(query) {
    return this.model.count(query).exec();
  }

  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }

  findDistinct(query, field) {
    return this.model.find(query).distinct(field).exec();
  }

  findOne(query, projection = { __v: 0 }, options = { lean: true }) {
    return this.model
      .findOne(query, projection, options)
      .select({ __v: 0 })
      .exec();
  }

  find(
    query,
    sort = { id: 1 },
    projection = { __v: 0 },
    options = { lean: true }
  ) {
    return this.model
      .find(query, projection, options)
      .sort(sort)
      .select({ __v: 0 })
      .exec();
  }

  findPopulate(
    query,
    populateQuery,
    projection = { __v: 0 },
    sort = { id: 1 },
    options = { lean: true }
  ) {
    return this.model
      .find(query, projection, options)
      .populate(populateQuery)
      .sort(sort)
      .select({ __v: 0 })
      .exec();
  }

  findById(id, projection = { __v: 0 }, options = { lean: true }) {
    return this.model.findById(id, projection, options).exec();
  }

  update(id, body, options = { lean: true, new: true }) {
    return this.model.findByIdAndUpdate(id, body, options).exec();
  }
}

module.exports = MongooseService;

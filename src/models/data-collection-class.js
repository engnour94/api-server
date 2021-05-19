'use strict';
/**
 *  Creat DataManager class.
 */

class DataManager {//data access layer (DA)
  constructor(model) {//model from mongoose
    this.model = model;
  }
  /**
       * read is a property that read the obj
       * @type {number}
       * @returns {array of obj}
       */

  read(id) {
    if (id) {
      return this.model.find({ _id: id });
    } else {
      return this.model.find({});
    }
  }
  /**
       * create is a property that sets the obj
       * @type {number}
       * @type {obj}
       * @returns {obj}
       */
  create(obj) {
    const doc = new this.model(obj);
    return doc.save();
  }
  /**
       * delete  is a property that destroy the obj
       * @type {number}
       * @returns {obj}
       */
  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
  /**
       * update is a property that update the obj
       * @type {number}
       * @returns {obj}
       */

  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, { new: true });
  }
}

module.exports = DataManager;




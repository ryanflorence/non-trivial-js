// This object serves as the prototype for other models being saved to local
// storage.  It contains methods useful to objects down the inheritance chain.
define([
  'lib/vendor/jquery',
  'lib/util/object',
  'lib/views'
], function (jQuery, object, dust) {

  return {

    // Model methods

    createModel: function (name){
      var model = object.create(this);
      model.modelName = name;
      return model;
    },

    // Model instance properties/methods

    modelName: 'model',

    instances: {},

    gid: function () {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1) +
             (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },

    create: function () {
      var instance = object.create(this);
      instance.init.apply(instance, arguments);
      this.instances[instance.props.id] = instance;
      this.save();
      return instance;
    },

    getData: function () {
      var storage = localStorage.getItem(this.modelName);
      return storage ? JSON.parse(storage) : [];
    },

    save: function () {
      var data = [];
      for (var i in this.instances)
        data.push(this.instances[i].toJSON());
      localStorage.setItem(this.modelName, JSON.stringify(data));
    },

    initAll: function (){
      var data = this.getData();
      for (var i = 0, l = data.length; i < l; i++)
        this.fromJSON(data[i]);
    },

    find: function (id) {
      return this.instances[id];
    },

    destroy: function (id) {
      delete this.instances[id];
      this.save();
      return id;
    },

    // Model instance, instance methods

    init: function(params) {
      this.props = {};
      if (params) this.update(params);
      if (!this.props.id) this.props.id = this.gid();
      if (!this.props.created) this.props.created = +new Date();
      return this;
    },

    update: function (params) {
      for (var i in params)
        this.props[i] = params[i];
      this.save();
    },

    toJSON: function () {
      return JSON.stringify(this.props);
    },

    fromJSON: function (json) {
      return this.create(JSON.parse(json));
    },

    render: function (callback) {
      dust.render(this.modelName, this, callback);
    },

    toElement: function (callback) {
      this.render(function (err, html) {
        callback(jQuery(html));
      });
    }
  };
});

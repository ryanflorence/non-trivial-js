/*jshint sub: true */
require(['lib/model/model'], function (model){

  module('model', {
    setup: function () {
      this.model = model.createModel('test');
      this.instance = this.model.create({
        id: 'foo',
        name: 'bar'
      });
    }
  });

  test('creation', function () {
    equal(this.model.modelName, 'test', 'set the model name');
    equal(this.model['__proto__'], model, 'set the model prototype');
    equal(this.instance['__proto__'], this.model, 'set the instance prototype');

    var sameModel = model.createModel('test');
    sameModel.initAll();

    ok(sameModel.instances['foo'], 'test instance initialized');
  });

  test('methods', function () {
    var foo = this.model.find('foo');
    equal(foo.props.id, 'foo', 'found instance');

    this.instance.update({
      name: 'baz'
    });
    equal(this.instance.props.name, 'baz', 'updated');

    var sameModel = model.createModel('test');
    sameModel.initAll();
    foo = sameModel.find('foo');
    equal(foo.props.name, 'baz', 'Data persists after update');

    this.model.destroy('foo');
    equal(this.model.find('foo'), undefined, 'deleted instance');
  });

});

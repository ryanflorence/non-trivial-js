require(['lib/util/object'], function (object) {

  module('object');
  test('object.create', function () {
    var a = { foo: 'bar' };
    var b = object.create(a);
    strictEqual(a.foo, b.foo, 'set prototype');
  });

  test('object.extend', function () {
    var a = {};
    object.extend(a, {
      foo: 'bar'
    });
    equal(a.foo, 'bar', 'injected a property');
  });

});
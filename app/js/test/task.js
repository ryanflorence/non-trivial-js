require([
  'lib/task'
], function (task) {
  module('task');
  asyncTest('task', 2, function () {
    equal(task.modelName, 'task', 'task.modelName is set');

    var instance = task.create({
      id: 'foo',
      name: 'bar'
    });

    instance.toElement(function (element) {
      equal(element.attr('id'), 'task-foo', 'template rendered');
      start();
    });
  });

});

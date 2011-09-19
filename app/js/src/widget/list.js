// Require publisher and the task widget prototype.
define([
  'lib/vendor/publisher',
  'lib/util/object',
  'lib/widget/list'
], function (publisher, object, list){

  publisher.advise(list).after({
    handleEvent: 'list/click',
    handleButton: 'list/delete'
  });

  object.extend(list, {
    ':init': list.init,

    ':task/create': function (task, newTask) {
      newTask.toElement(function (element) {
        list.addItem(element);
      });
    },

    ':task/initAll': function () {
      this.animate = true;
    },

    ':task/destroy': function (task, id) {
      this.removeItem(id);
    }
  });

  publisher.subscriber(list);

  return list;

});

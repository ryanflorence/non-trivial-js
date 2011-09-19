// This file should do nothing more than describe how `task` interacts with the
// application.  As you can see, there is little to no logic here.  All the
// logic is in the modules and their methods in `lib`.  If your subscriptions
// are doing more than simply calling methods on your modules, that indicates
// your module needs a new method, or you need a new module to handle the logic.

// ## Define the module with dependencies

// Require publisher and the task model prototype.
define([
  'lib/vendor/publisher',
  'lib/task',
  'lib/util/object'
], function (publisher, task, object){

  // ## Publishing application events
  //
  // First we tell `task` which of its methods should be published to the
  // application so other modules can subscribe.

  // Here we "advise" `task` to publish whenever its `create`, `initAll`, and
  // `destroy` methods are called.  Publisher will publish to the
  // corresponding channel, sending along the task object, the return value
  // and the arguments sent to the operation.  More on that later.
  publisher.advise(task).after({
    // whenever `create` is called, publish to `task/create`
    'create': 'task/create',
    'initAll': 'task/initAll',
    'destroy': 'task/destroy'
  });

  // ## Responding to application events with subscribe
  //
  // Next we describe how `task` responds to the other modules by creating
  // subscriptions to published channels.

  // We extend task with subscription methods. If an object's methods match a
  // pattern, then publisher will subscribe that method to the matching
  // channel.  The default pattern is '^:', used here.
  object.extend(task, {
    ':init': task.initAll,

    ':list/click': function (list, checkbox) {
      // The first argument is the advised object: `list`.  The second is the
      // return value of the method call being published: `checkbox`.  Make 
      // sure to return stuff to make this pattern more powerful.  The final 
      // arguments are the params sent to the method (not used here).
      var id = checkbox.attr('name');
      task.find(id).update({
        checked: checkbox.prop('checked') ? 'checked' : ''
      });
    },

    ':confirm/hide': function (confirm, confirmed) {
      if (confirmed) task.destroy(confirm.locals.id);
    },

    ':form/submit': function (form, data) {
      task.create({
        name: data[0].value
      }).save();
    }
  });

  // Then we simply tell publisher that task is a subscriber. To subscribe
  // to a new channel we simply create a new method.  If we wanted a different
  // pattern, we'd supply it as the second argument to this method.
  publisher.subscriber(task);

  // Finally we return the module so other modules can require it.
  return task;

});

define(['lib/model/model'], function (model) {
  // We don't need to in this app, but if we wanted to add some new methods to 
  // `task` beyond what's inherited from `model`, we'd do it here.
  return model.createModel('task');
});

require([
  'lib/vendor/publisher',
  'src/widget/list',
  'src/widget/form',
  'src/widget/input',
  'src/task',
  'src/widget/confirm'
], function (publisher) {
  require.ready(function () {
    publisher.publish('init');
  });
});

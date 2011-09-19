define([
  'lib/vendor/publisher',
  'lib/widget/confirm'
], function (publisher, confirm){

  publisher.advise(confirm).after('hide', 'confirm/hide');

  // map ':init' to init so the subscriber method will match it
  confirm[':init'] = confirm.init;

  confirm[':list/delete'] = function (list, button) {
    var position = button.position();
    this.show({
      label: button.data('label'),
      id: button.data('id')
    }, {
      top: position.top + 20
    });
  };

  publisher.subscriber(confirm);

  return confirm;

});

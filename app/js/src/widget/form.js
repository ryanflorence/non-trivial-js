define([
  'lib/vendor/publisher',
  'lib/widget/form'
], function (publisher, form){

  publisher.advise(form).after('handleEvent', 'form/submit');

  publisher.subscribe('init', form);

  return form;

});

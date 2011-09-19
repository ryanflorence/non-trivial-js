define([
  'lib/vendor/publisher',
  'lib/widget/input'
], function (publisher, input){

  // just need to map a few existing methods to a channel
  input[':form/submit'] = input.clear;
  input[':init'] = input.init;

  publisher.subscriber(input);

  return input;

});

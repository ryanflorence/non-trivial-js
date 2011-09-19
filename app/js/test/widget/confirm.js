require(['src/widget/confirm'], function (confirm) {
  module('confirm');
  asyncTest('confirm', 5, function () {

    confirm.init(function () {
      var locals = { label: 'test' },
          css = { width: '200px' };

      ok(
        confirm.wrapper.hasClass('confirmWrapper'),
        'rendered and has confirmWrapper class'
      );

      confirm.show(locals, css, function () {
        var text = confirm.wrapper.find('.confirmLabel').text();

        ok(confirm.wrapper.is(':visible'), 'wrapper is shown');        
        equal(text, 'test', 'set the label text');
        equal(confirm.wrapper.css('width'), '200px', 'set the css');

        confirm.hide();
        ok(confirm.wrapper.is(':hidden'), 'wrapper is hidden');
        start();
      });
    });
  });
});
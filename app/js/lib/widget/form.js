define(['lib/vendor/jquery'], function (jQuery) {
  return {
    init: function (selector) {
      this.element = jQuery(selector || '#form');
      this.attach();
    },

    attach: function(type) {
      this.element.bind('submit', jQuery.proxy(this, 'handleEvent'));
    },

    handleEvent: function (event) {
      event.preventDefault();
      return this.element.serializeArray();
    }
  };
});

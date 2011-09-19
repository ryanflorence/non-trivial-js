define(['lib/vendor/jquery'], function (jQuery) {
  return {
    init: function () {
      this.element = jQuery('#input');
    },

    clear: function(){
      this.element.val('').focus();
    }
  };
});

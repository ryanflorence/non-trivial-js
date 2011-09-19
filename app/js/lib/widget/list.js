define(['lib/vendor/jquery'], function (jQuery, task) {
  return {
    animate: false,

    items: {},

    init: function () {
      this.element = jQuery('#list');
      this.attach();
    },

    attach: function(){
      this.element.delegate('input', 'click', jQuery.proxy(this, 'handleEvent'))
                  .delegate('button', 'click', jQuery.proxy(this, 'handleButton'));
    },

    handleEvent: function (event) {
      var target = jQuery(event.currentTarget);
      return target;
    },

    handleButton: function (event) {
      var target = jQuery(event.currentTarget);
      return target;
    },

    addItem: function (element) {
      if (this.animate) element.hide();
      this.element.prepend(element);
      if (this.animate) element.show(250);
    },

    removeItem: function(id){
      var element = this.element.find('#task-' + id).hide(250, function (){
        element.detach();
      });
    }
  };
});

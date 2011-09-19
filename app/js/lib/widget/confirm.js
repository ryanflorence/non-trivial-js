define([
  'lib/vendor/jquery',
  'lib/views'
], function (jQuery, dust) {

  return {
    locals: {},

    css: {top: 100, right: 100},

    init: function (callback) {
      this.render('confirmWrapper', jQuery.proxy(function () {
        this.initCallback.apply(this, arguments);
        if (callback) callback.apply(this, arguments);
      }, this));
    },

    render: function (template, callback) {
      dust.render(template, this.locals, callback);
    },

    initCallback: function (err, html) {
      if (err) throw new Error(err);
      this.wrapper = jQuery(html).hide().appendTo(jQuery(document.body));
      this.wrapper.delegate('.cancel', 'click', jQuery.proxy(this, 'cancel'));
      this.wrapper.delegate('.confirm', 'click', jQuery.proxy(this, 'confirm'));
      this.contentWrapper = this.wrapper.find('.confirmContent');
    },

    show: function(locals, css, callback) {
      jQuery.extend(this.locals, locals);
      if (!css) css = this.css;
      this.wrapper.css(css);
      this.render('confirmContent', jQuery.proxy(function (err, html){
        this.showCallback(err, html);
        if (callback) callback.apply(this, arguments);
      }, this));
    },

    showCallback: function(err, html) {
      if (err) throw new Error(err);
      this.contentWrapper.html(html);
      this.wrapper.fadeIn(250);
    },

    hide: function (confirmed) {
      this.wrapper.hide();
      return confirmed;
    },

    cancel: function (event) {
      this.hide(false);
      return event;
    },

    confirm: function (event) {
      this.hide(true);
      return event;
    }
  };

});

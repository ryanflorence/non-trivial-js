define({
  // Simplified prototypal inheritance, see 
  // http://javascript.crockford.com/prototypal.html
  create: function (obj){
    function F() {}
    F.prototype = obj;
    return new F();
  },

  extend: function (){
    var target = arguments[0];

    for (var key, i = 1, l = arguments.length; i < l; i++)
      for (key in arguments[i])
        target[key] = arguments[i][key];

    return target;
  }
});

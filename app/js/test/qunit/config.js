qunitTap(QUnit, function() {
  console.log.apply(console, arguments);
});

// timer for PhantomJS, prints final results multiple times, prematurely w/o it :\
var timer;
QUnit.done = function( results ) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    console.log('');
    console.log('total ' + results.passed + '/' + results.total);
    console.log(results.passed == results.total ? 'ok' : 'not ok');
  }, 100);
};

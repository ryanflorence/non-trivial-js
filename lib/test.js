var page = new WebPage();

var timer;
page.onConsoleMessage = function (msg) {
  console.log(msg);
  clearTimeout(timer);
  // exit after 1 second of no messages
  timer = setTimeout(function () {
    phantom.exit();
  }, 1000);
};

page.open('app/test.html', function (status) {
//  page.evaluate(function () {
//    console.log(document.getElementsByTagName('title')[0].text);
//  });
});
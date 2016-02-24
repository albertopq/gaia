'use strict';

var Server = require('../../../../shared/test/integration/server');

marionette('Test PreviewWindow', function() {

  var opts = {
    apps: {},
    hostOptions: {
      screen: {
        width: 1920,
        height: 1080
      }
    }
  };

  var client = marionette.client({
    profile: opts,
    // XXX: Set this to true once Accessibility is implemented in TV
    desiredCapabilities: { raisesAccessibilityExceptions: false }
  });
  var testOptions = { devices: ['tv'] };
  var system, server, browser, browserFrame;

  suiteSetup(function(done) {
    Server.create(__dirname + '/fixtures/', function(err, _server) {
      server = _server;
      done();
    });
  });

  suiteTeardown(function() {
    server.stop();
  });

  setup(function() {
    system = client.loader.getAppClass('system');
    system.waitForStartup();
    system.waitForFullyLoaded();
    browser = client.loader.getAppClass('browser', 'browser', 'tv_apps');
    client.switchToFrame();
    browserFrame = browser.launch();
  });

  // MozTrap #17945
  test('it displays install dialog after 3 accesses', testOptions, function() {
    var url = server.url('sample.html');
    var features = {
      preview: true,
      name: 'TestApp',
      iconUrl: 'iconUrl'
    };
    for (var i = 0; i < 3; i++) {
      system.openWindow(url, features);
      system.pressBack();
    }
    client.waitFor(function() {
      return false;
    });
  });
});

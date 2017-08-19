const Controller = require('./lib/index.js');
const johnnyFiveAdapter = require('./lib/adapters/johnny-five.js');
const SuperCarController = new Controller();

SuperCarController.setAdapter(johnnyFiveAdapter);
SuperCarController.forward(100);

const Controller = require('./lib/index.js');
const johnnyFiveAdapter = require('./lib/adapters/johnny-five.js');
const SuperCarController = new Controller();

SuperCarController.setAdapter(johnnyFiveAdapter, { repl: false });
SuperCarController.adapterReady().then(() => {
    SuperCarController.setAdapterConfiguration({
        forward: {
            pin: 10,
            type: 'Relay'
        }
    });
    SuperCarController.forward(100);
    setTimeout(() => {
        SuperCarController.forward(0);
        process.exit(0);
    }, 10000);
}, () => {
    console.log('Adapter bailed');
    process.exit(1);
});

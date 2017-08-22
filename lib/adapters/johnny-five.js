const five = require('johnny-five');

let board, pinConfiguration = {};

function checkConfiguration(control) {
    if(!pinConfiguration) {
        throw new Error('No pin configuration found');
    }
    if(!pinConfiguration[control]) {
        throw new Error('No pin configured for ' + control);
    }
    if(!pinConfiguration[control].component) {
        throw new Error('No component found from pin configuration for ' + control);
    }
    return true;
}

module.exports = {
    // Passthrough for Board options and configuration the pins
    init: (options) => {
        return board = five.Board(options);
    },
    configure: (configuration) => {
        Object.keys(configuration).forEach((item) => {
            const itemConfiguration = configuration[item];
            pinConfiguration[item] = Object.assign({}, itemConfiguration, {
                component: new five[itemConfiguration.type](itemConfiguration.pin)
            });
        });
        console.log(pinConfiguration);
    },
    //
    ready: () => {
        return new Promise((resolve) => {
            board.on('ready', resolve);
        });
    },

    turn: (degrees) => {
        // Set servo to certain degree (http://johnny-five.io/examples/servo/)
        pinConfiguration.turn.component.to(degrees);
    },
    forward: (speed) => {
        if(checkConfiguration('forward')) {
            console.log('Going forward with speed', speed);
            if(speed > 0) {
                return pinConfiguration.forward.component.on();
            }
            return pinConfiguration.forward.component.off();
        }
    }
}

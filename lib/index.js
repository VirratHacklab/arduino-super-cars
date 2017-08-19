class Controller {
    setAdapter(adapter) {
        if(!adapter) {
            throw new Error('Invalid adapter');
        }
        this.adapter = adapter;
    }

    runControl(adapter, method, args) {
        if(!this.adapter) {
            throw new Error('Adapter not defined');
        }
        if(typeof this.adapter[method] !== 'function') {
            throw new Error('No function named ' + method + ' defined in the adapter');
        }

        return this.adapter[method](...args);
    }

    forward(speed) {
        return this.runControl(this.adapter, 'forward', [speed]);
    }
}

module.exports = Controller;

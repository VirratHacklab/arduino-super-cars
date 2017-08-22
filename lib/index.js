class Controller {
    setAdapter(adapter, options) {
        if(!adapter) {
            throw new Error('Invalid adapter');
        }
        this.adapter = adapter;
        if(typeof this.adapter.init === 'function') {
            this.adapter.init(options);
        }
    }

    setAdapterConfiguration(configuration) {
        if(!this.adapter) {
            throw new Error('No adapter defined');
        }
        if(typeof this.adapter.configure !== 'function') {
            throw new Error('No configure method found from adapter');
        }
        return this.adapter.configure(configuration);
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

    adapterReady() {
        if(!this.adapter) {
            throw new Error('Adapter not defined');
        }
        if(typeof this.adapter.ready !== 'function') {
            throw new Error('No function named ready defined in the adapter');
        }
        return this.adapter.ready();
    }

    forward(speed) {
        return this.runControl(this.adapter, 'forward', [speed]);
    }
}

module.exports = Controller;

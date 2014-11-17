(function (factory) {
    if (typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        signature = factory();
    }

})(function () {
    function Signature(args) {
        if (args.length == 0) {
            throw new Error('Signature without handler');
        }

        this.types = [];
        for (var i = 0; i < args.length - 1; i++) {
            this.types.push(args[i]);
        }
        this.handler = args[args.length - 1];
        if (this.handler.length != args.length - 1) {
            throw new Error('Overload with ' + (args.length - 1) + ' parameter(s), but handler has ' + this.handler.length + ' parameter(s).')
        }
    }

    Signature.prototype.match = function (args) {
        if (this.types.length != args.length) {
            return false;
        }

        for (var i = 0; i < this.types.length; i++) {
            var type = this.types[i];
            if (type === null || type === undefined) {
                if(args[i] !== type) {
                    return false;
                }
            }else if (!(new Object(args[i]) instanceof type)) { //wrap
                return false;
            }
        }
        return true;
    };

    Signature.prototype.call = function (context, args) {
        return this.handler.apply(context, args);
    };

    function argTypes(args) {
        var types = [];
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === 'undefined' || args[i] === null) {
                types.push(args[i] + '');
            } else {
                types.push(args[i].constructor.name)
            }
        }
        return types;
    }


    function signature(def) {
        var signatures = [];

        var result = function () {
            for (var i = 0; i < signatures.length; i++) {
                if (signatures[i].match(arguments)) {
                    return signatures[i].call(this, arguments);
                }
            }
            if (!def) {
                throw new Error('No signature match for (' + argTypes(arguments).join(', ') + ')');
            }
            def.apply(this, arguments);
        };
        result.overload = function () {
            signatures.push(new Signature(arguments));
        };
        return result;
    };


    return signature;

});
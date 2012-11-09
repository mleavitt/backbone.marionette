// Component
// ---------

Marionette.Component = (function(Backbone, Marionette, $, _){
  "use strict";

  // Initializers
  // ------------

  var Initializers = function(){
    this._initializerCallbacks = new Marionette.Callbacks();
    this._finalizerCallbacks = new Marionette.Callbacks();
  };

  _.extend(Initializers.prototype, {
    addInitializer: function(cb){
      this._initializerCallbacks.add(cb);
    },

    addFinalizer: function(cb){
      this._finalizerCallbacks.add(cb);
    },

    runInitializers: function(options, context){
      this._initializerCallbacks.run(options, context);
    },

    runFinalizers: function(context){
      this._finalizerCallbacks.run(null, context);
    },

    resetInitializers: function(){
      this._initializerCallbacks.reset();
    },

    resetFinalizers: function(){
      this._finalizerCallbacks.reset();
    }
  });

  // Component
  // ---------

  var Component = function(initializers){
    this.initializers = initializers;
  };

  _.extend(Component.prototype, {
    start: function(options){
      if (this._started){ return; }

      this._started = true;
      this.initializers.runInitializers(options, this);
      this.initializers.resetInitializers();
    },

    stop: function(){
      if (!this._started){ return; }

      this._started = false;
      this.initializers.runFinalizers(this);
      this.initializers.resetFinalizers(this);
    }
  });


  // Builder
  return function(definition){
    var initializers = new Initializers();

    definition(initializers, Backbone, Marionette, $, _);

    return function(options){
      return new Component(initializers, options);
    };
  };

})(Backbone, Marionette, $, _);

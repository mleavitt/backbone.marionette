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

  var Component = function(initializers, options){
    this.initializers = initializers;
    this.options = options;
  };

  _.extend(Component.prototype, {
    start: function(options){
      if (this._started){ return; }

      // merge the options from start and constructor together
      options = _.extend({}, this.options, options);

      // prevent multiple starts
      this._started = true;

      // run the initializers to start the component instance
      this.initializers.runInitializers(options, this);
      this.initializers.resetInitializers();

      // augment the component w/ the controller methods
      var controller = this._controller;
      if (controller){
        for(var name in controller){
          if (_.isFunction(controller[name])){
            if (name[0] !== "_"){
              this[name] = _.bind(controller[name], controller);
            }
          }
        }
      }

    },

    stop: function(){
      if (!this._started){ return; }

      // allow this component to be started again
      this._started = false;

      // run the finalizers to stop the component instance
      this.initializers.runFinalizers(this);
      this.initializers.resetFinalizers(this);
    },

    setController: function(controller){
      this._controller = controller;
    }
  });

  // Builder
  return function(definition){
    var initializers = new Initializers();

    definition(initializers, Backbone, Marionette, $, _);

    // Return a constructor function to build a new
    // component instance
    return function(options){
      var component = new Component(initializers, options);
      return component;
    };
  };

})(Backbone, Marionette, $, _);

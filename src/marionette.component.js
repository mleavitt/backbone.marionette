// Component
// ---------

Marionette.Component = (function(Backbone, Marionette, $, _){
  "use strict";

  // Initializers & Finalizers
  // -------------------------

  var Finiters = function(){
    this._initializerCallbacks = new Marionette.Callbacks();
    this._finalizerCallbacks = new Marionette.Callbacks();
  };

  _.extend(Finiters.prototype, {
    addInitializer: function(cb){
      this._initializerCallbacks.add(cb);
    },

    addFinalizer: function(cb){
      this._finalizerCallbacks.add(cb);
    }
  });

  // Component Controller
  // --------------------

  var Component = function(){
  };

  _.extend(Component.prototype, {

  });

  // Builder
  return function(definition){
    var finiters = new Finiters();
    Component.addInitializer = _.bind(finiters.addInitializer, finiters);
    Component.addFinalizer = _.bind(finiters.addFinalizer, finiters);

    definition(finiters, Backbone, Marionette, $, _);

    return function(options){
      
    }
  }

})(Backbone, Marionette, $, _);

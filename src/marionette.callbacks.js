// Callbacks
// ---------

// NOTE: Marionette v1.0.0-rc5 is no longer compatible with jQuery < 1.5.0
// To know if we need to shim the incompatibilities we test the version
// @author micheall <micheal.leavitt@popagency.com>
Marionette.compatMode = function() {
  var $version = $().jquery.split('.');
  return $version[0] < 2 && $version[1] < 5; 
};

// A simple way of managing a collection of callbacks
// and executing them at a later point in time, using jQuery's
// `Deferred` object.
Marionette.Callbacks = function(){
  // NOTE: modified for jQuery < 1.5.0 compatibility
  // @author micheall <micheal.leavitt@popagency.com>
  if(Marionette.compatMode) {
    var msg = "$.Deffered not supported by jQuery " + $().jquery + ". Callbacks will not be executed.";
    if(!_.isUndefined(window.console)) {
      window.console.warn(msg);
    }
    return msg;
  }
  this._deferred = $.Deferred();
  this._callbacks = [];
};

_.extend(Marionette.Callbacks.prototype, {

  // Add a callback to be executed. Callbacks added here are
  // guaranteed to execute, even if they are added after the 
  // `run` method is called.
  add: function(callback, contextOverride){
    // NOTE: modified for jQuery < 1.5.0 compatibility
    // @author micheall <micheal.leavitt@popagency.com>
    if( Marionette.compatMode ) {
      var msg = "$.Deffered not supported by jQuery " + $().jquery + ". Callback will not be added.";
      if(!_.isUndefined(window.console)) {
        window.console.warn(msg);
      }
      return msg;
    } 
    this._callbacks.push({cb: callback, ctx: contextOverride});

    this._deferred.done(function(context, options){
      if (contextOverride){ context = contextOverride; }
      callback.call(context, options);
    });
  },

  // Run all registered callbacks with the context specified. 
  // Additional callbacks can be added after this has been run 
  // and they will still be executed.
  run: function(options, context){
    // NOTE: modified for jQuery < 1.5.0 compatibility
    // @author micheall <micheal.leavitt@popagency.com>
    if(Marionette.compatMode) { 
      var msg = "$.Deffered not supported by jQuery " + $().jquery + ". Callbacks will not run.";
      if(!_.isUndefined(window.console)) {
        window.console.warn(msg);
      }
      return msg;
    }
    this._deferred.resolve(context, options);
  },

  // Resets the list of callbacks to be run, allowing the same list
  // to be run multiple times - whenever the `run` method is called.
  reset: function(){
    // NOTE: modified for jQuery < 1.5.0 compatibility
    // @author micheall <micheal.leavitt@popagency.com>
    if(Marionette.compatMode) {
      var msg = "$.Deffered not supported by jQuery " + $().jquery + ". Callbacks will not be reset.";
      if(!_.isUndefined(window.console)) {
        window.console.warn(msg);
      }
      return msg;
    }
    var that = this;
    var callbacks = this._callbacks;
    this._deferred = $.Deferred();
    this._callbacks = [];
    _.each(callbacks, function(cb){
      that.add(cb.cb, cb.ctx);
    });
  }
});


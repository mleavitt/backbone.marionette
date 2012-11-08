describe("component", function(){

  describe("when defining a component with a function", function(){
    var MyComponent, IN, BB, MM, JQ, UN;

    beforeEach(function(){

      MyComponent = Marionette.Component(function(Initers, Backbone, Marionette, $, _){
        IN = Initers;
        BB = Backbone;
        MM = Marionette;
        JQ = $;
        UN = _;
      });

    });

    it("should return a constructor function to create a new component instance", function(){
      expect(_.isFunction(MyComponent)).toBe(true);
    });

    it("should pass the initializers through the constructor", function(){
      expect(IN).not.toBeUndefined();
    });

    it("should pass backbone through the constructor", function(){
      expect(BB).toBe(Backbone);
    });

    it("should pass Marionette through the constructor", function(){
      expect(MM).toBe(Marionette);
    });

    it("should pass $ through the constructor", function(){
      expect(JQ).toBe($);
    });

    it("should pass _ through the constructor", function(){
      expect(UN).toBe(_);
    });

  });

  describe("when starting a new component instance", function(){

    var MyComponent, initializer;

    beforeEach(function(){
      initializer = jasmine.createSpy("initializer");

      MyComponent = Marionette.Component(function(comp){
        comp.addInitializer(initializer);
      });

      var myComp = new MyComponent();
      myComp.start();
    });

    it("should run initializers", function(){
      expect(initializer).toHaveBeenCalled();
    });
  });

});

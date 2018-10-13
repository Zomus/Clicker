

(function() {
//ENCLOSURE (functions cannot be accessed outside of this class)

  function LoaderProxy() {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null
    };
  }

  //Class Definition (Private)
  function Sprite(image, width, height) {
    width = width || image.width;
    height = height || image.height;


    return {

      //Class Properties
      width: width,
      height: height,

      setScale: function(scale){
        width = image.width * scale;
        height = image.height * scale;
      },

      //Class Functions
      draw: function(canvas, x, y) {
        canvas.drawImage(
          image,
          x,
          y,
          width,
          height
        );
      },

      fill: function(canvas, x, y, width, height, repeat) {
        repeat = repeat || "repeat";
        var pattern = canvas.createPattern(image, repeat);
        canvas.fillColor(pattern);
        canvas.fillRect(x, y, width, height);
      }

    };
  };

  Sprite.load = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();

    img.onload = function() {
      var tile = Sprite(this);

      $.extend(proxy, tile);
      //overwrite defined properties of 'tile' into proxy, which default contains all null properties

      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };

    img.src = url;

    return proxy;
  };

  var spriteImagePath = "resources/";

  //GLOBAL FUNCTIONS - The following functions can be called from anywhere, as they are assigned as a function of "window"
  window.Sprite = function(name, callback) {
    return Sprite.load(spriteImagePath + name + ".png", callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;


//ENCLOSURE
}());

var generateCanvas = function (canvasEl) {
  var ctx = canvas.getContext('2d');

  canvas.width = canvas.parentNode.offsetWidth;
  canvas.height = canvas.parentNode.offsetHeight;

  var layers = [];
  var vortexColor = 0;
  var initCount = 0;
  var layerCount = 200;
  var frameCount = 0;
  var mouseCoords = { x: 0, y: 0 };

  for (x in ctx) {
    ctx[x[0] + x[1] + (x[6] || "")] = ctx[x];
  }

  function vary(x, y) {
    x = x || -2;
    y = y || 2;
    return Math.random() * (y - x) + x;
  }

  function frame() {
    requestAnimationFrame(frame);

    ctx.globalCompositeOperation = "source-over";
    ctx.sa();
    ctx.globalAlpha = .1;
    ctx.tra(canvas.width / 2, canvas.height / 2);
    ctx.sc(1.009, 1.009);
    ctx.ro(.007);
    ctx.tra(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(a, 0, 0);
    ctx.ree();
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height, vary(), vary(), canvas.width + vary(), canvas.height + vary());
    ctx.globalCompositeOperation = "xr";
    ctx.fillStyle = "rgba(0,0,0,.01)";
    ctx.fic(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.bea();

    for (i = 0; i < layerCount; i++) {
      var layer = layers[i];

      layer.x += .2 * (layer.coords.x - layer.x);
      layer.y += .2 * (layer.coords.y - layer.y);

      if (i) ctx.li(layer.x + vary(-5, 5), layer.y + vary(-5, 5));

      if (0 == frameCount % 2) {
        ctx.strokeRect(vary(0, canvas.width), vary(0, canvas.height), .6, .6);
      }

      ctx.strokeStyle = "hsla(" + vary(vortexColor, vortexColor + 60) + ", " +
        vary(60, 90) + "%," +
        vary(10, 70) + "%," +
        vary(.3, .5) + ")";
    }
    ctx.st();

    frameCount++;
  }

  for (var _i = layerCount; _i--;) {
    layers[_i] = {
      coords: _i == layerCount - 1 ? mouseCoords : layers[_i + 1]
    };
  }

  function init() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fic(0, 0, canvas.width, canvas.height);
    vortexColor = 90 * vary();

    for (var i = 0; i < layerCount; i++) {
      var layer = layers[i];
      var colorRange = 0 == initCount % 2 ? vary(40, 99) : vary(100, 150);

      layer.x = canvas.width / 2 + Math.cos(i / layerCount * Math.PI * colorRange) * i * 20;
      layer.y = canvas.height / 2 + Math.sin(i / layerCount * Math.PI * colorRange) * i * 20;
    }

    initCount++;
  }

  document.body.addEventListener('mousemove', function (e) {
    mouseCoords.x = e.pageX;
    mouseCoords.y = e.pageY;
  });

  document.body.addEventListener('click', init);
  init();
  frame();
}

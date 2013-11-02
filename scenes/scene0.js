var scene0 = function () {

  var sceneOptions = {
    "animation": animation,
    "id": "scene0",
    "title": "Start",
    "width": 1024,
    "height": 768
  };

  var scene = new Scene(sceneOptions);

  scene.scrollingPerspective(5, 1);

  var bg_hinten = scene.createActor('szene0/bg0.jpg', 0, 0, 1024, 768).isInLayer(0);

  var gesicht = scene.createActor('bilder/mann.png', 100, 100).isInLayer(0);
  
  return scene;
};

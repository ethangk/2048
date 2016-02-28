// Wait till the browser is ready to render the game (avoids glitches)
var g;
window.requestAnimationFrame(function () {
  g = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

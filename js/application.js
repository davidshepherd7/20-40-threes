/*jshint browser: true */

// Included classes:
/* global KeyboardInputManager */
/* global HTMLActuator */
/* global LocalStorageManager */
/* global GameManager */


"use strict";

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, 4, KeyboardInputManager, HTMLActuator,
                  LocalStorageManager);
});

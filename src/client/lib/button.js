var utils = require( './socket_utils.js' );

/**
 * Adds button-specific methods to pin object. Called via special.
 * Always overwrites direction.
 *
 * @param  {Object} pin
 * @return {Object} mutated pin
 */
function button( pin ) {

  pin.direction = 'input';

  utils.dispatch( utils.pinInit( pin.pin, pin.mode, pin.direction ) );
  utils.constructFuncs( pin );

  /**
   *
   * @param {function} cb
   */
  pin.pressed = function( cb ) {
    function pinPress() {
      this.buttonPressedcb = cb;
    }

    utils.dispatch( pinPress.bind( this ) );
  };

  /**
   *
   * @param {function} cb
   */
  pin.released = function( cb ) {
    function pinRelease() {
      this.buttonReleasedcb = cb;
    }

    utils.dispatch( pinRelease.bind( this ) );
  };

  /**
   *
   * @param {function}cb
   * @param {number} threshold
   */
  pin.held = function( cb, threshold ) {

    function pinHeld() {
      this.buttonHeldcb = function() {
        return setTimeout( cb, threshold );
      };
    }

    utils.dispatch( pinHeld.bind( this ) );

  };

  return pin;
}

module.exports = button;


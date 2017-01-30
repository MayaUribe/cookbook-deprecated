import { StyleSheet, Platform } from 'react-native';


////////////////////////////////////////////////////////////


/**
 * Returns object created from platform keys-values
 * @param  {Object} objValue Platform object
 * @return {Object} clean object.
 */
function generatePlatformObject(objValue) {
  //TODO: Add recursion
  let objPlatform = {};
  Object.keys(objValue).forEach((strName) => {
    let { ios, android, ...styles } = { ...objValue[strName] };

    if (ios && isIOS()) {
      styles = { ...styles, ...ios };
    }

    if (android && isAndroid()) {
      styles = { ...styles, ...android };
    }

    objPlatform[strName] = styles;
  });

  let { ios, android, ...styles } = { ...objPlatform };
    if (ios && isIOS()) {
      objPlatform = { ...styles, ...ios };
    }

    if (android && isAndroid()) {
      objPlatform = { ...styles, ...android };
    }

  return objPlatform;
}


/**
 * This function create the stylesheet
 * @param  {Object} objStyles Styles object
 * @return {Object}           Styles object
 */
function stylesheet(objStyles) {
  return StyleSheet.create(generatePlatformObject(objStyles));
}

module.exports = stylesheet;

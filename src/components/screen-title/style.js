'use strict';

import StyleSheet from '../../shared/stylesheet';

module.exports = StyleSheet({
  toolbarScreen: {
    backgroundColor: '#009999',
    paddingTop: 30,
    paddingBottom: 20,
    height: 75,
    flexDirection: 'row'
  },
  toolbarTitleContainer: {
    flex: 1,
    height: 30,
    justifyContent: 'center'
  },
  screenTitle: {
    fontFamily: 'Open Sans',
    color: '#e2e7eb',
    fontSize: 15,
    alignSelf: 'center',
    marginRight: 30
  },
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
});

import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
const MapScreen = ({route}) => {
  const {location} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: `https://map-viewer.situm.com/?apikey=3e911be4a6bb894dcf6982d84cc5d0bd9f45a8039a82e0a1f90ef2f3a53eac72&domain=&lng=en-US&buildingid=15901&floorid=51375&navigation_to=${location}&poiid=579499&navigation_from=579503`,
        }}
        onLoadEnd={() => console.log('first')}
        style={{flex: 1}}
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grant"
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
};

export default MapScreen;

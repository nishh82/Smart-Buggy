import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const MapLocation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://map-viewer.situm.com?apikey=3e911be4a6bb894dcf6982d84cc5d0bd9f45a8039a82e0a1f90ef2f3a53eac72&domain=',
        }}
        style={{flex: 1}}
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grant"
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
};

export default MapLocation;

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
          uri: `https://app.mappedin.com/map/65f244eaa1cbc80d8a98ee2b/directions?floor=m_d337a636b510028c&location=${location}&departure=s_27960508284e8b38`,
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

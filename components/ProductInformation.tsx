import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const ProductInformation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://web.unitear.com/'}}
        style={{flex: 1}}
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grant"
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
};

export default ProductInformation;

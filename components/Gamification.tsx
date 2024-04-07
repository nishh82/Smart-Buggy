import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const Gamification = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setActive(true), 2500);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!active ? (
        <Text>Loading...</Text>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{uri: 'https://studio.onirix.com/exp/37Mool'}}
          style={{display: active ? 'flex' : 'none', flex: 1}}
          allowsInlineMediaPlayback
          mediaCapturePermissionGrantType="grant"
          setSupportMultipleWindows={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Gamification;

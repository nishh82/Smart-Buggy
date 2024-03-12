import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
} from '@viro-community/react-viro';
import React from 'react';
import {Text, View} from 'react-native';

const InitialScene = () => {
  return (
    <ViroARScene>
      <ViroText text={'Hello'} scale={[0.5, 0.5, 0.5]} position={[0, 0, -1]} />
    </ViroARScene>
  );
};

const ARPage = () => {
  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator initialScene={{scene: InitialScene}} />
    </View>
  );
};

export default ARPage;

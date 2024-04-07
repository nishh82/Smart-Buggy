import React, {useEffect, useState} from 'react';
import {
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroText,
} from '@viro-community/react-viro';

const ARScene = () => {
  return (
    <ViroARScene>
      <ViroText text="Hello" />
    </ViroARScene>
  );
};

export default ARScene;

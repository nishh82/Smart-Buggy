import React, {useRef, useEffect} from 'react';
import {View, Button} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {Buffer} from 'buffer';

const ObjectDetectionScreen = () => {
  const cameraRef = useRef(null);
  const socket = new WebSocket('ws://your_websocket_server_url');

  useEffect(() => {
    // Connect to WebSocket server

    socket.onopen = () => {
      // connection opened
      socket.send('something'); // send a message
    };

    socket.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handleCapture = async () => {
    if (cameraRef.current && socket) {
      const imageBuffer = await cameraRef.current.takePhoto({
        quality: 'medium',
      });
      const imageData = Buffer.from(imageBuffer.base64, 'base64');

      // Send image data to WebSocket server
      socket.send(imageData);
    }
  };

  const device = useCameraDevice('back');

  return (
    <View style={{flex: 1}}>
      <Camera
        device={device!}
        isActive
        ref={cameraRef}
        style={{flex: 1}}
        // Adjust camera settings as needed
      />
      <Button title="Capture" onPress={handleCapture} />
    </View>
  );
};

export default ObjectDetectionScreen;

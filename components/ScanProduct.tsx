import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTensorflowModel} from 'react-native-fast-tflite';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets, useSharedValue} from 'react-native-worklets-core';

import {useResizePlugin} from 'vision-camera-resize-plugin';
import {Product, productCountInitial} from './cartItem';
import {ShoppingCartContext} from './ShoppingCartProvider';
import ShoppingCart from './ShoppingCart';

const products = [
  {
    id: 0,
    name: 'Tim Hortons Hot Chocolate',
    price: 8.99,
    image: require('../assets/milk.png'),
    quantity: 1,
  },
  {
    id: 1,
    name: 'Gatorade Cool Blue',
    price: 6.99,
    image: require('../assets/milk.png'),
    quantity: 1,
  },
  {
    id: 2,
    name: 'Lysol Disinfectant Wipes',
    price: 2.99,
    image: require('../assets/milk.png'),
    quantity: 1,
  },
];

const PREDICTION_RATE_THRESHOLD = 240;
const FRAME_WINDOW = 10;

const ScanProduct = ({navigation}) => {
  const {addToCart, cartItems} = useContext(ShoppingCartContext);
  const [isCameraActive, setCameraActive] = useState(true);

  const isProductAdded = useSharedValue(false);

  const objectDetection = useTensorflowModel(
    require('./../assets/model.tflite'),
  );

  const productCounts = useSharedValue(productCountInitial);

  useEffect(() => {
    // Clear product counts and cart when the model is reloaded
    if (objectDetection.state === 'loaded') {
      isProductAdded.value = false;
      productCounts.value = productCountInitial;
    }
  }, [objectDetection.state, isProductAdded, productCounts]);

  const device = useCameraDevice('back');
  const model =
    objectDetection.state === 'loaded' ? objectDetection.model : undefined;

  const {resize} = useResizePlugin();

  const showAlert = Worklets.createRunInJsFn((product: Product) => {
    addToCart(product);
    Alert.alert(
      `${product.name} Added`,
      'The product has been added to the cart.',
      [
        {
          text: 'Scan Another Product',
          onPress: () => {
            isProductAdded.value = false;
            productCounts.value = productCountInitial;
            setCameraActive(true);
          },
        },
        {
          text: 'Go to Home',
          onPress: () => {
            isProductAdded.value = false;
            productCounts.value = productCountInitial;
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  });

  const updateProductCounts = Worklets.createRunInJsFn(
    (detection_scores: any) => {
      for (let product of products) {
        const productId = product.id;

        const predictionRate = detection_scores[productId];

        const currentCount = productCounts.value[productId].count;
        const currentSum = productCounts.value[productId].sum;

        let newCount = currentCount;
        let newSum = currentSum;

        if (predictionRate >= PREDICTION_RATE_THRESHOLD) {
          newCount =
            currentCount + 1 > FRAME_WINDOW ? FRAME_WINDOW : currentCount + 1;
          newSum = currentSum - currentSum / FRAME_WINDOW + predictionRate;

          productCounts.value[productId].count = newCount;
          productCounts.value[productId].sum = newSum;
        }

        if (
          newCount === FRAME_WINDOW &&
          newSum / FRAME_WINDOW >= PREDICTION_RATE_THRESHOLD
        ) {
          isProductAdded.value = true;
          setCameraActive(false);
          productCounts.value = productCountInitial;
          showAlert(product);
        }
      }
    },
  );

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (model == null && isProductAdded.value) {
        return;
      }

      // 1. Resize 4k Frame to 192x192x3 using vision-camera-resize-plugin
      const data = resize(frame, {
        scale: {
          width: 224,
          height: 224,
        },
        rotation: '0deg',
        pixelFormat: 'rgb',
        dataType: 'uint8',
      });

      // 2. Run model with given input buffer synchronously
      const input = new Uint8Array(data);
      const outputs = model?.runSync([input])!;

      //   3. Interpret outputs accordingly
      const detection_scores: any = outputs['0'];
      updateProductCounts(detection_scores);
    },
    [model, productCounts],
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Camera
          style={{width: 700}}
          device={device!}
          isActive={isCameraActive}
          frameProcessor={frameProcessor}
        />

        <View style={styles.cartContainer}>
          <ShoppingCart cartItems={cartItems} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  categoryContainer: {
    width: '70%',
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#005cbf',
    borderRadius: 2000,
    padding: 5,
    marginHorizontal: 30,
  },
  icon: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: 2000,
  },
  categoryText: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartContainer: {
    flex: 1,
    borderLeftColor: 'gray',
    borderLeftWidth: 2,
    padding: 10,
  },
});

export default ScanProduct;

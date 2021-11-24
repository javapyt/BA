import { Button, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import { RNCamera } from 'react-native-camera';
import {BarCodeScanner, usePermissions} from 'expo-barcode-scanner';
// Inspired by: https://github.com/federicocotogno/BarCodeApp
export default function TabTwoScreen() {
  // const soundPath = '/assets/sounds/Diginoiz_-_BBOS_-_1d_C_choir.wav';
  const [hasPermission, setHasPermission] = useState(Boolean);
  const[scanned, setScanned] = useState(false); 
  const[text, setText] = useState('Not Scanned so far');
  /*const [sound, setSound] = useState(Audio.Sound.createAsync(
    require(soundPath)));
  */
 /*
  async function playSound() {
    console.log('Loading Sound');
    await (await sound).sound.playAsync(); 
     await setSound(Audio.Sound.createAsync(
      require(soundPath)));
    }
 */  
  const requestCamPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted")
    })()
  }

  useEffect(() => {
    requestCamPermission();
  }, []);

  const handleBarCodeScanned = async ({type = 'back', data = ''}) => {
    setScanned(true); 
    setText(data); 
    // playSound();
    console.log('Type: ' + type + '\n Data:' + data); 
  }

  if (hasPermission === null) {
    return (
      <Text> Request Permission for Camera</Text>
    );
  }

  if (hasPermission === false) {
    return(
    <View>
      <Button title={'Enable camera permissions'} onPress={() => requestCamPermission()} color='#9c004b'/>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={Platform.OS === 'web' ? { flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",} : styles.cameraScannerBoxMobile}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ flex:1, ...StyleSheet.absoluteFillObject}}/>
      </View>
      {scanned ? <Text style={styles.text}>{text}</Text> : null }
      {scanned ? <Button title={'Repeat Scan?'} onPress={() => setScanned(false)} color='#9c004b' /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cameraScannerBoxMobile: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
    overflow: 'hidden',
    borderRadius: 30,
  },
  cameraScannerBoxWeb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 1000,
    width: 1000,
    borderRadius: 30,
  },
    text: {
      fontSize: 12,
      margin: 20,
    },
    button: {
      borderWidth: 10,
      
    },
});
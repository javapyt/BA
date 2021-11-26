import { Button, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
// Inspired by: (iOS, Android https://github.com/federicocotogno/BarCodeApp & Web https://codesandbox.io/s/hco7v?file=/src/App.js:310-333)
// Constraints: Web Scanner when used with iOS will only work in safari due to apple constraints. Android should work everywhere
  // On Mac is does not work with chrome. But with Firefox & Safari approved.. Lol 
  
export default function TabTwoScreen() {
const isWebApp = Platform.OS === 'web' ? true : false;
  // const soundPath = '../assets/sounds/Diginoiz_-_BBOS_-_1d_C_choir.wav';
  const [hasPermission, setHasPermission] = useState(Boolean);
  const[scanned, setScanned] = useState(false); 
  const[text, setText] = useState('Not Scanned so far');
  /* const [sound, setSound] = useState(Audio.Sound.createAsync(
    require(soundPath)));

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
      navigator.mediaDevices.getUserMedia({audio : false, video : true})
    .then(function(stream) {
      /* use the stream */
    })
    .catch(function(err) {
      /* handle the error */
    });
      setHasPermission(status == "granted")
    })()
  }

  useEffect(() => {
    requestCamPermission();
  }, []);

  const handleBarCodeScanned = async ({type = '', data = ''}) => {
    setScanned(true); 
    setText(data); 
    //playSound();
    console.log('Type: ' + type + '\n Data:' + data); 
  }

   const handleBarCodeScannedWeb = (data = '') => {
     if(data){
    setScanned(true); 
    setText(data); 
     }
    //playSound();
    console.log('Data:' + data); 
  }
  const handleError = async ({err = ''}) => {
    console.log(err);
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
      <View style={styles.cameraScannerBox}>
        {isWebApp ? <BarcodeScannerComponent width={500} height={500} onUpdate={(err, result) => {
          if (result && !scanned) handleBarCodeScannedWeb(result.getText());
        }} /> : <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height: 400, width: 400}}/>}
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
  cameraScannerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
    overflow: 'hidden',
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

import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import WebView from 'react-native-webview';
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner, usePermissions} from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
export default function TabTwoScreen() {
  return(
    <View>
    <Camera
    style={{width:"100%", height:"60%"}}
    ref={(r) => {
    let camera = r; 
    }}
    ></Camera>
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
});

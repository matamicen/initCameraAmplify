/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Modal, Button} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Muestro from './Muestro';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {

  state = {
    photoConfirm: false,
    url: ''
  };

  openModalPhotoConfirmation = () => {
    
    this.setState({
      photoConfirm: true
    });
  }

  closeModalPhotoConfirmation = () => {

    this.setState({
      photoConfirm: false
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
      this.setState({
        url: data.uri
      });
      this.openModalPhotoConfirmation();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
       
        <Modal visible={this.state.photoConfirm}  transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
              
              <View style={{ margin:20,
                   padding:20, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   bottom: 20,
                   left: 2,
                   right: 2,
                   position: 'absolute',
                   alignItems: 'center'                      
                    }}>
                   
                    <Muestro url={this.state.url} />
                  
                     <Button onPress={() => this.closeModalPhotoConfirmation()} title="Cierro" />
                 
                    </View>
                   
       </Modal>

        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

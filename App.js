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
  View, Modal, Button, Linking} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Muestro from './Muestro';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Amplify, { Auth, API, Storage, Analytics } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Buffer } from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';



Amplify.configure(awsconfig);


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photoConfirm: false,
      url: '',
      scanQR: false
    };
  
  }


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

  readFile = (filePath) => {
   
    return RNFetchBlob.fs.readFile(filePath, 'base64').then(data => new Buffer(data, 'base64'));
   
  }


  signIn = async () => {
    await Auth.signIn('LU2ACH', 'sabrina')
      .then(() => console.log('entro!'))
      .catch(err => console.log('error:', err))

    try {
      const { identityId } = await Auth.currentCredentials();
      console.log('la credencial es:' + identityId);
      var res = identityId.replace(":", "%3A");
      console.log('la url S3 es: ' + 'https://s3.amazonaws.com/sqso/protected/'+res+'/');
      //this.props.setUrlRdsS3('https://s3.amazonaws.com/sqso/protected/'+res+'/');
      var urls3 = 'https://s3.amazonaws.com/sqso/protected/'+res+'/';
      fileaux =  this.state.url;
      console.log("fileaux uri:"+ fileaux);

        fileName2 = fileaux.replace(/^.*[\\\/]/, '');
        rdsUrl = urls3+'images/'+fileName2;
        console.log('RDSurl final: '+rdsUrl);



        console.log('contenido fileaux: '+fileaux);
        // let cleanUri =  fileaux.replace("file:///", 'file://');
        //  console.log('url limpia:' +cleanUri) ;

//, contentType: 'image/png'
         return this.readFile(fileaux)
         .then(buffer => Storage.vault.put('images/'+fileName2, buffer, { level: 'protected' }))
         .then (result => {
                  console.log('resultado:'+result.key);
                  // actualizo SENT como TRUE en mediafile para ese file.
                
                })
                .catch(err => {
                  console.log(JSON.stringify(err));
                  console.log("fallo el UPLOAD UPLOAD UPLOADS3");
                });
    
    

        //  .then(fileInfo => ({ key: fileInfo.key }))
        //  .then(x => console.log('SAVED', x) || x);

/// agrego
// RNFetchBlob
//       .config({
//         fileCache: true,
//         appendExt: 'jpg',
//       })
//       .fetch('GET', fileaux, {
//       })
//       .then((res) => {
//       //  upload to storage
//         this.readFile(res.data)
//           .then(buffer => Storage.vault.put('image.jpg', buffer, { level: 'protected', contentType: 'image/png' }))
//           .then(x => console.log('SAVED', x) || x);
//       });
  


/// agrego
      //   console.log('llamo Storage: ');
      // const stored = Storage.vault.put('images/'+fileName2, fileaux, {
      //     level: 'protected'})
      //       .then (result => {
      //         console.log(result);
      //         // actualizo SENT como TRUE en mediafile para ese file.
            

            
      //       })
      //       .catch(err => {
      //         console.log(JSON.stringify(err));
      //         console.log("fallo el UPLOAD UPLOAD UPLOADS3");
             
            
            
      //       });






    }
    catch (e) {
      console.log('caught error', e);
      // Handle exceptions
    }
    session = await Auth.currentSession();

    console.log("token: " + session.idToken.jwtToken);
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

  scanQR = async function() {
    this.setState({scanQR: !this.state.scanQR})
  //  Linking
  //     .openURL('https://www.cnn.com')
  //     .catch(err => console.error('An error occured', err));

  }

  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));

      this.setState({scanQR: !this.state.scanQR})
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.scanQR ?
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
        :
        <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      }
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
            onPress={this.signIn.bind(this)}
            style = {styles.capture} >
            <Text style={{fontSize: 14}}> SignIn </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture} >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.scanQR.bind(this)}
            style = {styles.capture} >
            <Text style={{fontSize: 14}}> ScanQR# </Text>
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
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Image } from 'react-native';



export default class Muestro extends React.Component {
   
    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true.imageurl,
          tok: ''
        };
      }

      
   componentDidMount() {
    
    //  this.props.fetchPeople();
   
     }


      render() { 
        // this.props.imageurl
        console.log("RENDER MUESTRO");
           
   
              
        return( <View >
            
               <Image
            style={styles.faceImageStyle}
            source={{ uri: this.props.url }}
          />

             <Text style={styles.name} >
                 imagen
             </Text>
             <TouchableOpacity  onPress={this.props.onPress}>
          <Text style={styles.name}>Back</Text>
        </TouchableOpacity>
      
        <TouchableOpacity  onPress={() => this.signIn()}>
          <Text style={styles.name}>signIN</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => this.info()}>
          <Text style={styles.name}>Info</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity  onPress={() => this.signOut()}>
          <Text style={styles.name}>SignOut</Text>
        </TouchableOpacity> */}

         <TouchableOpacity  onPress={() => this.subos3()}>
          <Text style={styles.name}>subo a s3</Text>
        </TouchableOpacity>

         </View>
            
           
       
        )} 
    
    }
  

    
const styles = StyleSheet.create({
    faceImageStyle: {
    width: 150,
    height: 150,
 //   borderRadius: 30
    },
 name:{
     fontSize: 16,
     marginLeft: 5,
     padding: 5,
     fontWeight: 'bold',        
     color: 'orange'        
 }
});
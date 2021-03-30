import React from 'react';
import { Text, View,ScrollView,TouchableOpacity,StyleSheet,FlatList, TextInput, Alert,Modal} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            isModalVisible:false,
            firstName:'',
            lastName:'',
            emailId:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }
    SignIN = async(email,password)=>{
         if(email,password){
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
              return Alert.alert("User succesfully Logged IN");
            }).catch((error)=>{
              var errorCode = error.Code;
              var errorMessage = error.message;
              return Alert.alert(errorMessage);
            })
          }else {
              Alert.alert("Enter Email and Password");
            }    
        
    }
    
    SignUP = async(email,password,confirmPassword)=>{
      if(email,password,confirmPassword){
      if(confirmPassword !== password){
        return Alert.alert("Passwords and confirm Password don't match");
      }else if(confirmPassword == password){  
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(()=>{
            return Alert.alert("User succesfully created");
          }).catch((error)=>{
            var errorCode = error.Code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
          })
      }
    }else{
      return Alert.alert("Please Enter Email and Password");
    }
  }
    
  showModal = ()=>{
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        >
        <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
            <Text
              style={styles.modalTitle}
              >Registration</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Address"}
              multiline = {true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Email"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Confrim Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword: text
                })
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>{
                  this.SignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }}
              >
              <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={()=>this.setState({"isModalVisible":false})}
              >
              <Text style={{color:'#ff5722'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    )}

    render() {
        return (
          <View style={{flex:1}}>
           {
            this.showModal()
            }
           <Header 
            backgroundColor={'pink'}
            centerComponent={{
            text:'Login,Sign UP',
            style:{fontSize:25,color:'black'}
            }}/>
            
            <TextInput 
            styles={[styles.input,{marginTop:60}]}
            onChangeText={(text)=>{this.setState({email:text})}}
            placeholder={"Enter email here"}
            keyboardType={'email-address'}/>
            
            <TextInput 
            styles={[styles.input,{marginTop:60}]}
            onChangeText={(text)=>{this.setState({password:text})}}
            placeholder={"Enter password here"}
            secureTextEntry={true}/>

            <TouchableOpacity
            style={styles.but}
            onPress={()=>{this.SignIN(this.state.email,this.state.password)}}><Text>Submit</Text></TouchableOpacity>
            
            <TouchableOpacity
            style={styles.but}
            onPress={()=>{this.setState({isModalVisible:true})}}><Text>Sign UP</Text></TouchableOpacity>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    input:{
        width:200,
        height:20,
        borderColor:'black',
        color:'black',
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        borderWidth:1,
        marginTop:15,
        borderColor:'black'
    },
    but:{
        marginTop:15,
        alignSelf:'center',
        width:70,
        height:30,
        backgroundColor:'red',
        color:'green'
      },
      profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      title :{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color : '#ff3d00'
      },
      loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 20,
        margin:10,
        paddingLeft:10
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
     
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      }
     
})
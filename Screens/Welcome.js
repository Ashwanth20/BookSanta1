import React from 'react';
import { 
  Alert, 
  StyleSheet, 
  Text, View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase'

export default class Welcome extends React.Component{
    constructor() {
        super();
        this.state = {
          emailId: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          confirmPassword: '',
          DOB: '',
          address: '',
          isVisibleModal: "false",
        };
      }
      
      signUp = async (emailId,password) => {
        if(password !== confirmPassword){
          return Alert.alert("The Password Doesn't Match")
        }
        else{        
        firebase.auth.createUserWithEmailAndPassword(emailId,password).then((response) => {
            db.collection("Users").add({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              phoneNumber: this.state.phoneNumber,
              dob: this.state.DOB,
              address: this.state.address,
            })
            return Alert.alert("The User Has Been Added",
            "",
            [{
              text: "Ok", onPress: () => 
              this.setState ({
                isVisibleModal: "false"
              })
            }]
            )
        })
        .catch(function(error){
            var code = error.code
            var message = error.message
            return Alert.alert(message)
        }
        )
      }
      }

      showModal = () => {
        return(
          <Modal
          animationType = "fade"
          transparent = {true}
          visible = {this.state.isVisibleModal}>
            <View>
              <ScrollView style = {{width: 30, height: 60}}>
                <KeyboardAvoidingView styles = {style.design}>
                  <Text styles = {style.textDesign}>Registration Form</Text>
                  <TextInput
                  style = {styles.NameBox}
                  placeholder = {"First Name"}
                  maxLength = {10}
                  onChangeText = {(text) => {
                  this.setState({
                    firstName: text
                });
              }}
          />
            <TextInput
            style = {styles.NameBox}
            placeholder = {"Last Name"}
            maxLength = {10}
            onChangeText = {(text) => {
              this.setState({
                lastName: text
              });
            }}
          />
          <TextInput
            style = {styles.NameBox}
            placeholder = {"Date.Of.Birth"}
            maxLength = {10}
            keyboardType = {"numeric"}
            onChangeText = {(text) => {
              this.setState({
                DOB: text
              });
            }}
          />
          <TextInput
            style = {styles.NameBox}
            placeholder = {"Phone Number"}
            maxLength = {10}
            keyboardType = {"numeric"}
            onChangeText = {(text) => {
              this.setState({
                phoneNumber: text
              });
            }}
          />
          <TextInput
          style = {styles.NameBox}
          placeholder = {"Address"}
          maxLength = {10}
          multiline = {true}
          onChangeText = {(text) => {
            this.setState({
              address: text
            });
          }}
        />
        <TextInput
        style = {styles.NameBox}
        placeholder = {"Email ID"}
        maxLength = {10}
        keyboardType = {"email-address"}
        onChangeText = {(text) => {
          this.setState({
            emailId: text
          });
        }}
      />
        <TextInput
            style = {styles.NameBox}
            placeholder = {"Password"}
            maxLength = {10}
            secureTextEntry = {true}
            onChangeText = {(text) => {
              this.setState({
                password: text
              });
            }}
          />
          <TextInput
          style = {styles.NameBox}
          placeholder = {"Confirm Password"}
          maxLength = {10}
          secureTextEntry = {true}
          onChangeText = {(text) => {
            this.setState({
              confirmPassword: text
            });
          }}
        />
            <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
          onPress = {() => {this.signUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
            >
            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
            <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
          onPress = {() => this.setState({
            isVisibleModal: "false",
          })}
            >
            <Text style={{ textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </Modal>
        );
      }

      login = async (emailId, password) => {
        if (emailId && password) {
          try {
          const response = await firebase.auth().signInWithEmailAndPassword(emailId, password).then(() => {
              return Alert.alert ("The Login Has Been Done")
          })

          }
          catch(error){
            switch(error.code){
              case "auth/User-Not-Found": Alert.alert("User Is Not Found")
              break
              case "auth/Invalid-Email": Alert.alert("EmailID & Password Incorrect")
              break
            }
          }
        } else {
          Alert.alert('EmailID & Password Is Reqired');
        }
      };

  render() {
    return (
      <View style = {styles.container}>
        {this.showModal()}
      <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
        <View>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ textAlign: 'center', fontSize: 30 }}>Willy</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="Email ID"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
          onPress = {() => {this.login(this.state.emailId, this.state.password)}}
            >
            <Text style={{ textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
          onPress = {() => this.setState({
            isVisibleModal: "true",
          })}
            >
            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  textDesign: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  NameBox: {
    width: 250,
    height: 35,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "black",
    marginTop: 25,
    padding: 13,
  }
});
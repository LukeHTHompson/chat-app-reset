// C:\Users\Luke\AppData\Local\Android\Sdk\platform-tools\adb.exe start-server

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';

import image from "../assets/background-image.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourName: '',
      color: '',
      errorMessage: '  Your Name'
    };
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={image} resizeMode='cover'>
        <View style={styles.WholeContainer}>
          <View style={styles.TopContainer}>
            <Text style={styles.Title}>
              Chat App
            </Text>
          </View>
          <View style={styles.BotContainer}>
            {/* Control input style by state which changes based on input being default value or user input */}
            <View
              style={styles.NameContainer}
            >
              <TextInput
                style={styles.NamePlaceholder}
                placeholder={this.state.errorMessage}
                // value={this.state.yourName}
                onChangeText={(yourName) => this.setState({ yourName })}
              >
              </TextInput>
            </View>
            <View style={styles.ColorContainer}>
              <View>
                <Text style={styles.ColorPrompt}>
                  Choose Background Color:
                </Text>
              </View>
              {/* Store chosen color in state by passing background color of element to funciton to set state */}
              <View style={[styles.ColorList, { backgroundColor: this.state.color }]}>
                <View style={styles.ColorOptionHolder}>
                  <Pressable style={styles.Color1}
                    onPress={() => this.setState({
                      color: '#090C08'
                    })}
                  ></Pressable>
                </View>
                <View style={styles.ColorOptionHolder}>
                  <Pressable style={styles.Color2}
                    onPress={() => this.setState({
                      color: '#474056'
                    })}
                  ></Pressable>
                </View>
                <View style={styles.ColorOptionHolder}>
                  <Pressable style={styles.Color3}
                    onPress={() => this.setState({
                      color: '#8A95A5'
                    })}
                  ></Pressable>
                </View>
                <View style={styles.ColorOptionHolder}>
                  <Pressable style={styles.Color4}
                    onPress={() =>
                      this.setState({
                        color: '#B9C6AE'
                      })}
                  ></Pressable>
                </View>
              </View>
            </View>
            <View style={styles.ButtonContainer}>
              {/* <View style={styles.ButtonView}>
              <Button title='Start Chatting' style={styles.Button}>
              </Button> */}
              <Pressable style={styles.Button}
                onPress={
                  () => {
                    if (this.state.yourName == '') {
                      this.setState({
                        errorMessage: 'You must provide a name before chatting'
                      })
                      // console.log(this.state.errorMessage)
                      console.log('You must provide a name before chatting')
                    }
                    if (this.state.yourName !== '') {
                      this.setState({
                        errorMessage: ' Your Name'
                      })
                      // console.log(this.state.yourName)
                      this.props.navigation.navigate('Chat', { yourName: this.state.yourName, color: this.state.color })
                    }
                  }}
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </Pressable>
            </View>
          </View>
          {Platform.OS === 'android'
            ? <KeyboardAvoidingView behavior="height" />
            : null}
        </View>
      </ImageBackground >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  WholeContainer: {
    flex: 1,
    width: '88%',
    height: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '6%',
    marginBottom: '6%',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TopContainer: {
    flex: 1,
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  Title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  BotContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  NameContainer: {
    flex: .25,
    justifyContent: 'center',
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%'
  },
  NameInput: {
    flex: 1
  },
  NamePlaceholder: {
    fontSize: 16,
    // fontWeight: '300',
    // color: '#757083',
    opacity: 50,
    borderWidth: 2,
    borderColor: '#757083',
    height: 50
  },
  NameValue: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
    opacity: 100
  },
  ColorContainer: {
    flex: .5,
    flexDirection: 'column',
    // justifyContent: 'center',
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%'
  },
  ColorPrompt: {
    fontSize: 20,
    fontWeight: '300',
    color: '#757083',
    textAlign: 'center',
    marginTop: 40
  },
  ColorList: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  ColorOptionHolder: {
    flex: 1,
    alignContent: 'flex-end'
  },
  Color1: {
    // marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#090C08'
  },
  Color2: {
    // marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#474056'
  },
  Color3: {
    // marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#8A95A5'
  },
  Color4: {
    // marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#B9C6AE'
  },
  ButtonContainer: {
    flex: .25,
    justifyContent: 'center'
  },
  Button: {
    // fontSize: 32,
    // fontWeight: '600',
    // color: '#FFFFFF',
    backgroundColor: '#757083',
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%'
  },
  ButtonView: {
    height: 50
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center'
  }
});
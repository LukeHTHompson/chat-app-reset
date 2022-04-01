import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Extras
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      location: null,
      rollPermission: '',
      camPermission: '',
      locPermission: '',
    };
  }

  onActionPress = () => {
    const options = ['Photo From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
          default:
        }
      },
    );
  };

  pickImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    this.setState({
      rollPermission: status
    });
    if (
      status === 'all' ||
      status === 'limited' ||
      status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result
        });
        console.log(result)
        const imageUrl = await this.uploadImage(result.uri)
        this.props.onSend({ image: imageUrl })
      }
    }
  }

  takePhoto = async () => {
    await Camera.requestCameraPermissionsAsync()
    const camPermission = (await Camera.getCameraPermissionsAsync()).status
    this.setState({
      camPermission: camPermission
    });
    if (camPermission === 'granted') {
      let result = await ImagePicker.launchCameraAsync(
        // {mediaTypes: 'Images',}
      ).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result
        });
        const imageUrl = await this.uploadImage(result.uri)
        this.props.onSend({ image: imageUrl })
      }
    }
  }

  getLocation = async () => {
    await Location.requestForegroundPermissionsAsync()
    const locPermission = (await Location.getForegroundPermissionsAsync()).status
    console.log(locPermission)
    this.setState({
      locPermission: locPermission,
    })
    if (locPermission === 'granted') {
      let result = await Location.getCurrentPositionAsync({});
      console.log(result)

      if (result) {
        this.setState({
          location: result
        })
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        })
      }
    }
  }

  // Store uploaded image to firebase as blob
  uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessbile={true}
        accessibilityLabel="More options"
        accessibilityHint="Lets you choose to send an image or your geolocation."
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
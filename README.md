# chat-app-reset
This is a basic chat app. Currently users can customize their chat name, colors, share pictures from library or camera, as well as send their location data to other users in the chat room.

# chat-app Setup
1. Clone this repo into a new folder on your computer by downloading as a ZIP and extracting to the desired location.
2. Using a Command Line Interface navigate to this new folder and run the following commands: (???)
      - npm install expo-cli --global
      - expo install expo-camera
      - expo install expo-image-picker
      - expo install expo-location
      - expo install expo-media-library
      - npm install firebase@8.10.0
      - npm install @react-native-async-storage/async-storage
      - npm install --save react-navigation
      - expo install react-native-gesture-handler
      - expo install react-native-screens react-native-safe-area-context
      - npm install @react-navigation/native-stack
      - npm install react-native-gifted-chat --save
      - npm install --save @react-native-community/netinfo
      - npm install react-native-maps --save-exact
      - Continue if necessary from package.json
3. In your web browser navigate to https://firebase.google.com/
4. Create an account on this page so you can use Firebase, or if you have an existing account click "Go To Console".
5. Once in Console add a new project with any name you like.
6. Click this button to see your FirebaseConfig which you will need to place into Components/Chat.js for your project.
      ![image](https://user-images.githubusercontent.com/88896427/160430940-aebda5cb-4ebf-4025-9255-076901acb999.png)
7. Once you have given your app a name you will be taken to a screen with sample code. Copy the entire variable firebaseConfig from this sample code and replace the existing firebaseConfig from Chat.js with your own firebaseConfig data.
8. Return to Firebase Console. Click 'Firestore Database' (NOT Realtime Database) on the left side of Firebase Console, then 'Create Database'. Choose to start in test mode. Choose a storage location (I recommend whichever seems closest to you) and click done.
9. Once this database is created click 'Start Collection' and give the Collection ID 'messages'.
10. You will be prompted to create the first document in the database. Let the database use Auto-ID and give the following fields = types (and values):
      _id = string (123123)
      createdAt = timestamp (today's date)
      image = string (null)
      key = string (123123)
      location = map
            latitude = number (1)
            longitude = number (1)
      text = string (TEST)
      user = array
            user[0]: _id = string
            user[1]: name = string
11. Return to Firebase Console. Click 'Location' on the left side of Firebase Console, then 'Get Started'. Choose to start in test mode. Choose a storage location (I recommend whichever seems closest to you) and click done.
      NOTE: In Test mode all users will be able to upload images to firebase for your app for the next 30 days. You can change the date in the Rules section of storage in order to extend or reduce this timeframe. You can also put intol this rule user authentication logic to prevent un-authorized users from uploading images (user authentication logic for image upload is not currently supported in this app by default).
12. Return to Firebase Console. Click 'Authentication' on the left side of Firebase Console, then 'Set-Up Sign in Method'. Choose 'Anonymous', toggle it to be 'enabled', then 'Save'.
13. Your Firebase Setup is now complete.


# Example Package.json:
```
{
  "name": "chat-app-reset",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.17.3",
    "@react-native-community/netinfo": "^8.2.0",
    "@react-navigation/native": "^6.0.10",
    "@react-navigation/native-stack": "^6.6.1",
    "expo": "~44.0.0",
    "expo-camera": "~12.1.2",
    "expo-image-picker": "~12.0.1",
    "expo-location": "~14.0.1",
    "expo-media-library": "~14.0.0",
    "expo-status-bar": "~1.2.0",
    "firebase": "^8.10.0",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-native": "0.64.3",
    "react-native-gesture-handler": "~2.1.0",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-maps": "0.30.1",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.10.1",
    "react-native-web": "0.17.1",
    "react-navigation": "^4.4.4"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}
```

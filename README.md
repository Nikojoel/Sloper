# Sloper - React-Native skiing related media sharing application
#### Unless you are using Metropolia's wifi - due to irregularites in Metropolia's firewall - you'll need to enable Metropolia VPN on your mobile device to make videos show on your device.
### Description
The intent of this project is to create a React-Native media sharing application using ready made [BackEnd](http://media.mw.metropolia.fi/wbma/docs/)
### Feature specification
* [Nativebase components](https://docs.nativebase.io/Components.html#Components)
* [Hooks](https://reactjs.org/docs/hooks-reference.html)
    * [useState](https://reactjs.org/docs/hooks-state.html)
    * [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
    * [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
* [Expo](https://expo.io/learn)
* [ESlint](https://eslint.org/)
* [Validate.js](http://validatejs.org/)
* [Reverse geocoding](https://opencagedata.com/)
* [ES6](http://es6-features.org/#Constants)
* [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
### Deployment
1. Clone or download the repository.
`git clone https://github.com/Nikojoel/Sloper.git`
2. Make sure you have [Node.js](https://nodejs.org/en/) installed to install required dependencies.
3. Run `npm i` to install dependencies.

<details>
  <summary>Check all dependencies</summary>
 
- react-native-community/masked-view
- react-native-community/slider
- expo
    - av
    - constants
    - image-picker
    - permissions
 - link
 - validate.js
 - native-base
 - react-dom
 - react-native
    - elements
    - exif
    - gesture-handler
    - maps
    - reanimated
    - safe-area-context
    - screens
    - star-rating
    - web
 - react-navigation
    - stack
    - tabs
</details>

#### 4. To use the reverse geocoding [API](https://opencagedata.com/api)
1. Sign up and generate an unique API key (requires a valid email address).
   - 2500 request/day with a free account.
2. Generate a file called `API.js` in the root directory.

![1](https://user-images.githubusercontent.com/45162563/76014211-e5ab7500-5f21-11ea-8657-1a8dd53b243a.png)

3. Insert the following line into the file:
```JavaScript
export const apiKey = "YOUR_API_KEY_HERE";
```
5. Run `npm start` from the terminal in `/Sloper/Sloper`

### Run locally

6. Your terminal should now look something like this

```
 To run the app with live reloading, choose one of:
  • Sign in as @YOUR_USERNAME in Expo client on Android or iOS. Your projects will automatically appear in the
>
  • Scan the QR code above with the Expo app (Android) or the Camera app (iOS).
  • Press a for Android emulator, or w to run on web.
  • Press e to send a link to your phone with email.

 Expo  Press ? to show a list of all available commands.
Logs for your project will appear below. Press Ctrl+C to exit.
```

7. Pressing `a` in the terminal will open up the project on your connected Android device. Full instructions [here](https://developer.android.com/training/basics/firstapp/running-app)
```
Trying to open the project on Android...
Opening on Android device

 Expo  Press ? to show a list of all available commands.
Finished building JavaScript bundle in 186ms.
Running application on Android SDK built for x86.
```

### Run through LAN or Tunnel
#### Android and iOS
1. Download the [Expo client](https://expo.io/tools) from Google Play Store or App Store.
2. Make sure you are in the same network as your computer for LAN connection or just scan the QR code for Tunnel connection.
#### If you run into any problems while deploying, check out the full [Expo](https://expo.io/learn) documentation.
#### [BackEnd documentation](http://media.mw.metropolia.fi/wbma/docs/)

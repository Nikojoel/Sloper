# Sloper - React-Native skiing related media sharing application
#### Unless you are using Metropolia's wifi - due to irregularites in Metropolia's firewall - you'll need to enable Metropolia VPN on your mobile device to make videos show on your device.
### Description
The intent of this project is to create a React-Native media sharing application using ready made [BackEnd](http://media.mw.metropolia.fi/wbma/docs/)
### Feature specification
* [Nativebase components](https://docs.nativebase.io/Components.html#Components)
* [Hooks](https://reactjs.org/docs/hooks-reference.html)
* [Expo](https://expo.io/learn)
* [ESlint](https://eslint.org/)
* [Validate.js](http://validatejs.org/)
* [Reverse geocoding](https://opencagedata.com/)
### Deployment
1. Clone or download the repository.
`git clone https://github.com/Nikojoel/Sloper.git`
2. Make sure you have [Node.js](https://nodejs.org/en/) installed to install required dependencies.
3. Run `npm i` to install dependencies.
4. Run `npm start` from the terminal.
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


#### Android
Run with emulator or download the [Expo client](https://expo.io/tools) from Google Play Store.
#### iOS
Download [Expo client](https://expo.io/tools) from the App Store and scan the QR code from your terminal.

#### To use the reverse geocoding [API](https://opencagedata.com/api)
1. Sign up and generate an unique API key (requires a valid email address).
   - 2500 request/day with a free account.
2. Generate a file called `API.js` in the root directory.

![1](https://user-images.githubusercontent.com/45162563/76014211-e5ab7500-5f21-11ea-8657-1a8dd53b243a.png)

3. Insert the following line into the file:
```JavaScript
export const apiKey = "YOUR_API_KEY_HERE";
```

### Routes
  - GET /media/all
    - All media from all users
  - GET /media/id
    - All media from specific user
  - GET /favourites/file/id
    - Get favourites
  - POST /media
    - Upload new media
  - POST /favourites/file/id
    - Post favourite
  - DELETE /media/id
    - Delete media
  - DELETE /favourites/file/id
    - Delete favourite
  - PUT /media/id
    - Update media
  





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
### APIs
### Npm packages
### Deployment
#### To use the reverse geocoding [API](https://opencagedata.com/api)
1. Sign up and generate an unique API key (requires a valid email address).
2. Generate a file called `API.js` in the root directory.

![1](https://user-images.githubusercontent.com/45162563/76014211-e5ab7500-5f21-11ea-8657-1a8dd53b243a.png)

3. Insert the following line into the file:
```JavaScript
export const apiKey = "YOUR_API_KEY_HERE";
```
### Routes
 - GET /media/all
    - All media from all users
  - GET /media/user
    - All media from specific user
  - POST /media
    - Upload new media
  - DELETE /media/id
    - Delete media
  - PUT /media/id
    - Update media
  - GET /favourites/file/id
    - Get favourites
  - POST /favourites/file/id
    - Post favourite
  - DELETE /favourites/file/id
    - Delete favourite
  





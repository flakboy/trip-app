# Travel Agency Web App
Simple web app based on Angular 15, developed during "Introduction to Web Applications" academic course.
## Technologies
- Frontend - Angular with TypeScript
- Backend - Firebase


# How to run
In order to run this project you need to install required dependencies:
* install NPM packages:
```
npm install
```
* install `angular-cli` with:
```
npm install -g @angular/cli
```

To be able to communicate with Firebase back-end, you also need to create files `src/environments/environment.ts` and/or `src environments/environment.prod.ts` (see: *Example configuration* below)

When above requirements are met, you can run the server with
```
npm start
```

## Example configuration  
```javascript
//src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "yourApiKeyHere",
    authDomain: "example.firebaseapp.com",
    projectId: "example",
    storageBucket: "example.appspot.com",
    messagingSenderId: "233263060974",
    appId: "1:233223420123:web:0abcdef123456790123123"
  }
};
```


import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBiW07P447yAyaXlm36viPzU_FTPWtxRl8",
    authDomain: "area-babz.firebaseapp.com",
    databaseURL: "https://area-babz-default-rtdb.firebaseio.com",
    projectId: "area-babz",
    storageBucket: "area-babz.appspot.com",
    messagingSenderId: "770974078352",
    appId: "1:770974078352:web:2773288b7475ab2a60cf15",
    measurementId: "G-R3MXMLZ8ED"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
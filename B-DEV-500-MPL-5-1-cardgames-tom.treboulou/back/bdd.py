import pyrebase

config = {
    "apiKey": "AIzaSyBh1bVmnJ-ouyiV5eZfOUVANoLfrFDSdWg",
    "authDomain": "dashboard-59b20.firebaseapp.com",
    "databaseURL": "https://dashboard-59b20.firebaseio.com",
    "storageBucket": "dashboard-59b20.appspot.com"
}
firebase = pyrebase.initialize_app(config)
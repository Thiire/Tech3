import flask
from flask import Flask, jsonify, request, redirect, url_for, json, Response
from oauth2client import client
from flask_api import status
from bdd import firebase
from flask_cors import CORS, cross_origin
from bnet.connection import BattleNetConnection
from requests.auth import HTTPBasicAuth
import base64
import requests
import time
import socket
import json

app = Flask(__name__)
CORS(app)

# PAYS

@app.route('/pays')
def pay_widget():
    pays = request.args.get("pays")
    resp = requests.get("https://restcountries.eu/rest/v2/name/" + pays)
    response = json.loads(resp.text)
    return response

# ALBION
@app.route('/albion')
def albion_widget():
    item = request.args.get("item")
    ville = request.args.get("ville")
    qualite = request.args.get("qualite")
    resp = requests.get("https://www.albion-online-data.com/api/v2/stats/prices/" + item + "?locations=" + ville + "&qualities=" + qualite)
    response = json.loads(resp.text)
    return response

# MINECRAFT

@app.route('/information/minecraft')
def minecraft_widget():
    pseudo = request.args.get("pseudo")
    resp = requests.get("https://api.mojang.com/users/profiles/minecraft/" + pseudo + "?at=0")

    response = json.loads(resp.text)

    skin = requests.get("https://sessionserver.mojang.com/session/minecraft/profile/" + response["id"])
    skines = json.loads(skin.text)
    return skines

# TIME_ZONE

@app.route('/time_zone')
def fuse_widget():
    zone = request.args.get("zone")

    resp = requests.get("http://worldtimeapi.org/api/timezone/" + zone)
    response = json.loads(resp.text)
    return response

# CURRENCY

@app.route('/money')
def money_widget():
    date = request.args.get("date")
    resp = requests.get("https://api.exchangeratesapi.io/" + date)
    response = json.loads(resp.text)
    return response

# LOREM

@app.route('/information/lorem')
def loremipsum_widget():
    resp = requests.get("https://loripsum.net/api/plaintext")
    r = Response(response=resp.content, status=200, mimetype="application/xml")
    r.headers["Content-Type"] = "text/xml; charset=utf-8"
    return resp.content, 200, {'Content-Type': 'text/css; charset=utf-8'}

# METEO

@app.route('/meteo')
def meteo_widget():
    API_KEY = '3645f05f9aba9ca04d086ba8d764d68a'
    city = request.args.get("city")

    reponse = requests.get("api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY)
    res = json.loads(response.text)
    return res

# TWITCH

@app.route('/information/twitch/unfollow')
def unfollow_channel():
    key = request.args.get("key")
    CHANNEL_ID = request.args.get("id")

    token = firebase.database().child("users/" + key + '/twitch').get()

    first_header = {"Authorization": "Bearer " + token.val()}

    response = requests.get("https://id.twitch.tv/oauth2/validate", headers=first_header)

    res = json.loads(response.text)

    second_header = {"Authorization": "Bearer " + token.val(), "Client-Id": "5jscig43s7ci5z3ay1kuwfs3wtpjjk"}

    me = requests.delete("https://api.twitch.tv/helix/users/follows?from_id=" + res["user_id"] + "&to_id=" + CHANNEL_ID, headers=second_header)
    return "200"

@app.route('/information/twitch/follow')
def follow_channel():
    key = request.args.get("key")
    CHANNEL_ID = request.args.get("id")

    token = firebase.database().child("users/" + key + '/twitch').get()

    first_header = {"Authorization": "Bearer " + token.val()}

    response = requests.get("https://id.twitch.tv/oauth2/validate", headers=first_header)

    res = json.loads(response.text)

    second_header = {"Authorization": "Bearer " + token.val(), "Client-Id": "5jscig43s7ci5z3ay1kuwfs3wtpjjk", "Content-Type": "application/json"}

    me = requests.post("https://api.twitch.tv/helix/users/follows?from_id=" + res["user_id"] + "&to_id=" + CHANNEL_ID, headers=second_header)
    return "200"

@app.route('/information/twitch/searchchannel')
def search_channel():
    key = request.args.get("key")
    channel = request.args.get("channel")
    live = request.args.get("live")

    token = firebase.database().child("users/" + key + '/twitch').get()

    first_header = {"Authorization": "Bearer " + token.val()}

    response = requests.get("https://id.twitch.tv/oauth2/validate", headers=first_header)

    res = json.loads(response.text)

    auth_header = {"Authorization": "Bearer " + token.val(), "Client-Id": "5jscig43s7ci5z3ay1kuwfs3wtpjjk"}

    follow = requests.get("https://api.twitch.tv/helix/search/channels?query=" + channel + "&live_only=" + live, headers=auth_header)
    follow_data = json.loads(follow.text)
    return follow_data

@app.route('/information/twitch/channel')
def channel_inf():
    key = request.args.get("key")
    ID = request.args.get("id")

    token = firebase.database().child("users/" + key + '/twitch').get()

    first_header = {"Authorization": "Bearer " + token.val()}

    response = requests.get("https://id.twitch.tv/oauth2/validate", headers=first_header)
    
    res = json.loads(response.text)

    auth_header = {"Authorization": "Bearer " + token.val(), "Client-Id": "5jscig43s7ci5z3ay1kuwfs3wtpjjk"}
    me = requests.get("https://api.twitch.tv/helix/users?id=" + ID, headers=auth_header)
    me_data = json.loads(me.text)
    return me_data

@app.route('/information/twitch/getlist')
def twitch_follow():
    key = request.args.get("key")

    token = firebase.database().child("users/" + key + '/twitch').get()

    first_header = {"Authorization": "Bearer " + token.val()}

    response = requests.get("https://id.twitch.tv/oauth2/validate", headers=first_header)

    res = json.loads(response.text)

    auth_header = {"Authorization": "Bearer " + token.val(), "Client-Id": "5jscig43s7ci5z3ay1kuwfs3wtpjjk"}

    me = requests.get("https://api.twitch.tv/helix/users/follows?from_id=" + res["user_id"], headers=auth_header)
    me_data = json.loads(me.text)
    return me_data

@app.route('/authorize/twitch')
def auth_twitch():
    TWITCH_CLIENT_ID = '5jscig43s7ci5z3ay1kuwfs3wtpjjk'
    TWITCH_CLIENT_SECRET = '3ndk5x9fm4e9gcefbfosojiqblv5yg'
    REDIRECT = "http://localhost:5000/Authorization"

    url_token = "https://id.twitch.tv/oauth2/authorize?client_id=" + TWITCH_CLIENT_ID + "&scope=" + "analytics:read:extensions analytics:read:games bits:read channel:edit:commercial channel:manage:broadcast channel:manage:extensions channel:manage:redemptions channel:read:hype_train channel:read:redemptions channel:read:stream_key channel:read:subscriptions clips:edit user:edit user:edit:follows user:read:broadcast user:read:email" + "&redirect_uri=" + REDIRECT + "&response_type=code&scope=viewing_activity_read"
    return redirect(url_token)

@app.route('/oauth2callback/twitch', methods=["POST"])
def oauth2_twitch():
    TWITCH_CLIENT_ID = '5jscig43s7ci5z3ay1kuwfs3wtpjjk'
    TWITCH_CLIENT_SECRET = '3ndk5x9fm4e9gcefbfosojiqblv5yg'
    REDIRECT = "http://localhost:5000/Authorization"
    code = request.json["code"]
    key = request.json["key"]

    post_request = requests.post("https://id.twitch.tv/oauth2/token?client_id=" + TWITCH_CLIENT_ID + "&client_secret=" + TWITCH_CLIENT_SECRET + "&code=" + code + "&grant_type=authorization_code&redirect_uri=" + REDIRECT)

    response_data = json.loads(post_request.text)

    access_token = response_data["access_token"]
    firebase.database().child("users/" + key).update({"twitch": access_token})
    return "200"

@app.route('/connected/twitch')
def connected_twitch():
    key = request.args.get("key")
    user = firebase.database().child("users/" + key + '/twitch').get()
    if not len(user.val()):
        return "400"
    return "200"

# SPOTIFY

@app.route('/information/spotify/top')
def top():
    key = request.args.get("key")
    TYPE = request.args.get("type")
    url = "https://api.spotify.com/v1/me/top/" + TYPE

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val()), "Content-Type": "application/json"}

    resp = requests.get(url, headers=auth_header, data=body)

    response = json.loads(resp.text)
    return response

@app.route('/information/spotify/followers')
def followers():
    key = request.args.get("key")

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val()), "Content-Type": "application/json"}

    me = requests.get("https://api.spotify.com/v1/me", headers=auth_header)
    me_data = json.loads(me.text)

    return me_data["followers"]

@app.route('/information/spotify/unfollow')
def unfollow_playlist():
    key = request.args.get("key")
    ID = request.args.get("id")
    url = "https://api.spotify.com/v1/playlists/"+ ID + "/followers"

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val())}

    resp = requests.delete(url, headers=auth_header)

    return "200"

@app.route('/information/spotify/follow')
def follow_playlist():

    key = request.args.get("key")
    ID = request.args.get("id")
    url = "https://api.spotify.com/v1/playlists/" + ID + "/followers"

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val()), "Content-Type": "application/json"}

    resp = requests.put(url, headers=auth_header)

    return "200"

@app.route('/information/spotify/searchplaylist')
def search_playlist():

    key = request.args.get("key")
    LIST = request.args.get("list")
    url = "https://api.spotify.com/v1/search?q=" + LIST + "&type=playlist"

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val())}

    resp = requests.get(url, headers=auth_header)

    response = json.loads(resp.text)
    return response

@app.route('/information/spotify/getlist')
def get_list():

    key = request.args.get("key")
    url = "https://api.spotify.com/v1/me/playlists"

    token = firebase.database().child("users/" + key + '/spotify').get()
    auth_header = {"Authorization": "Bearer {}".format(token.val())}

    resp = requests.get(url, headers=auth_header)
    response = json.loads(resp.text)
    return "200"
    
@app.route('/authorize/spotify')
def auth_spotify():
    CLIENT_ID = 'b5f5715a5728421db3ff0012ad6fb5d1'
    CLIENT_SECRET = 'a33ffc02b96243be95081841608fd40f'

    url = 'https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + CLIENT_ID + '&scope=' + 'ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private' + '&redirect_uri=' + "http://localhost:5000/Authorization"
    return redirect(url)

@app.route('/oauth2callback/spotify', methods=["POST"])
def oauth2_spotify():
    CLIENT_ID = 'b5f5715a5728421db3ff0012ad6fb5d1'
    CLIENT_SECRET = 'a33ffc02b96243be95081841608fd40f'

    code = request.json["code"]
    key = request.json["key"]

    code_payload = {"grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:5000/Authorization"}

    base64encoded = base64.b64encode(("{}:{}".format(CLIENT_ID, CLIENT_SECRET)).encode())
    headers = {"Authorization": "Basic {}".format(base64encoded.decode())}

    post_request = requests.post("https://accounts.spotify.com/api/token", data=code_payload, headers=headers)

    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    firebase.database().child("users/" + key).update({"spotify": access_token})
    return "200"

@app.route('/connected/spotify')
def connected_spotify():
    key = request.args.get("key")
    user = firebase.database().child("users/" + key + '/spotify').get()
    if not len(user.val()):
        return "400"
    return "200"


# YOUTUBE

@app.route('/authorize/youtube')
def auth_youtube():
    return redirect("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https://www.googleapis.com/auth/youtube&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5000/Authorization&response_type=token&client_id=171143826161-0rptgv6s7m44sokf666o4ii4dofctll6.apps.googleusercontent.com")

@app.route('/oauth2callback/youtube', methods=["POST"])
def oauth2_youtube():
    key = request.json["key"]
    access_token = request.json["access_token"]
    firebase.database().child("users/" + key).update({"youtube": access_token})
    return "200"

@app.route('/connected/youtube')
def connected_youtube():
    key = request.args.get("key")
    user = firebase.database().child("users/" + key + '/youtube').get()
    if not len(user.val()):
        return "400"
    return "200"

@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello World!'


# ABOUT JSON

@app.route('/about.json')
def about_json():
    ip = socket.gethostbyname('localhost')
    times = int(time.time())
    with open('about.json', 'r') as json_file:
        data = json.load(json_file)
        data['client']['host'] = ip
        data['server']['current_time'] = times
    return data

# LOGIN

@app.route('/login', methods=["POST"])
def login():
    mail = request.json["mail"]
    password = request.json["password"]
    user = ""
    data = ""

    try:
        user = firebase.auth().sign_in_with_email_and_password(mail, password)
    except requests.HTTPError as err:
        error_json = err.args[1]
        error = json.loads(error_json)['error']['message']
        return jsonify(error), 400
    data = requests.get("https://dashboard-59b20.firebaseio.com/users.json?orderBy=%22email%22&equalTo=%22" + mail + '%22').json()
    return {"data": data, "code": 202}, 202

# REGISTER

@app.route('/register', methods=["POST"])
def register_page():
    mail = request.json["mail"]
    password = request.json["password"]
    username = request.json["username"]
    user = ""
    data = ""

    try:
        user = firebase.auth().create_user_with_email_and_password(mail, password)
    except requests.HTTPError as err:
        error_json = err.args[1]
        error = json.loads(error_json)['error']['message']
        return jsonify(error), 402
    firebase.database().child("users").push({"email": mail, "username": username, "youtube": "", "spotify": "", "twitch": "", "battlenet": ""})
    data = requests.get("https://dashboard-59b20.firebaseio.com/users.json?orderBy=%22email%22&equalTo=%22" + mail + '%22').json()
    return {"data": data, "code": 201}, 201

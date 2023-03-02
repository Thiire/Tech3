import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { COLORS } from './color/Color';
import { WebView } from 'react-native-webview';
import Loading from './Loading';
import base64 from 'react-native-base64'

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('screen').height)

const redirect = "http://localhost:8081/login";

const discord_client_id = "817396403567067207";

const spotify_client_id = "28a27c4fc752448596e54fd1561062af";

const facebook_client_id = "132131332157566";

const office_client_id = "781efdfd-b58e-4d06-aa52-7997478d6994";

const twitch_client_id = "avbd4qpdl98cnyht1qmd83x5o0ynzm";

const imgur_client_id = "414a1cf5359f781";

const youtube_client_id = "833991532817-1f4b3at1f9mh2s053ndd06036hkmgj81.apps.googleusercontent.com";

const yammer_client_id = "bCsVCarsqNIEoQhTOIldQ";

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.network = this.props.navigation.state.params.network;
        this.email = this.props.navigation.state.params.email;
        this.token = null;
        this.uri = null;
        this.state = {
            loadingMode: false,
        }
    }

    componentDidMount() {
        let scope = "";
        switch (this.network) {
            case "Discord":
                scope = 'identify%20email%20connections%20guilds%20gdm.join%20webhook.incoming%20messages.read';
                this.uri = 'https://discord.com/oauth2/authorize' + '?response_type=code'
                    + '&client_id=' + discord_client_id
                    + '&permissions=' + '1879125232'
                    + '&scope=' + scope
                    + '&redirect_uri=' + redirect;
                break;
            case "Spotify":
                scope = 'user-library-read user-library-modify user-follow-modify user-read-private user-read-email playlist-modify-private user-follow-modify playlist-modify-public';
                this.uri = 'https://accounts.spotify.com/authorize' + '?response_type=code'
                    + '&client_id=' + spotify_client_id
                    + '&scope=' + scope
                    + '&redirect_uri=' + redirect;
                break;
            case "Facebook":
                scope = 'email,user_likes,groups_access_member_info,instagram_basic,instagram_content_publish,instagram_manage_comments,pages_manage_posts,pages_messaging,pages_read_engagement,pages_read_user_content,pages_show_list,public_profile,publish_to_groups,user_friends,user_link,user_photos,user_videos'
                this.uri = 'https://www.facebook.com/v10.0/dialog/oauth' + '?response_type=code'
                    + '&client_id=' + facebook_client_id
                    + '&redirect_uri=' + redirect
                    + '&scope=' + scope;
                break;
            case "Office":
                scope = 'email openid Calendars.ReadWrite Chat.ReadWrite ChatMessage.Read ChatMessage.Send Contacts.ReadWrite Files.ReadWrite.All Mail.ReadWrite Notes.ReadWrite.All';
                this.uri = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' + '?response_type=code'
                    + '&response_mode=' + 'query'
                    + '&client_id=' + office_client_id
                    + '&scope=' + scope
                    + '&redirect_uri=' + redirect;
                break;
            case "Twitch":
                scope = 'channel_subscriptions channel_commercial channel_editor user_follows_edit channel_read user_read user_blocks_read user_blocks_edit user:edit:follows user:edit';
                this.uri = 'https://id.twitch.tv/oauth2/authorize' + '?response_type=token'
                    + '&client_id=' + twitch_client_id
                    + '&scope=' + scope
                    + '&redirect_uri=' + redirect;
                break;
            case "Imgur":
                this.uri = 'https://api.imgur.com/oauth2/authorize' + '?response_type=token'
                    + '&client_id=' + imgur_client_id
                break;
            case "Youtube":
                scope = 'https://www.googleapis.com/auth/youtube';
                this.uri = 'https://accounts.google.com/o/oauth2/v2/auth' + '?response_type=token'
                    + '&client_id=' + youtube_client_id
                    + '&scope=' + scope
                    + '&state=' + 'pass-through value'
                    + '&redirect_uri=' + redirect
                break;
            case "Yammer":
                this.uri = 'https://www.yammer.com/oauth2/authorize' + '?response_type=code'
                    + '&client_id=' + yammer_client_id
                    + '&redirect_uri=' + 'http://localhost:8081';
                break;
            default:
                break;
        }
        setTimeout(() => {
            this.setState({loadingMode: false});
        }, 1000);
    }

    pushToken(network, token) {

    }

    NavigationChanged = async (webViewState) => {
        console.log(webViewState.url);
        if (this.token == null && webViewState.url.indexOf('http://localhost:8081') == 0) {
            switch (this.network) {
                case "Discord":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("?code=") + 6, webViewState.url.indexOf("&", webViewState.url.indexOf("?code=")))
                    var guild = webViewState.url.slice(webViewState.url.indexOf("&guild_id=") + 10)
                    fetch('https://area-babyb.herokuapp.com/discordRedirect', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com',
                            'id': guild
                        },
                        body: JSON.stringify({
                            "code": this.token,
                            "email": this.email
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))    
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Spotify":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("?code=") + 6)
                    fetch('https://area-babyb.herokuapp.com/spotifyRedirect', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com'
                        },
                        body: JSON.stringify({
                            "code": this.token,
                            "email": this.email
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Yammer":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("?code=") + 6)
                    fetch('https://area-babyb.herokuapp.com/yammerRedirect', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com'
                        },
                        body: JSON.stringify({
                            "code": this.token,
                            "email": this.email
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Facebook":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("?code=") + 6)
                    fetch('https://area-babyb.herokuapp.com/facebookRedirect', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com'
                        },
                        body: JSON.stringify({
                            "code": this.token,
                            "email": this.email
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Office":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("?code=") + 6, webViewState.url.indexOf("&", webViewState.url.indexOf("?code=")))
                    fetch('https://area-babyb.herokuapp.com/officeRedirect', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com'
                        },
                        body: JSON.stringify({
                            "code": this.token,
                            "email": this.email
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Twitch":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("#access_token=") + 14, webViewState.url.indexOf("&", webViewState.url.indexOf("#access_token=")))
                    fetch('https://area-babyb.herokuapp.com/addUserService', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com',
                            'email': this.email
                        },
                        body: JSON.stringify({
                            "name": "Twitch",
                            "connected": true,
                            "token": this.token,
                            "token_secret": ""
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Imgur":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("#access_token=") + 14, webViewState.url.indexOf("&", webViewState.url.indexOf("#access_token=")))
                    fetch('https://area-babyb.herokuapp.com/addUserService', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com',
                            'email': this.email
                        },
                        body: JSON.stringify({
                            "name": "Imgur",
                            "connected": true,
                            "token": this.token,
                            "token_secret": ""
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                case "Youtube":
                    this.token = webViewState.url.slice(webViewState.url.indexOf("&access_token=") + 14, webViewState.url.indexOf("&", webViewState.url.indexOf("&access_token=") + 1))
                    fetch('https://area-babyb.herokuapp.com/addUserService', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Origin': '',
                            'Host': 'area-babyb.herokuapp.com',
                            'email': this.email
                        },
                        body: JSON.stringify({
                            "name": "Youtube",
                            "connected": true,
                            "token": this.token,
                            "token_secret": ""
                        })
                    }).then(async (res) => {
                        console.log(JSON.stringify(res))
                        this.props.navigation.state.params.onGoBack(this.network);
                        this.props.navigation.goBack()
                    })
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        if (this.state.loadingMode) {
            return (
                <Loading/>
            )
        } else {
            return(
                <WebView source={{uri: this.uri}} onNavigationStateChange={this.NavigationChanged.bind(this)} userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"/>
            )
        }
    }
}

const styles = StyleSheet.create({
});

export default Auth
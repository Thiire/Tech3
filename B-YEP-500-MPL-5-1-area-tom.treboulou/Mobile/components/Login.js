import React from 'react'
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { COLORS } from './color/Color';
import Loading from './Loading';
import firebase from '../firebase';

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('screen').height)

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.keyboardHeight = 0,
        this.state = {
            loadingMode: false,

            mode: false,
            keyboardMode: false,
            email: "",
            password: "",
            secondPassword: ""
        }
    }

    _keyboardDidShow = (e) => {
        this.setState({keyboardMode: true});
        this.keyboardHeight = e.endCoordinates.height;
    }
    
    _keyboardDidHide = () => {
        this.setState({keyboardMode: false});
        this.keyboardHeight = 0;
    }

    componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    getAreas = async (email) => {
        return (await fetch('https://area-babyb.herokuapp.com/userAreas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'area-babyb.herokuapp.com',
                'email': email
            },
            body: JSON.stringify(FormData)
        }).then((res) => {
            return (res.json())
        }).then((json) => {
            return json
        }));
    }

    getUserServices = async (email) => {
        return (await fetch('https://area-babyb.herokuapp.com/userServices', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'area-babyb.herokuapp.com',
                'email': email
            },
            body: JSON.stringify(FormData)
        }).then((res) => {
            return (res.json())
        }).then((json) => {
            return json
        }));
    }

    getServices = async () => {
        return (await fetch('https://area-babyb.herokuapp.com/services', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'area-babyb.herokuapp.com',
            },
            body: JSON.stringify(FormData)
        }).then((res) => {
            return (res.json())
        }).then((json) => {
            return json
        }));
    }

    clickLogin = async () => {
        if (this.state.mode) {
            this.setState({password: ""});
            this.setState({secondPassword: ""});
            this.setState({mode: false});
        } else {
            if (this.state.email.length == 0) {
                alert("Veuillez saisir une adresse email valide");
            } else if (this.state.password.length == 0) {
                alert("Veuillez saisir un mot de passe valide");
            } else {
                this.setState({loadingMode: true});
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
                    const areas = await this.getAreas(this.state.email);
                    var services = await this.getServices();
                    const tmpServices = await this.getUserServices(this.state.email);
                    for (let i = 0; services && i < services.length; i++) {
                        for (let n = 0; tmpServices && n < tmpServices.length; n++) {
                            if (services[i].name == tmpServices[n].name)
                                services[i].connected = true
                        }
                        services[i].connected = (services[i].connected) ? true : false;
                    }
                    this.setState({loadingMode: false});
                    this.props.navigation.navigate("MainPage", {networks: services, areas: areas, email: this.state.email});
                }).catch((error) => {
                    alert(error);
                    this.setState({loadingMode: false});
                })
            }
        }
    }

    clickSignIn = async () => {
        if (this.state.mode) {
            if (this.state.email.length == 0) {
                alert("Veuillez saisir une adresse email valide");
            } else if (this.state.password != this.state.secondPassword) {
                alert("Veuillez saisir deux mot de passe correspondant");
            } else if (this.state.password.length < 6 && this.state.secondPassword.length < 6) {
                alert("Veuillez saisir un mot de passe valide");
            } else {
                this.setState({loadingMode: true});
                const response = fetch('https://area-babyb.herokuapp.com/signUp', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Origin': '',
                        'Host': 'area-babyb.herokuapp.com'
                    },
                    body: JSON.stringify({
                        "username": this.state.email,
                        "password": this.state.password,
                        "mail": this.state.email
                    })
                }).then(async (res) => {
                    if (JSON.stringify(res).status == 200) {
                        const areas = await this.getAreas(this.state.email);
                        var services = await this.getServices();
                        const tmpServices = await this.getUserServices(this.state.email);
                        for (let i = 0; services && i < services.length; i++) {
                            for (let n = 0; tmpServices && n < tmpServices.length; n++) {
                                if (services[i].name == tmpServices[n].name)
                                    services[i].connected = true
                            }
                            services[i].connected = (services[i].connected) ? true : false;
                        }
                        this.setState({loadingMode: false});
                        this.props.navigation.navigate("MainPage", {networks: services, areas: areas, email: this.state.email});
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        } else {
            this.setState({password: ""});
            this.setState({secondPassword: ""});
            this.setState({mode: true});
        }
    }

    render() {
        if (this.state.loadingMode) {
            return (
                <Loading/>
            )
        } else {
            return(
                <View style={styles.container}>
                    {this.state.keyboardMode ? (null) : (
                        <Image style={styles.mainImage} source={require('../assets/Logo_Ombre.png')}/>
                    )}
                    <TextInput style={[styles.inputZone, {marginTop: (screenWidth - (screenWidth / 1.5)) / (this.state.keyboardMode ? 1 : 2)}]} placeholder="Adresse email" keyboardType="email-address" returnKeyType="next" autoCapitalize="none" placeholderTextColor={COLORS.secondGray} onChangeText={(text) => this.setState({email: text})} value={this.state.email}/>
                    <TextInput style={[styles.inputZone, {marginTop: 30}]} placeholder="Mot de passe" secureTextEntry={true} returnKeyType={(this.state.mode ? "next" : "done")} autoCapitalize="none" placeholderTextColor={COLORS.secondGray} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
                    {this.state.mode ? (
                        <TextInput style={[styles.inputZone, {marginTop: 30}]} placeholder="Confirmer le mot de passe" secureTextEntry={true} returnKeyType="done" autoCapitalize="none" placeholderTextColor={COLORS.secondGray} onChangeText={(text) => this.setState({secondPassword: text})} value={this.state.secondPassword}/>
                    ) : (null)}
                    <View style={styles.sideButtonContainer}>
                        <TouchableOpacity style={[styles.button, {marginRight: 10, backgroundColor: 'white', borderColor: COLORS.mainBlue}]} onPress={this.clickSignIn}>
                            <Text style={[styles.textButton, {color: COLORS.mainBlue}]}>{(this.state.mode ? "S'inscrire" : "Inscription")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {marginLeft: 10, backgroundColor: COLORS.mainBlue, borderColor: COLORS.mainBlue}]} onPress={this.clickLogin}>
                            <Text style={[styles.textButton, {color: 'white'}]}>{(this.state.mode ? "Connexion" : "Se connecter")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.thirdGray,
    },
    sideButtonContainer: {
        width: screenWidth / 1.3,
        height: 40,
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainImage: {
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
        alignSelf: 'center',
        marginTop: (screenWidth - (screenWidth / 1.5)) / 2
    },
    inputZone: {
        width: screenWidth / 1.3,
        height: 40,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.secondBlue,
        borderRadius: 15,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1
    },
    textButton: {
        fontWeight: 'bold'
    }
});

export default Login
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Dimensions, StatusBar, Alert, TextInput } from 'react-native';
import { COLORS } from './color/Color';

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('screen').height)

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.networks = this.props.navigation.state.params.networks;
        this.areas = this.props.navigation.state.params.areas;
        this.email = this.props.navigation.state.params.email;
        this.actionServices = [];
        this.reactionServices = [];
        this.actions = [];
        this.reactions = [];
        this.actionArgsResult = [];
        this.reactionArgsResult = [];
        this.state = {
            actionService: undefined,
            reactionService: undefined,
            action: undefined,
            reaction: undefined,
        }
    }

    componentDidMount() {
        if (this.networks) {
            for (let i = 0; i < this.networks.length; i++) {
                this.networks[i].image = this.getNetworkIcon(this.networks[i].name, this.networks[i].connected);
                if (this.networks[i].actions.length != 0 && this.networks[i].connected) {
                    this.actionServices.push({"label": this.networks[i].name, "value": i});
                }
                if (this.networks[i].reactions.length != 0 && this.networks[i].connected) {
                    this.reactionServices.push({"label": this.networks[i].name, "value": i});
                }
            }
        }
        if (this.areas) {
            for (let i = 0; i < this.areas.length; i++) {
                this.areas[i].action.image = this.getNetworkIcon(this.areas[i].action.network, true);
                this.areas[i].reaction.image = this.getNetworkIcon(this.areas[i].reaction.network, true);
            }
        }
        this.forceUpdate();
    }

    getNetworkIcon(name, connected) {
        switch (name) {
            case "Discord":
                return ((connected) ? require("../assets/networks/Discord_Full.png") : require("../assets/networks/Discord_Empty.png"));
            case "Twitch":
                return ((connected) ? require("../assets/networks/Twitch_Full.png") : require("../assets/networks/Twitch_Empty.png"));
            case "Facebook":
                return ((connected) ? require("../assets/networks/Facebook_Full.png") : require("../assets/networks/Facebook_Empty.png"));
            case "Spotify":
                return ((connected) ? require("../assets/networks/Spotify_Full.png") : require("../assets/networks/Spotify_Empty.png"));
            case "Youtube":
                return ((connected) ? require("../assets/networks/Youtube_Full.png") : require("../assets/networks/Youtube_Empty.png"));
            case "Office":
                return ((connected) ? require("../assets/networks/Office_Full.png") : require("../assets/networks/Office_Empty.png"));
            case "Imgur":
                return ((connected) ? require("../assets/networks/Imgur_Full.png") : require("../assets/networks/Imgur_Empty.png"));
            case "Yammer":
                return ((connected) ? require("../assets/networks/Yammer_Full.png") : require("../assets/networks/Yammer_Empty.png"));
            default:
                return null
        }
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
        }).catch((error) => {
            return [] 
        }));
    }

    async validateArea() {
        if (this.actionArgsResult) {
            for (let i = 0; i < this.actionArgsResult.length; i++) {
                if (this.actionArgsResult[i].length == 0)
                    return (alert("Veuillez rentrer des arguments valide pour l'action"));
            }
        }
        if (this.reactionArgsResult) {
            for (let i = 0; i < this.reactionArgsResult.length; i++) {
                if (this.reactionArgsResult[i].length == 0)
                    return (alert("Veuillez rentrer des arguments valide pour la reaction"));
            }
        }
        fetch('https://area-babyb.herokuapp.com/addArea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'area-babyb.herokuapp.com',
                'email': this.email
            },
            body: JSON.stringify({
                "action": {
                    "args": this.actionArgsResult,
                    "name": this.networks[this.state.actionService].actions[this.state.action].name,
                    "network": this.networks[this.state.actionService].actions[this.state.action].network,
                },
                "reaction": {
                    "args": this.reactionArgsResult,
                    "name": this.networks[this.state.reactionService].reactions[this.state.reaction].name,
                    "network": this.networks[this.state.reactionService].reactions[this.state.reaction].network,
                },
            })
        }).then(async (res) => {
            this.areas = await this.getAreas(this.email);
            this.actionArgsResult = []
            this.reactionArgsResult = []
            this.setState({actionService: undefined})
            this.setState({action: undefined})
            this.setState({reactionService: undefined})
            this.setState({reaction: undefined})
            alert("L'area a été ajoutée")
        })
    }

    deleteArea(index) {

    }

    closeArea = (index) => {
        Alert.alert(
            "Options",
            "Voulez vous supprimer l'area ?",
            [
                {text: 'Supprimer', onPress: () => this.deleteArea(index)},
                {text: 'Annuler', onPress: () => {}}
            ],
            {cancelable: true},
        );
    }

    getMethod = async (email, method) => {
        return (await fetch('https://area-babyb.herokuapp.com/' + method, {
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
        }).catch((error) => {
            return [] 
        }));
    }

    async selectAction(value) {
        if (value != undefined) {
            this.actionArgsResult = [];
            if (this.networks[this.state.actionService].actions[value].args) {
                for (let i = 0; i < this.networks[this.state.actionService].actions[value].args.length; i++) {
                    if (this.networks[this.state.actionService].actions[value].args[i].type == "list") {
                        this.networks[this.state.actionService].actions[value].args[i].stock = await this.getMethod(this.email, this.networks[this.state.actionService].actions[value].args[i].method);
                    }
                    this.actionArgsResult.push("");
                }
            }
        }
        this.setState({action: value});
    }

    async selectReaction(value) {
        if (value != undefined) {
            this.reactionArgsResult = [];
            if (this.networks[this.state.reactionService].reactions[value].args) {
                for (let i = 0; i < this.networks[this.state.reactionService].reactions[value].args.length; i++) {
                    if (this.networks[this.state.reactionService].reactions[value].args[i].type == "list") {
                        this.networks[this.state.reactionService].reactions[value].args[i].stock = await this.getMethod(this.email, this.networks[this.state.reactionService].reactions[value].args[i].method);
                    }
                    this.reactionArgsResult.push("");
                }
            }
        }
        this.setState({reaction: value});
    }

    selectService(value, type) {
        if (type) {
            this.setState({actionService: value})
            this.setState({action: undefined})
            this.actions = [];
            if (value != undefined) {
                for (let i = 0; i < this.networks[value].actions.length; i++) {
                    this.actions.push({"label": this.networks[value].actions[i].name, "value": i});
                }
            }
        } else {
            this.setState({reactionService: value})
            this.setState({reaction: undefined})
            this.reactions = [];
            if (value != undefined) {
                for (let i = 0; i < this.networks[value].reactions.length; i++) {
                    this.reactions.push({"label": this.networks[value].reactions[i].name, "value": i});
                }
            }
        }
    }

    getPlaceHolder(name) {
        return {label: name, value: null, color: COLORS.secondGray}
    }

    refreshServices(network) {
        for (let i = 0; this.networks && i < this.networks.length; i++) {
            if (this.networks[i].name == network) {
                this.networks[i].connected = true;
                this.networks[i].image = this.getNetworkIcon(network, true);
            }
        }
        this.forceUpdate();
    }

    networkConnect(name) {
        this.props.navigation.navigate("Auth", {"network": name, "email": this.email, onGoBack: this.refreshServices.bind(this)});
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.statusBarContainer}/>
                <View style={styles.topScrollContainer}>
                    <ScrollView style={styles.topScroll} horizontal={true} showsVerticalScrollIndicator={false}>
                        {this.networks.map((network, i) => (network.image) ? (
                        <TouchableOpacity style={styles.imageContainer} key={i} onPress={() => this.networkConnect(network.name)}>
                            <Image style={[styles.networkImage, {opacity: (network.connected ? 1 : 0.4)}]} source={network.image}/>
                        </TouchableOpacity>
                        ) : (null))}
                    </ScrollView>
                </View>
                <View style={styles.commandContainer}>
                    <Text style={styles.commandTitle}>Configurer un Area</Text>
                    <View style={styles.pickAreaContainer}>
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={this.getPlaceHolder("Service..")}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => this.selectService(value, true)}
                            value={this.state.actionService}
                            items={this.actionServices}
                            key={1}
                        />
                        <Text>------</Text>
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={this.getPlaceHolder("Service..")}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) => this.selectService(value, false)}
                            value={this.state.reactionService}
                            items={this.reactionServices}
                            key={2}
                        />
                    </View>
                    {(this.state.actionService != undefined && this.state.reactionService != undefined) ? (
                    <View>
                        <View style={styles.pickAreaContainer}>
                            <RNPickerSelect style={pickerSelectStyles}
                                placeholder={this.getPlaceHolder("Action..")}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.selectAction(value)}
                                value={this.state.action}
                                items={this.actions}
                                key={1}
                            />
                            <Text>------</Text>
                            <RNPickerSelect style={pickerSelectStyles}
                                placeholder={this.getPlaceHolder("Reaction..")}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.selectReaction(value)}
                                value={this.state.reaction}
                                items={this.reactions}
                                key={2}
                            />
                        </View>
                        {(this.actionArgsResult.length > 0 || this.reactionArgsResult.length > 0) ? (
                        <View style={[styles.pickAreaContainer, {marginTop: 10}]}>
                            <View style={styles.pickArgsContainer}>
                                {(this.state.action != undefined && this.networks[this.state.actionService].actions[this.state.action].args) ? (this.networks[this.state.actionService].actions[this.state.action].args.map((arg, i) => (arg.type == "list" ? (
                                    <View style={{marginTop: 10}} key={i}>
                                        <RNPickerSelect style={pickerSelectStyles}
                                            placeholder={this.getPlaceHolder(arg.placeholder)}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={(value) => this.reactionArgsResult[i] = value}
                                            items={arg.stock}
                                            key={i}
                                            />
                                    </View>
                                ) : (
                                    <TextInput style={[styles.inputZone, {marginTop: 10}]} placeholder={arg.placeholder} onChangeText={(text) => this.reactionArgsResult[i] = text} key={i}/>
                                    )))) : (null)}
                            </View>
                            <Text>------</Text>
                            <View style={styles.pickArgsContainer}>
                                {(this.state.reaction != undefined && this.networks[this.state.reactionService].reactions[this.state.reaction].args) ? (this.networks[this.state.reactionService].reactions[this.state.reaction].args.map((arg, i) => (arg.type == "list" ? (
                                    <View style={{marginTop: 10}} key={i}>
                                        <RNPickerSelect style={pickerSelectStyles}
                                            placeholder={this.getPlaceHolder(arg.placeholder)}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={(value) => this.reactionArgsResult[i] = value}
                                            items={arg.stock}
                                            key={i}
                                            />
                                    </View>
                                ) : (
                                    <TextInput style={[styles.inputZone, {marginTop: 10}]} placeholder={arg.placeholder} onChangeText={(text) => this.reactionArgsResult[i] = text} key={i}/>
                                    )))) : (null)}
                            </View>
                        </View>
                    ) : (null)}
                    </View>
                    ) : (null)}
                    <TouchableOpacity style={styles.button} onPress={() => this.validateArea()}>
                        <Text style={styles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{backgroundColor: 'white'}}>
                    {this.areas.map((area, i) => (
                        <View style={styles.areaContainer} key={i}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => this.closeArea(i)}>
                                <Image style={{width: 16, height: 16}} source={require("../assets/icon_close.png")}/>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{width: screenWidth / 4, textAlign: 'center'}}>{area.action.name}</Text>
                                <View style={styles.areaImageContainer}>
                                    <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={area.action.image}/>
                                </View>
                            </View>
                            <Text style={{marginTop: 20, marginBottom: 20}}>------</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={styles.areaImageContainer}>
                                    <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={area.reaction.image}/>
                                </View>
                                <Text style={{width: screenWidth / 4, textAlign: 'center'}}>{area.reaction.name}</Text>
                            </View>
                        </View>
                    ))}
                    <View></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBarContainer: {
        width: screenWidth,
        height: StatusBar.currentHeight,
        backgroundColor: COLORS.secondBlue
    },
    topScrollContainer: {
        width: screenWidth,
        backgroundColor: 'white',
        height: 60,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    topScroll: {
        flex: 1,
    },
    imageContainer: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    networkImage: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    commandContainer: {
        width: screenWidth,
        backgroundColor: COLORS.thirdGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1
    },
    areaContainer: {
        alignSelf: 'center',
        width: screenWidth / 1.2,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
        borderColor: COLORS.mainBlue,
        backgroundColor: COLORS.secondBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    areaImageContainer: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commandTitle: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: '600',
    },
    pickAreaContainer: {
        width: screenWidth,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    pickArgsContainer: {
        width: screenWidth / 2.5,
        flexDirection: 'column'
    },
    inputZone: {
        width: screenWidth / 2.5,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.secondBlue,
        borderRadius: 15,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    button: {
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: COLORS.mainBlue,
        borderColor: COLORS.mainBlue
    },
    closeButton: {
        position: 'absolute',
        top: 2,
        right: 4
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
        marginRight: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      width: screenWidth / 2.5,
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderColor: COLORS.secondBlue,
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      paddingLeft: 5,
      paddingRight: 5, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      width: screenWidth / 2.5,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: COLORS.secondBlue,
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      paddingLeft: 5,
      paddingRight: 5, // to ensure the text is never behind the icon
    },
});

export default MainPage
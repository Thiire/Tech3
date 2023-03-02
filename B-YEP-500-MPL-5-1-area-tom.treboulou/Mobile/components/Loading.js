import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { COLORS } from './color/Color';

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('screen').height)

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return(
            <View style={styles.container}>
                <Image style={styles.mainImage} source={require('../assets/Logo_Full_Ombre.png')}/>
                <View>
                    <ActivityIndicator size="large" color={COLORS.mainBlue}/>
                    <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold', fontSize: 18}}>Chargement...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.secondBlue,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
    mainImage: {
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
        resizeMode: 'contain',
    }
});

export default Loading
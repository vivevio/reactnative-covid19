import React, {useEffect, useState} from "react";
import { 
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    ActivityIndicator
} from "react-native";
import DeviceInfo from 'react-native-device-info';

import { Colors, Fonts } from '../Theme'


const Waiting = ({dataLoaded}) => {

    const [ animationHandler ] = useState(new Animated.Value(0))

    const animation = {
        opacity: animationHandler.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
        transform: [{
            translateY: animationHandler.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -100]
            })
        }]
    }

    useEffect(() => {
        if( dataLoaded ) {
            Animated.timing(animationHandler, {
                toValue: 1,
                duration: 300,
                easing: Easing.inOut(Easing.quad)
            }).start()
        }
    });



    return (
        <Animated.View style={[styles.container, animation]}>
            <View style={styles.top}>
                <Text style={Fonts.logo}>Covid-19</Text>
                <Text style={[Fonts.normal, {color: Colors.white, marginBottom: 13}]}>loading data</Text>
                <ActivityIndicator size="small" color={Colors.white} />
            </View>

            <Text style={[styles.version]}>Version {DeviceInfo.getVersion()}</Text>
        </Animated.View>
    )
}
export default Waiting;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    top: {
        alignItems: 'center',
        marginBottom: 180
    },
    version: {
        ...Fonts.normal,
        color: Colors.white,
        fontSize: 12,
        marginBottom: 30
    }
});
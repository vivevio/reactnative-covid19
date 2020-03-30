import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { Colors, Fonts } from '../Theme'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Card = ({text, icon, color}) => (
    <View style={[styles.card, {backgroundColor:Colors[color]}]}>
        <View style={styles.card_icon}>
            <MaterialIcon name={ icon } size={18} color={Colors.white} />
        </View>
        <Text style={[{color: Colors.white}, Fonts.h2]}>{text}</Text>
    </View>
    )
export default Card;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        width: 140,
        borderRadius: 11,
        height: 163,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginRight: 10
    },
    card_icon: {
        alignSelf: 'flex-start',
        width: 36,
        height: 36,
        backgroundColor: 'rgba(255,255,255,.15)',
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
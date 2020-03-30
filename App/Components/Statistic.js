import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { Colors, Fonts, Metrics } from '../Theme'

const Statistic = ({title, value, separator}) => (
    <View style={styles.container}>
        <View style={[ styles.statistic_card ]}>
            <Text style={[Fonts.small, {color: Colors.primary_lighter}]}>{title}</Text>
            <Text style={[Fonts.small, {color: Colors.primary_lighter, marginBottom: Metrics.margin_bottom_small}]}>(total)</Text>
            <Text style={[Fonts.h1, {color: Colors.white}]}>{value}</Text>
        </View>
        { separator ? <View style={styles.card_separator} /> : null  }
    </View>
    )
export default Statistic;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    card_separator: {
        width: 1,
        height: 34,
        backgroundColor: Colors.primary_darker,
        alignSelf: 'center',
        marginHorizontal: Metrics.device_width > 454 ? 50 : 25
    },
});
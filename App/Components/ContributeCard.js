import React from "react";
import { 
    View,
    Image,
    Linking,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const ContributeCard = ({image, link}) => { 

    const openLink = async () => {
        await Linking.openURL(link);
    }

    return(
        <TouchableOpacity onPress={openLink}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: image }}/>
            </View>
        </TouchableOpacity>
    )
}
export default ContributeCard;

const styles = StyleSheet.create({
    card: {
        marginRight: 5
    },
    image: {
        resizeMode: 'contain',
        width: 165,
        height: 89,
        borderRadius: 5
    }
});
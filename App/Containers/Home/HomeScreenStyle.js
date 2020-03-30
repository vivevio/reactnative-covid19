import { 
    StyleSheet,
} from 'react-native'

import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Colors.primary
    },
    page_wrapper: {
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
    },
    main_background: {
        position: 'absolute',
        width: Metrics.device_width,
        height: Metrics.device_height,
        resizeMode: 'cover',
        // transform: [
        //     {scale: 1}
        // ]
        
    },
    background_overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#071D28',
        // opacity: 0
        opacity: 0.55,
    },
    card_wrapper: {
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        padding: 29 
    },
    card_top: {
        // marginTop: (Metrics.device_height - 350),
        // bottom: -40
    },
    location_wrapper: {
        marginBottom: Metrics.margin_bottom,
    },
    button_refresh: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10
    },
    statistic_wrapper: {
        flexDirection: 'row',
    },
    card_separator: {
        width: 1,
        height: 34,
        backgroundColor: Colors.primary_darker,
        alignSelf: 'center',
        marginHorizontal: 25
    },
    card_bottom: {
        width: '100%',
    },
    bottom_background: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: Colors.white,
        zIndex: -1
    }
})
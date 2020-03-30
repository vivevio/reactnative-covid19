import React, { Component } from "react";
import { 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    UIManager,
    findNodeHandle,
    ToastAndroid
} from "react-native";

import { PanGestureHandler, State, FlatList } from 'react-native-gesture-handler'
import IonIcon from 'react-native-vector-icons/Ionicons'
import BootSplash from "react-native-bootsplash";

import { Images } from '../../Theme'
import styles from './HomeScreenStyle'

import { Metrics, Colors, Fonts } from '../../Theme'
import Card from '../../Components/Card'
import ContributeCard from '../../Components/ContributeCard'
import Statistic from '../../Components/Statistic'
import Waiting from '../../Components/Waiting'

import { statisticService } from '../../Services/StatisticServices' 
import { getContributes, getStepAdvices } from '../../Services/Firebase' 

import { Helper } from '../../Services/Helper' 

class HomeScreen extends Component {
    
    constructor(props) {
        super()
        
        this.initital_card_view = 0
        this.page_wrapper_height = 0;

        this.state = {
            statistic: [],
            contributes: [],
            advices: [],
            date: `${Helper.getMonthName()}, ${Helper.getDate()}`,
            initital_card_view: this.initital_card_view,
            position_after_slide: this.initital_card_view,
            image_position: 0,
            position_y: new Animated.Value(Metrics.device_height),
            animation_image_scale: new Animated.Value(0),
            animation_image_translate: new Animated.Value(0),
            card_state: 'initial_view', // [ inital_view || full_view ]
            data_loaded: false
        }

        this._onPanGestureEvent = Animated.event(
            [{
                nativeEvent: { 
                    translationY: this.translateY
                }
            }],
            { 
                useNativeDriver: true
            });
        
    }

    componentDidMount() {

        BootSplash.hide({duration:500});

        Promise.all( [getContributes(), statisticService.fetchStatistic(), getStepAdvices()] ).then( (res) =>  {
            this.setState({
                contributes: res[0],
                statistic: statisticService.generateData(res[1]),
                advices: res[2],
                data_loaded: true
            }, ()=>{
                this.runInitiateAnimation()
            })
        }).catch(err => console.log('promise error', err));
    }

    onRefreshData = () => {
        statisticService.fetchStatistic().then((res) => {
            this.setState({
                statistic: statisticService.generateData(res)
            })

            ToastAndroid.showWithGravity(
                "Data has been updated",
                ToastAndroid.SHORT,
                ToastAndroid.TOP)
        })
    }

    runInitiateAnimation() {
        UIManager.measure(findNodeHandle(this.view_master), () => {

            requestAnimationFrame(() => {
                this.initital_card_view = this.page_wrapper_height - 330

                Animated.parallel([
                    Animated.spring( this.state.position_y, {
                        toValue: this.initital_card_view,
                        friction: 7,
                        tension: 50,
                    }),
                    Animated.spring( this.state.animation_image_scale, {
                        toValue: 0,
                        friction: 10,
                        tension: 50,
                        useNativeDriver: true
                    }),
                ]).start(() => {
                    this.setState({
                        position_after_slide: this.initital_card_view,
                        initital_card_view: this.initital_card_view
                    })
                })
                
            });
        })
    }

    animateToBackInitialView = () => {
        this.setState({
            card_state: 'initial_view',
            position_after_slide: this.initital_card_view,
        })

        Animated.parallel([
            Animated.spring( this.state.position_y, {
                toValue: this.initital_card_view,
                friction: 7,
                tension: 50,
            }),
            Animated.spring( this.state.animation_image_scale, {
                toValue: 0,
                friction: 10,
                tension: 50,
                useNativeDriver: true
            }),
        ]).start()
    }

    animateToFullView = () => {
        this.setState({
            card_state: 'full_view',
            position_after_slide: 0,
            image_position: -Metrics.device_half_height
        })

        Animated.parallel([
            Animated.spring( this.state.position_y, {
                toValue: 0,
                friction: 20,
                tension: 100,
            }),
            Animated.spring( this.state.animation_image_translate, {
                toValue: -Metrics.device_half_height,
                friction: 50,
                tension: 50,
                useNativeDriver: true
            }),
            Animated.spring( this.state.animation_image_scale, {
                toValue: 0,
                friction: 20,
                tension: 100,
                useNativeDriver: true
            }),
        ]).start()
    }

    animateFromFullViewToInitialView = () => {
        this.setState({
            card_state: 'initial_view',
            position_after_slide: this.initital_card_view,
            image_position: 0
        })

        Animated.parallel([
            Animated.spring( this.state.position_y, {
                toValue: this.initital_card_view,
                friction: 7,
                tension: 50,
            }),
            Animated.spring( this.state.animation_image_translate, {
                toValue: 0,
                friction: 29,
                tension: 50,
                useNativeDriver: true,
                useNativeDriver: true
            }),
            Animated.spring( this.state.animation_image_scale, {
                toValue: 0,
                friction: 20,
                tension: 100,
                useNativeDriver: true
            }),
        ]).start()
    }

    handleGesture = evt => {
        const { nativeEvent : {translationY} } = evt

        var page_translate_pos = this.state.position_after_slide + translationY
        var image_translate_pos = this.state.image_position + translationY

        if( this.state.card_state == 'initial_view' && translationY > -(Metrics.device_half_height-130) ) {
            this.state.position_y.setValue(page_translate_pos)
        }

        if( this.state.card_state == 'full_view' && translationY > 0 ) {
            this.state.position_y.setValue(page_translate_pos)
        }

        if( this.state.card_state != 'full_view' && translationY > 0 && translationY < Metrics.device_half_height  ) {
            this.state.animation_image_scale.setValue(translationY)
        }

        if( this.state.card_state != 'full_view' && translationY < 0 ) {
            this.state.animation_image_translate.setValue(translationY)
        }

        if( this.state.card_state == 'full_view' && translationY > 0 ) {
            this.state.animation_image_scale.setValue(translationY)
            this.state.animation_image_translate.setValue(image_translate_pos)
        }

    } 

    onHandlerStateChange = ({nativeEvent}) => {
        
        if( nativeEvent.oldState == State.ACTIVE ) {

            if( nativeEvent.velocityY > -500 && nativeEvent.translationY > 0 && this.state.card_state == 'initial_view' ) {
                this.animateToBackInitialView()
            } else {
                this.animateToFullView()   
            }

            if( nativeEvent.velocityY > 500 && nativeEvent.translationY > 0 && this.state.card_state == 'full_view' ) {
                this.animateFromFullViewToInitialView()
            } 
        }

    }

    render() {
        const animation_translate_y = {
            transform: [
                { translateY: this.state.position_y }
            ]
        }

        const image_animation =  {
            transform: [
                { 
                    scale: this.state.animation_image_scale.interpolate({
                        inputRange: [0, Metrics.device_height],
                        outputRange: [1,1.5]
                    })
                },
                {
                    translateY: this.state.animation_image_translate.interpolate({
                        inputRange: [0, Metrics.device_half_height],
                        outputRange: [0, 200]
                    })
                }
            ]
        }

        return (
            <SafeAreaView style={styles.container}>
                <Animated.Image source={Images.background} style={[styles.main_background, image_animation]} />
                <View style={styles.background_overlay} />

                <Waiting dataLoaded={this.state.data_loaded} />
                
                <PanGestureHandler onGestureEvent={this.handleGesture} onHandlerStateChange={this.onHandlerStateChange}>
                    <Animated.View
                        onLayout={({nativeEvent}) => {
                            this.page_wrapper_height = Math.round(nativeEvent.layout.height)
                        }} 
                        ref={ ref => this.view_master = ref }
                        style={[{...animation_translate_y}, styles.page_wrapper]}>
                        <Animated.View 
                            ref={ref => this.card_top = ref} 
                            style={[styles.card_wrapper, styles.card_top]}>
                            <View style={styles.location_wrapper}>
                                <Text style={[Fonts.normal, {color: Colors.primary_lighter}]}>location</Text>
                                <Text style={[Fonts.h1, {color: Colors.white}]}>Indonesia</Text>
                                <Text style={[Fonts.small, {color: Colors.primary_lighter}]}>{this.state.date}</Text>
                            </View>
                            <TouchableOpacity style={styles.button_refresh} onPress={this.onRefreshData}>
                                <IonIcon {...Metrics.hit_area} name="md-refresh-circle" size={30} color="#FFFFFFCC"/>
                            </TouchableOpacity>

                            <View style={styles.statistic_wrapper}>
                                {
                                    this.state.statistic.map((item, index) => <Statistic key={`statistic-${index}`} {...item} separator={ index < (this.state.statistic.length - 1) ? true :false } />)
                                }
                            </View>

                        </Animated.View>


                        <Animated.View
                            ref={ref => this.card_bottom = ref} 
                            style={[styles.card_wrapper, styles.no_padding_right, styles.card_bottom, { backgroundColor: Colors.white, }]}>
                            <Text style={[Fonts.normal, {color: Colors.black, marginBottom: Metrics.margin_bottom_medium, marginLeft: 8}]}>Remember to:</Text>

                            <View style={{flexDirection:'row', marginBottom: Metrics.margin_bottom}}>
                                <FlatList
                                    data={this.state.advices}
                                    renderItem={({ item }) => <Card key={`card2-${item.id}`} text={item.text} icon={item.icon} color={item.color} /> }
                                    keyExtractor={item => `card-${item.id}`}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <Text style={[Fonts.normal, {color: Colors.black, marginBottom: Metrics.margin_bottom_medium, marginLeft: 8}]}>Contribute(KitaBisa.com):</Text>
                            <View style={{flexDirection:'row', marginBottom: Metrics.margin_bottom}}>
                                <FlatList
                                    data={this.state.contributes}
                                    renderItem={({ item }) => <ContributeCard image={item.image_url} link={item.link} /> }
                                    keyExtractor={item => `contribute-${item.id}`}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>

            </SafeAreaView>
        );
    }
}
export default HomeScreen;
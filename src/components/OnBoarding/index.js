import { Animated, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { FlatList, View, VStack } from 'native-base'
import OnBoardingItem from './OnBoardingItem'
import { useNavigation } from '@react-navigation/native'
import arrow from "../../assets/img/right-arrow.png"
import colors from '../../constants/colours'

import { LOGIN } from '../../constants/screens'
import Paginator from './Paginator'
import imageFake from "../../assets/img/eneo.png"


const data = [
    {
        id: "s85dd4s54ds5d4",
        title: "titre1",
        description: "je suis la description",
        image: imageFake
    },
    {
        id: "s85d4s54dmdds5d4",
        title: "titre1",
        description: "je suis la description",
        image: imageFake
    },
    {
        id: "s85d4s5kqsj4ds5d4",
        title: "titre1",
        description: "je suis la description",
        image: imageFake
    },
]

export default function OnBoarding2() {
    const navigation = useNavigation()
    const [currentIndex, setCurrentIndex] = useState()
    const { width, height } = useWindowDimensions()
    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef(null)
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentIndex(currentIndex);
    };
    return (
        <View flex={1} backgroundColor={colors.primary} >
            <VStack>
                <View style={{ paddingLeft: 15, paddingTop: 20, }}>
                    <Text style={styles.greetfr}>Welcome,</Text>
                    <Text style={styles.greetEn}>Bienvenu</Text>
                </View>
                <View>
                    <FlatList
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        viewabilityConfig={viewConfig}
                        keyExtractor={item => item.id}
                        pagingEnabled
                        bounces={true}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        ref={slidesRef}
                        renderItem={(item) => <OnBoardingItem item={item} scrollX={scrollX} />}
                    />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Paginator data={data} scrollX={scrollX} />
                </View>
                <View style={styles.fourth}>
                    {currentIndex === 2 ? <View style={styles.fourthChild}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(LOGIN)}
                            style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: colors.primary, fontSize: 20 }}>Commencez</Text>
                            <Image source={arrow} style={{ width: 20, height: 20, marginLeft: 15, marginTop: 5 }} />
                        </TouchableOpacity>
                    </View> : <View style={{ ...styles.fourthChild, backgroundColor: null, borderColor: null }}></View>}
                </View>
            </VStack >
        </View >
    )
}

const styles = StyleSheet.create({
    greetfr: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.yellow,
    },
    greetEn: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "white",
    },
    fourth: {
        alignItems: "center",
        justifyContent: "center"
    },
    fourthChild: {
        borderColor: "white",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%",
        borderRadius: 10,
        fontSize: 24,
        backgroundColor: "white"
    },
})
import { Animated, StyleSheet, Text, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Center, FlatList, View, VStack } from 'native-base'
import OnBoardingItem from './OnBoardingItem'
import { useNavigation } from '@react-navigation/native'
import colors from '../../constants/colours'
import Paginator from './Paginator'
import imageFake from "../../assets/img/eneo.png"
import { CustomeFab } from '../../screens/MonProfile/index2'


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
    const { width } = useWindowDimensions()
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
            {currentIndex === 2 ? <CustomeFab navigation={navigation} onBoarding={true} editeMode={false} action={() => {
                console.log("cool")
            }} /> : <View></View>}
            <VStack>
                <VStack justifyContent={'center'} style={{ paddingLeft: 15, paddingTop: 20, }}>
                    <Text style={styles.greetfr}>Welcome</Text>
                    <Text style={styles.greetEn}>Bienvenue</Text>
                </VStack>
                <View>
                    <FlatList
                        overScrollMode='never'
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
                        renderItem={(item) => <OnBoardingItem key={item.id} scrollX={scrollX} />}
                    />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Paginator data={data} scrollX={scrollX} />
                </View>
                {/* <View style={styles.fourth}>
                    {currentIndex === 2 ?
                        <View style={styles.fourthChild}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(LOGIN)}
                                style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: colors.primary, fontSize: 20 }}>Commencez</Text>
                                <Image source={arrow} style={{ width: 20, height: 20, marginLeft: 15, marginTop: 5 }} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ ...styles.fourthChild, backgroundColor: null, borderColor: null }}></View>}
                </View> */}
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
        justifyContent: "center",
        marginTop: 15
    },
    fourthChild: {
        borderColor: "white",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: "90%",
        borderRadius: 10,
        fontSize: 24,
        backgroundColor: "white",
    },
})
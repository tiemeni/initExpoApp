import * as React from "react";
import { Dimensions, Text, View, Pressable, Image } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

import colors from "../../constants/colours";
import { VStack } from "native-base";
import styles from "./styles";

function CarouselPub() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const width = Dimensions.get("window").width;

  // Votre tableau d'astuces de santé

  const healthTips = [
    {
      title: 'Hydratation',
      image: require('../../assets/img/pub1.jpg'),
    },
    {
      title: 'Alimentation équilibrée',
      image: require('../../assets/img/Pub2.jpg'),
    },
    {
      title: 'Activité physique',
      image: require('../../assets/img/pub3.jpg'),
    },
  ];
  
  

  return (
    <View
      style={{
        flex: 1,
        marginTop: 12,
        borderRadius: 10,
        borderWidth: 0,
        opacity: 0.45,
        backgroundColor: colors.primary,
        marginBottom: 20,
      }}
    >
      <Carousel
        pagingEnabled={true}
        mode="parallax"
        autoPlayInterval={2}
        loop
        width={width}
        height={160}
        autoPlay={true}
        data={healthTips}
        scrollAnimationDuration={4000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <VStack
            style={{
              flex: 1,
              borderWidth: 0,
              width: "100%",
              justifyContent:'center',
              padding:10,
            }}
          >
            <Text style={{fontWeight:'600', fontSize: 20, color: "white" , padding:3, marginRight:5}}>
              {item.title}
            </Text>
            <Image resizeMode="cover"  source={item.image} style={{ width:250, height: 150, marginBottom: 10 }} />
          </VStack>
        )}
        panGestureHandlerProps={
          {
            activeOffsetX: [-10, 10],
          }
        }
      />
    </View>
  );
}

export default CarouselPub;

import { StyleSheet } from "react-native";

import colors from "../../constants/colours";

const styles = StyleSheet.create({
  contenair: {
    flex: 1,
    flexDirection: "column",
    borderColor: "red",
    height: "100%",
    paddingHorizontal:30,
    backgroundColor: colors.primary,
  },

  box1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  box2: {
    alignItems: "center",
    marginTop: "15%",
    marginBottom:40
  },
  texte1: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
  },
  texte2: {
    fontSize: 14,
    textAlign: "center",
    color: colors.white,
  },

  texte3: {
    fontSize: 14,
    color: colors.white,
  },

  box3: {
    width:'100%',
    alignItems: "center",
    justifyContent:'space-between',
    alignContent:'space-between'
  },
});

export default styles;

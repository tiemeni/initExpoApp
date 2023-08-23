import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

export const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: "column",
    backgroundColor: "white",
    flex: 1,
    // height: 720
  },

  viewStyle: {
    height: 120,
    borderColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },

  iconCam:{
    marginLeft:-18,
    marginTop:70, 
    width:20,
    height:20,
    borderRadius:50,
    borderColor: colors.text_grey_hint,
    backgroundColor:colors.desable,
    justifyContent:'center',
    alignItems: 'center'
  },

  viewStyle2: {
    backgroundColor: "rgba(240, 240, 240, 0.69)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "90%",
    borderRadius: 10,
    paddingLeft: 10,
  },

  box1: {
    width: "100%",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textLabel: { marginBottom: 5, fontSize: 14, color: "#626262" },

  textInput: {
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 10,
    height: 40,
    fontSize: 15,
  },
  textCoord: {
    lineHeight: 19.36,
    fontSize: 17,
    fontWeight: "bold",
  },

  boxCoord: {
    backgroundColor: "rgba(240, 240, 240, 0.69)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: "100%",
    borderRadius: 10,
    paddingLeft: 10,
  },
  boxRadio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "40%",
    height: 45,
    padding: 5,
    borderRadius: 10,
    borderColor: "#F0F0F0",
  },
  viewStyle3: {
    width: "100%",
    marginBottom: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 60,
    height: 60,
  },
  title: {
    width: 20,
    height: 20,
  },
  child1: {
    // flex: 2
    height: 150,
  },
  child2of1: {
    height: 100,
    backgroundColor: colors.bg_grey,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  child2: {
    flex: 4.5,
    display: "flex",
    justifyContent: "center",
  },
  child3: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  child4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    height: 92,
    width: 92,
  },
});

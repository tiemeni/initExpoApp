import { StyleSheet } from "react-native";
import colors from "../../../constants/colours";

const styles = StyleSheet.create({
  inputConex: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 30,
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "#F5FAFF",
    backgroundColor: "#F5FAFF",
  },

  datePick: {
    backgroundColor: colors.desable,
    alignItems: "center",
    height: 45,
  },

  boxDatePick: {
    height: 30,
    width: 30,
    backgroundColor: colors.desable,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  inputConexJust: {
    marginTop: 10,
    borderRadius: 30,
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "#7C7C7C",
    backgroundColor: "#F5FAFF",
    justifyContent: "center",
  },

  submitBtnText: {
    width: "100%",
    borderRadius: 50,
    color: colors.secondaryColor,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
  },

  contenair: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentForm: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default styles;

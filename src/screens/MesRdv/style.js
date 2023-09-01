import { StyleSheet } from 'react-native';
import colors from '../../constants/colours';
const styles = StyleSheet.create({

  connectWith: {
    color: "#858585"
  },

  boxIcon: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    paddingLeft: 8,
    paddingTop: 8,
    backgroundColor: 'white'

  },

  boxGoogle: {
    justifyContent: 'center',
    width: 28,
    height: 28,
    paddingLeft: 0,
    paddingTop: 0,
    backgroundColor: colors.primary

  },
  noRDV: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: {
    color: colors.text_grey_hint,
    fontSize: 16,
    marginTop: 10
  },

  flatList: {
    marginHorizontal: 15
  },

  filterBtn: {
    paddingVertical: 15,
    width: '50%',
    borderColor: "#c2c2c2"
  },

  btnLeftItem: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0
  },
  
  btnRightItem: {
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  sortBtn: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: "#c2c2c2",
  },
});


export default styles;

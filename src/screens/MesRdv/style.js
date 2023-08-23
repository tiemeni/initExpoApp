import { Center } from 'native-base';
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
  }
});


export default styles;

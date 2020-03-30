/**
 * This file contains metric values that are global to the application.
 */


import { 
    Dimensions
} from 'react-native'

const { width:_DEVICE_WIDTH, height: _DEVICE_HEIGHT } = Dimensions.get('window');

export default {
  device_width: _DEVICE_WIDTH,
  device_height: _DEVICE_HEIGHT,
  device_half_height: _DEVICE_HEIGHT / 2,
  margin_bottom: 30,
  margin_bottom_small: 10,
  margin_bottom_medium: 20,
  hit_area: {
    hitSlop: {
      top: 10, left: 10, bottom: 10, right: 10
    }
  }
}

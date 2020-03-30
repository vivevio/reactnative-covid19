import { StyleSheet } from 'react-native'

const size = {
  h1: 24,
  h2: 16,
  regular: 14,
  small: 12,
}

const family = {
  primary: 'Product Sans Bold',
  text: 'Roboto Medium'
}

export default StyleSheet.create({
  h1: {
    fontFamily: family.primary,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: family.text,
    fontSize: size.h2,
  },
  small: {
    fontFamily: family.text,
    fontSize: size.small,
  },
  normal: {
    fontFamily: family.text,
    fontSize: size.regular,
  },
  logo: {
    fontFamily: family.primary,
    fontSize: 40,
    color: '#FFFFFF',
    letterSpacing: -3
  }
})

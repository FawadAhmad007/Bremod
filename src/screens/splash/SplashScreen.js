import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { SPLASH_IMAGE } from '../../assets'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { navigate } from '../../shared/services'
import { HOME_ENUM } from '../../shared/constants'

const SplashScreen = () => {
  const isFocused=useIsFocused()
    const myTheme=useTheme()
    React.useEffect(() => {
if(isFocused)
          setTimeout(() => {
       navigate(HOME_ENUM)
          }, 2000);
      }, [isFocused]);
  return (
    <>
    	<StatusBar
				barStyle={'dark-content' }
				backgroundColor={myTheme?.colors?.secondary}
			/>
   <Image
   style={{flex:1,width:'100%'}}
   source={SPLASH_IMAGE}
   resizeMode='cover'
   />
   </>
  )
}

export default SplashScreen
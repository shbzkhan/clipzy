import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'
import { useColorScheme } from 'nativewind'

interface Props extends TextInputProps{
    errors?:string | false
    className?:string

}
const CustomTextInput:FC<Props> = ({errors,...props}) => {
   const {colorScheme} = useColorScheme()
  return (
    <View>
    <TextInput
      activeOutlineColor={errors?"#F75555":'#2563EB'}
      outlineColor={errors?"#F75555":'#E4E4E7'}
      mode={'outlined'}
                textColor={colorScheme === "light"?"#000000":"#FFFFFF"}
      theme={{
          colors: {
            background: colorScheme === "dark"?"#0c263b":"#FFFFFF"
          }}}
      {...props}
      />
      {errors && <Text className='text-danger'>{errors}</Text>}
      </View>
  )
}

export default CustomTextInput
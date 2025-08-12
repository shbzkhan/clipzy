import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'

interface Props extends TextInputProps{
    errors?:string | false

}
const CustomTextInput:FC<Props> = ({errors,...props}) => {
   
  return (
    <View>
    <TextInput
      activeOutlineColor={errors?"#F75555":'#2563EB'}
      outlineColor={errors?"#F75555":'#E4E4E7'}
      mode={'outlined'}
      theme={{
          colors: {
            background: '#FFFFFF'
          }}}
      {...props}
      />
      {errors && <Text className='text-danger'>{errors}</Text>}
      </View>
  )
}

export default CustomTextInput
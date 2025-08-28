import { View, Text, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { StyleSheet } from 'react-native'
import Icon from '../../constants/Icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const DescriptionSheet = (props:SheetProps<"comment-sheet">) => {
  const [desc, setDesc] = useState<string>("")
  return (
    <ActionSheet 
    id={props.sheetId}
    headerAlwaysVisible={true}
    isModal={true}
    onClose={()=>SheetManager.hide(props.sheetId)}
    gestureEnabled={true}
    keyboardHandlerEnabled={true}
    indicatorStyle={styles.indicator}
    enableGesturesInScrollView={true}
    containerStyle={styles.container}
    >
      
    <SafeAreaView className='h-full'>
      
      <View className='flex-row justify-between px-4 border-b border-gray-500 py-4'>
        <Text className='text-white font-rubik-bold text-xl'>
            Description
        </Text>
        <TouchableOpacity
        onPress={()=>SheetManager.hide(props.sheetId)}
        >
          <Icon name="X" color='white'/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerClassName='px-4 gap-3'>
        <View className='my-6 gap-5'>
            <Text className='text-white font-rubik-bold text-2xl'>This is name of this area so that provide a simple name of this area of cercle</Text>
            <View className='flex-row justify-around'>
                <View className='items-center'>
                    <Text className='text-white font-rubik-bold text-xl'>320</Text>
                    <Text className=' font-rubik text-sm text-gray-400'>Likes</Text>
                </View>
                <View className='items-center'>
                    <Text className='text-white font-rubik-bold text-xl'>8649</Text>
                    <Text className='font-rubik text-sm text-gray-400'>Views</Text>
                </View>
                <View className='items-center'>
                    <Text className='text-white font-rubik-bold text-xl'>3 Feb</Text>
                    <Text className='font-rubik text-sm text-gray-400'>2025</Text>
                </View>
            </View>
        </View>
        <View className='p-4 bg-dark-100 rounded-2xl'>
        <Text className='text-white font-rubik text-lg'>{desc}</Text>
        {/* <TextInput
        className='w-full bg-white'
        value={desc}
        multiline={true}
        onChangeText={(e)=>setDesc(e)}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  indicator:{
    height:4,
    width:45,
    top:4,
    backgroundColor:"#52525B"
  },
  container:{
    backgroundColor:"#0c263b",
    height: "76%"
  },

})

export default DescriptionSheet
import { View, Text, TouchableOpacity,} from 'react-native'
import React, { useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { StyleSheet } from 'react-native'
import Icon from '../../constants/Icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useColorScheme } from 'nativewind'

const PlaylistSheet = (props:SheetProps<"playlist-sheet">) => {
    const sheet_id = props.payload?.entityId
    console.log("id", sheet_id)
    const {colorScheme} = useColorScheme()
        const dispatch = useDispatch();
            
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
    containerStyle={{ backgroundColor: colorScheme === "light" ? "#FFFFFF" : "#071825" }}
    >
      
    <SafeAreaView>
        <Text>Hellow kaise ho aapsab badhiya honge i think</Text>
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
  

})

export default PlaylistSheet
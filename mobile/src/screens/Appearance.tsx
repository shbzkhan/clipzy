import { View, Text, TouchableOpacity, Switch} from 'react-native'
import AuthBox from '../components/AuthBox'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemeButton from '../components/ThemeButton'
import { RootState } from '../redux/store'
import CustomHeader from '../components/Header/CustomHeader'
import { useColorScheme } from 'nativewind'
import {setTheme } from '../redux/slice/themeSlice'


const AppearanceToggle = () => {
    const {colorScheme} = useColorScheme();
  
  const dispatch = useDispatch()
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Appearance'/>
      <Text className='font-rubik-bold text-xl my-4 dark:text-white'>Theme Switch</Text>
      <TouchableOpacity className='flex-row justify-between text-center bg-secondary p-3 rounded-md mb-4 dark:bg-dark-100'>
        <Text className='font-rubik-medium text-lg dark:text-white'>Dark Mode</Text>
        <Switch 
        value={colorScheme === "dark"}
        trackColor={{false: '#black', true: 'white'}}
        thumbColor={colorScheme === "dark" ? '#2563EB' : '#EBF5FF'}
        onValueChange={()=>dispatch(setTheme(colorScheme === "dark" ? "light" : "dark"))}

        />
      </TouchableOpacity>
      <Text className='font-rubik-bold text-xl my-4 dark:text-white'>Theme Setting</Text>
      <View className='gap-5 '>
          <ThemeButton
          title='Light'
          icon='Sun'
          themeName='light'
          handlePress={()=>dispatch(setTheme("light"))}
          />
          <ThemeButton
          title='Dark'
          icon='Moon'
          themeName='dark'
          handlePress={()=>dispatch(setTheme("dark"))}
          />
          <ThemeButton
          title='System'
          icon='MonitorCog'
          themeName='system'
          handlePress={()=>dispatch(setTheme("system"))}
          />
      </View>
    </SafeAreaView>
  )
}

export default AppearanceToggle
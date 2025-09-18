import { View, Text, ScrollView,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {settingData}  from '../utils/settingData'
import { navigate } from '../navigation/NavigationUtils';
import CustomIcon from '../components/CustomIcon';
import SettingsItem from '../components/SettingsItem';
import UserLogo from '../components/UserLogo';
import Icon from '../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import AuthBox from '../components/AuthBox';
import { clearUser } from '../redux/slice/userSlice';
import { RootState } from '../redux/store';


const Profile = () => {
const dispatch = useDispatch();
const user = useSelector((state:RootState)=>state.user.user)

const logout = async()=>{
dispatch(clearUser())
}

  if(!user) return <AuthBox name="Video Creation"/>
  return (
    <SafeAreaView className='h-full bg-white dark:bg-dark'>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 px-4'
      >
        <View className='flex flex-row justify-between items-center 2'>
          <Text className='text-2xl font-rubik-bold dark:text-white' >Profile</Text>

         <CustomIcon
          name="Search"
          handlePress={()=>navigate("SearchHistory")}
        />
        </View>

        <TouchableOpacity className='flex-row items-center gap-4 my-5'
        onPress={()=>navigate("UserDetail")}
        >
            <UserLogo
            uri={user.avatar}
            heightAndWidth={24}
            />
            
            <View className=''>
            <Text className='text-2xl font-rubik-bold dark:text-white' numberOfLines={1}>{user.fullname}</Text>
            <Text className='text-gray-600 dark:text-gray-300 text-sm'>@{user.username}</Text>
          </View>
        </TouchableOpacity>

        <View className='flex flex-col mt-5'>
          <SettingsItem
            icon={"UserRoundPen"}
            onPress={()=>navigate("UserDetail")}
            title='Edit Profile'
          />

          <SettingsItem
            icon={"SquarePlay"}
            onPress={()=>navigate("YourVideo")}
            title='Your Video'
          />
        </View>

        <View className='flex flex-col mt-5 border-t bt-5 border-primary-200 dark:broder-secondary'>
            {
              settingData.slice(2).map((item, index)=>(
                <SettingsItem
                key = {index}
                icon={item.icon}
                onPress={()=>navigate(item.href)}
                {...item}
                />
              )
            )}
            
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200 dark:border-secondary'>
          <TouchableOpacity className='bg-red-100/50 dark:bg-red-100/10 py-4 justify-center items-center flex-row gap-3 rounded-md border-2 border-danger'
          onPress={logout}
          >
            <Icon name='LogOut' color='red'/>
            <Text className='text-danger font-rubik-semibold text-lg'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
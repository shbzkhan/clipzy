import { View, Text, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {settingData}  from '../utils/settingData'
import { navigate } from '../navigation/NavigationUtils';
import CustomIcon from '../components/CustomIcon';
import SettingsItem from '../components/SettingsItem';
import UserLogo from '../components/UserLogo';


const Profile = () => {

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

        <TouchableOpacity className='flex-row items-center gap-4 my-5'>
            <UserLogo
            uri={"https://api.dicebear.com/9.x/initials/png?seed=Shahbaz Khan"}
            heightAndWidth={24}
            />
            
            <View className=''>
            <Text className='text-3xl font-rubik-bold dark:text-white'>Shahbaz Khan</Text>
            <Text className='text-gray-600 dark:text-gray-300'>@shbzkhan</Text>
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
          <SettingsItem
          icon={"Heart"}
          title='Logout'
          textStyle='text-danger'
          showArrow={false}
          // onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Subscriptions from '../screens/Subscriptions';
import { CircleUserRound, CreativeCommonsIcon, HomeIcon, UploadCloud, User } from 'lucide-react-native';
import Profile from '../screens/Profile';
import Post from '../screens/Post';
import { TabNavigatorParamList } from '../types';
import Icon from '../constants/Icons';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'nativewind';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();


const TabNavigator = () => {
  const { colorScheme} = useColorScheme();
  const user = useSelector((state:any)=>state.user.user)
  return (
     <Tab.Navigator
     screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:colorScheme === "dark" ? "white":"#2563EB",
      tabBarInactiveTintColor:colorScheme === "dark" ? "white":"#000000",
      tabBarStyle:{
        backgroundColor: colorScheme === "dark" ? "#0c263b":"white",
        
      }
     }}
     
     initialRouteName='Home'
     >
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarIcon:({focused, size})=>{
          return <Icon name='LayoutGrid' color={"#2563EB"} focused={focused} size={size} />
        },
        
      }}
      />
      <Tab.Screen name="Post" component={Post} 
      options={{
        tabBarIcon:({focused,size})=>{
          return <Icon name='MonitorUp' color={"#2563EB"} focused={focused} size={size} />
        }
      }}
      />
      <Tab.Screen name="Subscriptions" component={Subscriptions}
      options={{
        tabBarIcon:({focused, size})=>{
          return <Icon name='Play' color={"#2563EB"} focused={focused} size={size} />
          
        }
        
      }}
      />
      <Tab.Screen name="Profile" component={Profile}
      options={{
        tabBarIcon:({focused, size})=>{
          return ( 
          user?
          (
          <Image
          source={{uri:user.avatar}}
          className={`w-8 h-8 rounded-full ${focused && "border-2 border-primary-600"}`}
          resizeMode='cover'
          />
        )
        :<Icon name='CircleUser' color={"#2563EB"} focused={focused} size={size} />
        )
        },
        title:"You"
      }}
       />
    </Tab.Navigator>
  )
}

export default TabNavigator
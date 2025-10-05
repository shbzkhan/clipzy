import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Subscriptions from '../screens/Subscriptions';
import Profile from '../screens/Profile';
import { TabNavigatorParamList } from '../types';
import Icon from '../constants/Icons';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'nativewind';
import { navigate } from './NavigationUtils';
import { useEffect } from 'react';
import { useCurrentUserQuery } from '../redux/api/authApi';
import { userData } from '../redux/slice/userSlice';
import Search from '../screens/SearchHistory';
import GlobalLoader from '../components/GlobalLoader';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();


const TabNavigator = () => {
  const dispatch = useDispatch()
  const {data, isLoading:currentDataLoading} = useCurrentUserQuery()
  useEffect(()=>{
     if(currentDataLoading) return;
      if(data){
      const user = data.data.user
      console.log("user data splace screen", user)
    dispatch(userData(user))
    }
  },[data, dispatch])
  const { colorScheme} = useColorScheme();
  const user = useSelector((state:any)=>state.user.user)

  if(currentDataLoading){
    return <GlobalLoader/>
  }
  return (
     <Tab.Navigator
     screenOptions={({route})=>({
       headerShown:false,
      tabBarActiveTintColor:colorScheme === "dark" ? "white":"#2563EB",
      tabBarInactiveTintColor:colorScheme === "dark" ? "white":"#000000",
      tabBarStyle:{
        backgroundColor: colorScheme === "dark" ? "#071825":"white",
        
      }
     })}
     
     initialRouteName='Home'
     >
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarIcon:({focused, size})=>{
          return <Icon name='LayoutGrid' color={"#2563EB"} focused={focused} size={size} />
        },
        
      }}
      />
      <Tab.Screen name="Search" component={Search} 
      options={{
        tabBarIcon:({focused, size})=>{
          return <Icon name='Search' color={"#2563EB"} focused={focused} size={size} />
        },
        
      }}
      />
      <Tab.Screen name="Post" component={Home}
      listeners={{
        tabPress:e=>{
          e.preventDefault()
        }
      } }
      options={{
        tabBarIcon:({focused,size})=>{
          return (
          <TouchableOpacity onPress={()=>navigate("Posts")} activeOpacity={0.5}>
            <Icon name='MonitorUp' color={"#2563EB"} focused={focused} size={size} />
          </TouchableOpacity>
        )
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
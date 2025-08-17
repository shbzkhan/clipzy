import { View, Text, Button } from 'react-native'
import AuthBox from '../components/AuthBox'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../redux/slice/userSlice'

const Profile = () => {
  // const [user, setUser] = useState<boolean>(true)
  const dispatch = useDispatch()
  const user = useSelector((state:any)=>state.user.user)
  const handleLogout = ()=>{
  dispatch(clearUser())
  console.log(user)
  }

  if(!user || user == null) return <AuthBox name="Your Subscription"/>
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Logout ' onPress={handleLogout}/>
    </View>
  )
}

export default Profile
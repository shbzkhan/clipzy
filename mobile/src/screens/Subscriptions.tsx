import { View, Text } from 'react-native'
import AuthBox from '../components/AuthBox'
import { useSelector } from 'react-redux'

const Subscriptions = () => {
  const user = useSelector((state:any)=>state.user.user)

  if(!user || user == null) return <AuthBox name="Your Subscription"/>
  return (
    <View>
      <Text>Subscriptions</Text>
    </View>
  )
}

export default Subscriptions
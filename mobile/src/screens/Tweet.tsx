import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import TweetCard from '../components/TweetCard'

const Tweet = () => {
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
        <CustomHeader title='Your Tweets'/>
      <TweetCard/>
    </SafeAreaView>
  )
}

export default Tweet
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CustomIcon from '../components/CustomIcon';
import EmptyState from '../components/EmptyState';
import GlobalLoader from '../components/GlobalLoader';
import CustomHeader from '../components/Header/CustomHeader';
import TweetCard from '../components/Tweet/TweetCard';
import { useUserTweetQuery } from '../redux/api/tweetApi';
import { RootState } from '../redux/store';

const Tweet = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isCreateTweet, setIsCreateTweet] = useState(false);
  const { data, isLoading } = useUserTweetQuery({ userId: user?._id });

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <SafeAreaView className="flex-1 px-3 bg-white dark:bg-dark">
      <CustomHeader title="Your Tweets" />
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-8 pb-8"
        renderItem={({ item }) => <TweetCard item={item} />}
        ListHeaderComponent={
          <View className="gap-6">
            <TouchableOpacity
              className="flex-row items-center justify-between p-3 border-2 rounded-md border-secondary dark:border-dark-100"
              onPress={() => setIsCreateTweet(!isCreateTweet)}
            >
              <Text className="text-lg font-rubik dark:text-white">
                Create a new tweet
              </Text>
              <CustomIcon
                name={!isCreateTweet ? 'Pencil' : 'X'}
                disabled={true}
              />
            </TouchableOpacity>
            {isCreateTweet && (
              <TweetCard
                tweetCreator={true}
                setIsCreateTweet={setIsCreateTweet}
              />
            )}
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No Tweet Uploaded"
            description="please upload a tweet"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Tweet;

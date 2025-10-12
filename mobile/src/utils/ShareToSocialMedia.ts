import Share from 'react-native-share';
interface shareToShcialmedia {
    message?:string
    url_id:string
}
export const handleShareToSocialMedia = async ({message, url_id}:shareToShcialmedia) => {
    const shareOptions = {
      message,
      url: `https://clizpy.vercel.app/videos/${url_id}`,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error => ', error);
    }
  };
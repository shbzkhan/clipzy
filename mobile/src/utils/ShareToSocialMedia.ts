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
      console.log("dsjkdsf", shareOptions)
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };
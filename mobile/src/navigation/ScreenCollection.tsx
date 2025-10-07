import About from '../screens/About';
import AppearanceToggle from '../screens/Appearance';
import ChangePassword from '../screens/ChangePassword';
import Channel from '../screens/Channel';
import ForgetPassword from '../screens/ForgetPassword';
import LikesVideo from '../screens/LikesVideo';
import Login from '../screens/Login';
import Notification from '../screens/Notification';
import Playlist from '../screens/Playlist';
import PlaylistVideo from '../screens/PlaylistVideo';
import Post from '../screens/Post';
import Register from '../screens/Register';
import SearchVideo from '../screens/SearchVideo';
import Splash from '../screens/Splash';
import UploadVideo from '../screens/UploadVideo';
import UserDetail from '../screens/UserDetail';
import VideoDetails from '../screens/Video';
import WatchHistory from '../screens/WatchHistory';
import WelcomeScreen from '../screens/WelcomeScreen';
import YourVideo from '../screens/YourVideo';
import TabNavigator from './TabNavigator';

const authStack = [
  {
    name: 'Splash',
    component: Splash,
  },
  {
    name: 'WelcomeScreen',
    component: WelcomeScreen,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    component: Register,
  },
];

const dashboardStack = [
  {
    name: 'MainTabs',
    component: TabNavigator,
  },
  {
    name: 'Posts',
    component: Post,
  },
  {
    name: 'About',
    component: About,
  },
  {
    name: 'Video',
    component: VideoDetails,
  },
  {
    name: 'Channel',
    component: Channel,
  },
  {
    name: 'SearchVideo',
    component: SearchVideo,
  },
  {
    name: 'Appearance',
    component: AppearanceToggle,
  },
  {
    name: 'WatchHistory',
    component: WatchHistory,
  },
  {
    name: 'Playlist',
    component: Playlist,
  },
  {
    name: 'YourVideo',
    component: YourVideo,
  },
  {
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    name: 'UserDetail',
    component: UserDetail,
  },
  {
    name: 'Notification',
    component: Notification,
  },
  {
    name: 'PlaylistVideo',
    component: PlaylistVideo,
  },
  {
    name: 'UploadVideo',
    component: UploadVideo,
  },
  {
    name: 'ForgetPassword',
    component: ForgetPassword,
  },
  {
    name: 'LikesVideo',
    component: LikesVideo,
  },
];

export const allStack = [...authStack, ...dashboardStack];

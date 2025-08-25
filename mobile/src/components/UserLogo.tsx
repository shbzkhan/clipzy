import { Image, TouchableOpacity } from 'react-native'
import{ FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'

interface UserLogo {
    uri:string
    heightAndWidth?:number
}
const UserLogo:FC<UserLogo> = ({uri, heightAndWidth=12}) => {
  return (
    <TouchableOpacity
        onPress={()=>navigate("Channel")}
        >
           <Image
        source={{uri:uri}}
        className={`w-${heightAndWidth} h-${heightAndWidth} rounded-full `}
        resizeMode='cover'
        /> 
        </TouchableOpacity>
  )
}

export default UserLogo
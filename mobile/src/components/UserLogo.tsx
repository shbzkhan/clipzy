import { Image, TouchableOpacity } from 'react-native'
import{ FC } from 'react'

interface UserLogo {
    uri:string | undefined
    heightAndWidth?:number
    handlePress?:()=>void
}
const UserLogo:FC<UserLogo> = ({uri, handlePress, heightAndWidth=12}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
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
export interface UserProps {
    fullname:string
    username:string
    email:string
    password:string
}

export interface UserData extends UserProps {
  _id: string
  avatar: string
  coverImage: string
  watchHistory: string[]    
  createdAt: string          
  updatedAt: string
  __v: number
}

export interface ApiResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}
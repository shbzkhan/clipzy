export interface PlaylistProps {
  _id: string;
  name: string;
  description: string;
  videos: string[];       
  owner: string; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface PlaylistResponse {
  statusCode: number;
  data:string[]
  message: string;
  success: boolean;
}
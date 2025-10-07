import {SheetDefinition, registerSheet} from "react-native-actions-sheet"
import CommentSheet from "./CommentSheet"
import DescriptionSheet from "./DescriptionSheet"
import LoginSheet from "./LoginSheet"
import PlaylistSheet from "./PlaylistSheet"
import VideoDetailsSheet from "./VideoDetailsSheet"

registerSheet("comment-sheet", CommentSheet)
registerSheet("description-sheet", DescriptionSheet)
registerSheet("login-sheet", LoginSheet)
registerSheet("playlist-sheet", PlaylistSheet)
registerSheet("videoDetails-sheet", VideoDetailsSheet)

declare module "react-native-actions-sheet"{
    interface Sheets{
        "comment-sheet":SheetDefinition<{
            payload:{
                entityId:string
            }
        }>
        "description-sheet":SheetDefinition<{
            payload:{
                entityId:string
            }
        }>
        "login-sheet":SheetDefinition<{
            payload:{
                entityId:string
            }
        }>
        "playlist-sheet":SheetDefinition<{
            payload:{
                entityId:string
            }
        }>
        "videoDetails-sheet":SheetDefinition<{
            payload:{
                entityId:string
            }
        }>

    }
}

export {}
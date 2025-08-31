import {SheetDefinition, registerSheet} from "react-native-actions-sheet"
import CommentSheet from "./CommentSheet"
import DescriptionSheet from "./DescriptionSheet"
import LoginSheet from "./LoginSheet"

registerSheet("comment-sheet", CommentSheet)
registerSheet("description-sheet", DescriptionSheet)
registerSheet("login-sheet", LoginSheet)

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

    }
}

export {}
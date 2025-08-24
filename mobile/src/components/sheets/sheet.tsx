import {SheetDefinition, registerSheet} from "react-native-actions-sheet"
import CommentSheet from "./CommentSheet"
import DescriptionSheet from "./DescriptionSheet"

registerSheet("comment-sheet", CommentSheet)
registerSheet("description-sheet", DescriptionSheet)

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

    }
}

export {}
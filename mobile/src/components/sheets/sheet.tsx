import {SheetDefinition, registerSheet} from "react-native-actions-sheet"
import CommentSheet from "./CommentSheet"

registerSheet("comment-sheet", CommentSheet)

declare module "react-native-actions-sheet"{
    interface Sheets{
        "comment-sheet":SheetDefinition<{
            payload:{
                type:"comment";
                entityId:string

            }
        }>
    }
}

export {}
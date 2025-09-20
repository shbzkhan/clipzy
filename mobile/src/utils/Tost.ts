import { Toast } from "react-native-toast-notifications"

type typeProps = "success" | "danger"
export const ToastShow =(msg:string, type:typeProps = "success")=>{
    Toast.show(msg,{
        type:type
    })
}
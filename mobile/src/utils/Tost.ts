import { Toast } from "react-native-toast-notifications"

type typeProps = "success" | "danger" | "normal"

export const ToastLoading =(msg:string,)=>{
    const toastId = Toast.show(msg,{
        type:"normal",
        duration:999999
    })
    return toastId
}
export const ToastShow =(msg:string, type:typeProps = "success", toastsId?:any)=>{
    if(toastsId){
        Toast.hide(toastsId)
    }
    const toastId = Toast.show(msg,{
        type:type
    })
    return toastId
}
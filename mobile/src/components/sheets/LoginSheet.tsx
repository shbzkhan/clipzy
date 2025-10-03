import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { StyleSheet } from 'react-native'
import Icon from '../../constants/Icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Logo from '../../constants/Logo'
import { Formik } from 'formik'
import CustomTextInput from '../CustomTextInput'
import CustomButton from '../CustomButton'
import { goBack, navigate } from '../../navigation/NavigationUtils'
import * as Yup from "yup"
import { useLoginMutation } from '../../redux/api/authApi'
import { useDispatch } from 'react-redux'
import { LoginUser } from '../../types/auth'
import { ToastShow } from '../../utils/Tost'
import { userData } from '../../redux/slice/userSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginSheet = (props:SheetProps<"login-sheet">) => {
    const sheet_id = props.payload?.entityId
    console.log("id", sheet_id)
    const {colorScheme} = useColorScheme()
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const [login,{isLoading}] = useLoginMutation()
        const dispatch = useDispatch();
            
            const handleLogin = async(user:LoginUser,{ resetForm }:any)=>{
                setIsError(false)
               try {
                 const userLoggedIn = await login(user).unwrap()
                 ToastShow(userLoggedIn.message, "success")
                 dispatch(userData(userLoggedIn.data.user))
                 await AsyncStorage.setItem("token", userLoggedIn.data.accessToken)
                 resetForm()
                 SheetManager.hide(props.sheetId)
               } catch (err) {
                 const error = err as FetchBaseQueryError
                 const errorMsg = error.data as {message:string}
                ToastShow(errorMsg.message, "danger")
                setIsError(true)
                setError(errorMsg.message)
               }
            }
    
    const SignupSchema = Yup.object().shape({
                        email: Yup.string().email('Invalid email').required('Email is required'),
                        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    });
  return (
    <ActionSheet 
    id={props.sheetId}
    headerAlwaysVisible={true}
    isModal={true}
    onClose={()=>SheetManager.hide(props.sheetId)}
    gestureEnabled={true}
    keyboardHandlerEnabled={true}
    indicatorStyle={styles.indicator}
    enableGesturesInScrollView={true}
    containerStyle={{ backgroundColor: colorScheme === "light" ? "#FFFFFF" : "#0c263b" }}
    >
      
    <SafeAreaView>
        <KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding":"height"}
        >
        <View className='flex-row justify-center px-4 py-4 mb-6 border-b border-gray-500'>
            <Text className='text-2xl text-primary-600 font-rubik-bold dark:text-white'>Login</Text>
        </View>
        <ScrollView className='flex px-4 item-center'>
            <View className='justify-center pb-4'>
        <Formik
            initialValues={{
                email:"",
                password:""
            }}
            onSubmit={handleLogin}
            validationSchema={SignupSchema}
            // validateOnChange={false}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched
                   
            })=>(
                
                <View className='gap-4'>
    
                <CustomTextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                errors={touched.email && errors.email}
                />
                <CustomTextInput
                label="Password"
                returnKeyType='send'
                secureTextEntry
                onSubmitEditing={handleSubmit}
                value={values.password}
                onChangeText={handleChange("password")}
                errors={touched.password && errors.password}
                />

                <CustomButton
                title='Login'
                handlePress={handleSubmit}
                isLoading={isLoading}
                containerStyles='mt-4'
                />
                {isError && <Text className='text-center text-danger'>{error}</Text>}
                <View className='flex-row items-center gap-1 pb-3 mx-auto mt-3'>
                    <Text className='text-xl text-gray-300 font-tinos'>Create a new account?</Text>
                    <TouchableOpacity
                    className=''
                    onPress={()=>{
                        SheetManager.hide(props.sheetId)
                        navigate("Register")
                    }}
                    >
                        <Text className='text-xl text-primary-600 font-tinos'>Register</Text>
                    </TouchableOpacity>
                </View>
                </View>
            )}
        </Formik>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  indicator:{
    height:4,
    width:45,
    top:4,
    backgroundColor:"#52525B"
  },
  

})

export default LoginSheet
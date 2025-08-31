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

const LoginSheet = (props:SheetProps<"login-sheet">) => {
    const {colorScheme} = useColorScheme()
    const [login,{isLoading}] = useLoginMutation()
        const dispatch = useDispatch();
            
            const handleLogin = async(user:LoginUser,{ resetForm }:any)=>{
               try {
                 const userLoggedIn = await login(user).unwrap()
                 ToastShow(userLoggedIn.message, "success")
                 dispatch(userData(userLoggedIn.data))
                 goBack()
                 resetForm()
                 SheetManager.hide(props.sheetId)
               } catch (err) {
                 const error = err as FetchBaseQueryError
                 console.log(err)
                 const errorMsg = error.data as {message:string}
                ToastShow(errorMsg.message, "danger")
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
    containerStyle={[
        styles.container,
        { backgroundColor: colorScheme === "light" ? "#FFFFFF" : "#0c263b" },
      ]}
    >
      
    <SafeAreaView className='bg-dark'>
        <KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding":"height"}
        >
        <View className='flex-row justify-between px-4 border-b border-gray-500 py-4'>
            <Text className='text-white font-rubik-bold text-xl'>Login</Text>
            <TouchableOpacity
            onPress={()=>SheetManager.hide(props.sheetId)}
            >
              <Icon name="X" color='white'/>
            </TouchableOpacity>
        </View>
        <ScrollView className='flex item-center px-4'>
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
                <View className='mx-auto mt-3 flex-row items-center gap-1'>
                    <Text className='text-gray-300 font-tinos text-xl'>Create a new account?</Text>
                    <TouchableOpacity
                    className=''
                    onPress={()=>{
                        SheetManager.hide(props.sheetId)
                        navigate("Register")
                    }}
                    >
                        <Text className='text-primary-600 font-tinos text-xl'>Register</Text>
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
  container:{
    height: "40%"
  },

})

export default LoginSheet
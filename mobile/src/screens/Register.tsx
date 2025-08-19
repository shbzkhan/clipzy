import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as Yup from "yup"
import CustomTextInput from '../components/CustomTextInput'
import Logo from '../constants/Logo'
import CustomButton from '../components/CustomButton'
import { navigate } from '../navigation/NavigationUtils'
import { useRegisterMutation } from '../redux/api/authApi'
import { ToastShow } from '../utils/Tost'
import { RegisterUser } from '../types/auth'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'


const Register = () => {
    const [register,{isLoading}] = useRegisterMutation()
    
    const handleRegister = async(newUser:RegisterUser,{ resetForm }:any)=>{
       try {
         const user = await register(newUser).unwrap()
         ToastShow(user.message, "success")
         resetForm()
       } catch (err) {
         const error = err as FetchBaseQueryError
         const errorMsg = error.data as {message:string}
        ToastShow(errorMsg.message, "danger")
       }
    }

const SignupSchema = Yup.object().shape({
                    fullname: Yup.string().required('Name is required'),
                    username: Yup.string().min(4, 'Minimum 4 characters').required('Name is required'),
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
                    terms: Yup.boolean().oneOf([true], 'You must accept the terms')
});
  return (
    <SafeAreaView className=' bg-white flex-1'>
        <KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding":"height"}
        style={{flex:1}}
        >
        <ScrollView className='flex item-center px-4'>
            <View className='justify-center pb-4'>
            <View className="items-center justify-center pb-14 pt-24 gap-2">
            <View className='h-24 w-24 rounded-full bg-primary-50 justify-center items-center'>
                <Logo
                containerStyle='w-12 h-10'
                imageStyle='h-10 w-12'
                />
            </View>
                <Text className='text-black font-tinos-bold text-4xl pt-4'>CLIPZY</Text>
                <Text className='text-gray-300 text-xl'>Create a new account</Text>
            </View>
        <Formik
            initialValues={{
                fullname:"",
                username:"",
                email:"",
                password:""
            }}
            onSubmit={handleRegister}
            validationSchema={SignupSchema}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
            })=>(
                
                <View className='gap-4'>
                <CustomTextInput
                label="Full Name"
                value={values.fullname}
                onChangeText={handleChange("fullname")}
                errors={touched.fullname && errors.fullname}
                />
                <CustomTextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                errors={touched.username && errors.username}
                />
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
                title='Register'
                handlePress={handleSubmit}
                isLoading={isLoading}
                containerStyles='mt-4'
                />
                <View className='mx-auto mt-3 flex-row items-center gap-1'>
                    <Text className='text-gray-300 font-tinos text-xl'>Already have a account?</Text>
                    <TouchableOpacity
                    className=''
                    onPress={()=>navigate("Login")}
                    >
                        <Text className='text-primary-600 font-tinos text-xl'>Sign in</Text>
                    </TouchableOpacity>
                </View>
                </View>
            )}
        </Formik>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register

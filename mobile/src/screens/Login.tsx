import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as Yup from "yup"
import CustomTextInput from '../components/CustomTextInput'
import Logo from '../constants/Logo'
import CustomButton from '../components/CustomButton'
import { navigate, replace, resetAndNavigate } from '../navigation/NavigationUtils'


const Login = () => {

const SignupSchema = Yup.object().shape({
                    name: Yup.string().required('Name is required'),
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
                <Text className='text-gray-300 text-xl'>Login a account</Text>
            </View>
        <Formik
            initialValues={{
                fullname:"",
                username:"",
                email:"",
                password:""
            }}
            onSubmit={()=>console.log("hello")}
            validationSchema={SignupSchema}
            // validateOnChange={false}
        >
            {({
                isSubmitting,
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
                handlePress={()=>replace("MainTabs")}
                containerStyles='mt-4'
                />
                <View className='mx-auto mt-3 flex-row items-center gap-1'>
                    <Text className='text-gray-300 font-tinos text-xl'>Create a new account?</Text>
                    <TouchableOpacity
                    className=''
                    onPress={()=>navigate("Register")}
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
  )
}

export default Login

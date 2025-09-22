import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import CustomTextInput from '../components/CustomTextInput'
import { Formik } from 'formik'
import { ScrollView } from 'react-native'
import * as Yup from "yup"
import { ToastShow } from '../utils/Tost'

const ForgetPassword = () => {
     const handleForgetPassword = async(newUser:RegisterUser,{ resetForm }:any)=>{
       try {
        //  const user = await register(newUser).unwrap()
        //  ToastShow(user.message, "success")
         resetForm()
       } catch (err) {
         const error = err as FetchBaseQueryError
         const errorMsg = error.data as {message:string}
        ToastShow(errorMsg.message, "danger")
       }
    }

const ForgetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Minimum 6 characters').required('New Password is required'),
    otp: Yup.string().min(6, 'Minimum 6 OTP characters').required('OTP is required'),
});

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark px-4 gap-8'>
      <CustomHeader title='Forget Password'/>
      <ScrollView>
        <Formik
                    initialValues={{
                        newPassword:"",
                        otp:""
                    }}
                    onSubmit={handleForgetPassword}
                    validationSchema={ForgetPasswordSchema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    })=>(
                        
                        <View className='gap-8'>
                        
                        <CustomTextInput
                        label="New Password"
                        secureTextEntry
                        value={values.newPassword}
                        onChangeText={handleChange("newPassword")}
                        errors={touched.newPassword && errors.newPassword}
                        />
                        <CustomTextInput
                        label="6 Digit OTP"
                        keyboardType='number-pad'
                         returnKeyType='done'
                        onSubmitEditing={handleSubmit}
                        value={values.otp}
                        onChangeText={handleChange("otp")}
                        errors={touched.otp && errors.otp}
                        />
                        <CustomButton
                        title='Forget Password'
                        handlePress={handleSubmit}
                        containerStyles='mt-4'
                        />
                        <TouchableOpacity className='items-center'>
                            <Text className='text-primary-600 font-rubik-bold'>Send OTP</Text>
                        </TouchableOpacity>
                    </View>
                    )}
          </Formik>
          </ScrollView>
    </SafeAreaView>
  )
           
}

export default ForgetPassword
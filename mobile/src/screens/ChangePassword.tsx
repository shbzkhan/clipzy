import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTextInput from '../components/CustomTextInput'
import CustomHeader from '../components/Header/CustomHeader'
import CustomButton from '../components/CustomButton'
import { Formik } from 'formik'
import * as Yup from "yup"
import { ToastShow } from '../utils/Tost'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ScrollView } from 'react-native'

const ChangePassword = () => {
    const handleChangePassword = async(newUser:RegisterUser,{ resetForm }:any)=>{
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

const ChangePasswordSchema = Yup.object().shape({
                    currentPassword: Yup.string().min(6, 'Minimum 6 characters').required('Current Password is required'),
                    newPassword: Yup.string().min(6, 'Minimum 6 characters').required('New Password is required'),
                    confirmNewPassword: Yup.string().min(6, 'Minimum 6 characters').required('Confirm new Password is required')
});

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark px-4 gap-8'>
      <CustomHeader title='Change Password'/>
      <ScrollView>
        <Formik
                    initialValues={{
                        currentPassword:"",
                        newPassword:"",
                        confirmNewPassword:""
                    }}
                    onSubmit={handleChangePassword}
                    validationSchema={ChangePasswordSchema}
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
                        label="Current Password"
                        value={values.currentPassword}
                        onChangeText={handleChange("currentPassword")}
                        errors={touched.currentPassword && errors.currentPassword}
                        />
                        <CustomTextInput
                        label="New Password"
                        secureTextEntry
                        returnKeyType='done'
                        value={values.newPassword}
                        onChangeText={handleChange("newPassword")}
                        errors={touched.newPassword && errors.newPassword}
                        />
                        <CustomTextInput
                        label="Confirm new Password"
                        secureTextEntry
                        returnKeyType='done'
                        onSubmitEditing={handleSubmit}
                        value={values.confirmNewPassword}
                        onChangeText={handleChange("confirmNewPassword")}
                        errors={touched.confirmNewPassword && errors.confirmNewPassword}
                        />
        
                        <CustomButton
                        title='Change Password'
                        handlePress={handleSubmit}
                        containerStyles='mt-4'
                        />
                        </View>
                    )}
          </Formik>
          </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePassword
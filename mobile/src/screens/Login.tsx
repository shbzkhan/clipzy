import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../components/CustomTextInput';
import Logo from '../constants/Logo';
import CustomButton from '../components/CustomButton';
import {
  goBack,
  navigate,
  resetAndNavigate,
} from '../navigation/NavigationUtils';
import { ToastShow } from '../utils/Tost';
import { useLoginMutation } from '../redux/api/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LoginUser } from '../types/auth.types';
import { useDispatch } from 'react-redux';
import { userData } from '../redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (user: LoginUser, { resetForm }: any) => {
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    try {
      const userLoggedIn = await login({...user, fcmToken}).unwrap();
      ToastShow(userLoggedIn.message, 'success');
      dispatch(userData(userLoggedIn.data.user));
      await AsyncStorage.setItem(
        'access-token',
        userLoggedIn?.data.accessToken,
      );
      await AsyncStorage.setItem(
        'refresh-token',
        userLoggedIn?.data.refreshToken,
      );
      resetAndNavigate('MainTabs', { refresh: false });
      resetForm();
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const errorMsg = error.data as { message: string };
      ToastShow(errorMsg.message, 'danger');
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
  });
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex px-4 item-center">
          <View className="justify-center pb-4">
            <View className="items-center justify-center gap-2 pt-24 pb-14">
              <View className="items-center justify-center w-24 h-24 rounded-full bg-primary-50">
                <Logo containerStyle="w-12 h-10" imageStyle="h-10 w-12" />
              </View>
              <Text className="pt-4 text-4xl text-primary-600 font-tinos-bold">
                CLIPZY
              </Text>
              <Text className="text-xl text-gray-300">Login a account</Text>
            </View>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={handleLogin}
              validationSchema={SignupSchema}
              // validateOnChange={false}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View className="gap-4">
                  <CustomTextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    errors={touched.email && errors.email}
                  />
                  <CustomTextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    errors={touched.password && errors.password}
                  />

                  <CustomButton
                    title="Login"
                    handlePress={handleSubmit}
                    isLoading={isLoading}
                    containerStyles="mt-4"
                  />
                  <View className="flex-row items-center gap-1 mx-auto mt-3">
                    <Text className="text-xl text-gray-300 font-tinos">
                      Create a new account?
                    </Text>
                    <TouchableOpacity
                      className=""
                      onPress={() => {
                        navigate('Register');
                      }}
                    >
                      <Text className="text-xl text-primary-600 font-tinos">
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

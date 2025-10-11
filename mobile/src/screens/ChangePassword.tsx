import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import CustomHeader from '../components/Header/CustomHeader';
import CustomButton from '../components/CustomButton';
import { ToastShow } from '../utils/Tost';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ScrollView } from 'react-native';
import { useChangePasswordMutation } from '../redux/api/authApi';
import { goBack } from '../navigation/NavigationUtils';

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [currentPassword, setCurrentPasswrod] = useState('');
  const [newPassword, setNewPasswrod] = useState('');
  const [confirmPassword, setConfirmPasswrod] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return ToastShow('New password and confirm password are not matched');
    }
    if (newPassword.length < 6) {
      return ToastShow('Minimun 6 digit required');
    }
    try {
      const updatedPassword = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      ToastShow(updatedPassword.message, 'success');
      setCurrentPasswrod('');
      setNewPasswrod('');
      setConfirmPasswrod('');
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const errorMsg = error.data as { message: string };
      ToastShow(errorMsg.message, 'danger');
    }
  };
  return (
    <SafeAreaView className="flex-1 gap-8 px-4 bg-white dark:bg-dark">
      <CustomHeader title="Change Password" />
      <ScrollView>
        <View className="gap-8">
          <CustomTextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={e => setCurrentPasswrod(e)}
          />
          <CustomTextInput
            label="New Password"
            secureTextEntry
            returnKeyType="done"
            value={newPassword}
            onChangeText={e => setNewPasswrod(e)}
          />
          <CustomTextInput
            label="Confirm new Password"
            secureTextEntry
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={e => setConfirmPasswrod(e)}
          />

          <CustomButton
            title="Change Password"
            handlePress={handleChangePassword}
            isLoading={isLoading}
            containerStyles="mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

"use client"
import { BUTTON_BG, BUTTON_LINEAR_LEFT_COLOR, BUTTON_LINEAR_RIGHT_COLOR, HEADING_FONT_SIZE, LABEL_TEXT_FONT_WEIGHT, PRE_LOGIN_BUTTON_TEXT_COLOR, PRE_LOGIN_BUTTON_TEXT_FONT_FAMILY, PRE_LOGIN_BUTTON_TEXT_FONT_SIZE, PRE_LOGIN_BUTTON_TEXT_FONT_WEIGHT, PRE_LOGIN_PAGE_HEADING_FONT_FAMILY, PRE_LOGIN_PAGE_HEADING_FONT_SIZE, PRE_LOGIN_PAGE_HEADING_FONT_WEIGHT, PRE_LOGIN_PAGE_HEADING_TEXT_COLOR, PRE_LOGIN_PAGE_SUB_HEADING_FONT_FAMILY, PRE_LOGIN_PAGE_SUB_HEADING_FONT_SIZE, PRE_LOGIN_PAGE_SUB_HEADING_FONT_WEIGHT, SUB_HEADING_FONT_SIZE, TEXT_COLOR, TEXT_FONT_SIZE, TEXT_FONT_WEIGHT } from '@/lib/app/app_constants';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import CreateNewPassword from '../forms/forgot_password_forms/create_new_pass';
import { useRouter } from 'next/navigation';
import { confirmResetPassword } from 'aws-amplify/auth';
import useSessionStorage from '@/lib/hooks/use_sessionstorage';
import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const ResetPasswordPage = () => {
  const [passUpdated, setPassUpdated] = useState<boolean>(false);
  const [store, setStorage] = useSessionStorage<string>('email_verfication');
  const router = useRouter();

  const handleSubmit = () => {
    setPassUpdated(true);
  }

  const onSubmit = async(code:string,password:string,) => {

    await confirmResetPassword({
      username: store && store?store:"",
      confirmationCode: code,
      newPassword: password,
    });
    setPassUpdated(true);
  
  }

  const onSubmitNext = () => {
    router.push('/client/login');
  }

  return (
    <Flex flexDir = {'column'}  w = {'100%'}  gap = {'40px'}>

      {/* Forgot Password Page Heading */}
      { passUpdated ?
        <>
          <Flex flexDir={'column'} gap={['4px', '4px', '16px']} color={PRE_LOGIN_PAGE_HEADING_TEXT_COLOR}>
            <Heading fontFamily = {PRE_LOGIN_PAGE_HEADING_FONT_FAMILY} fontSize = {PRE_LOGIN_PAGE_HEADING_FONT_SIZE} fontWeight = {PRE_LOGIN_PAGE_HEADING_FONT_WEIGHT}>All done</Heading>
            <Text fontFamily = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_FAMILY} fontSize = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_SIZE} fontWeight = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_WEIGHT}>You have successfully changed your password. Now you can directly access to the dashboard.</Text>
          </Flex>
          <Flex>
            <Button onClick={onSubmitNext} w = {'100%'} h = {'40px'} type = {"submit"} bg={BUTTON_LINEAR_RIGHT_COLOR} _hover = {{ bgGradient: `linear(180deg, ${BUTTON_LINEAR_LEFT_COLOR}, ${BUTTON_LINEAR_RIGHT_COLOR})`}} borderRadius = {'4px'} >
              <Text color = {PRE_LOGIN_BUTTON_TEXT_COLOR} fontFamily = {PRE_LOGIN_BUTTON_TEXT_FONT_FAMILY} fontSize = {PRE_LOGIN_BUTTON_TEXT_FONT_SIZE} fontWeight = {PRE_LOGIN_BUTTON_TEXT_FONT_WEIGHT} >Proceed to Dashboard </Text>
            </Button>
          </Flex>
        </>
      :
        <CreateNewPassword onSubmit = {onSubmit}/>
      }
    </Flex>
  );
}

export default ResetPasswordPage

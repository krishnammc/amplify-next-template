"use client"
import React, { useState } from 'react'
import VerifyEmail from '../forms/forgot_password_forms/verify_email';
import SendEmail from '../forms/forgot_password_forms/send_email';
import { resetPassword } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";
import useSessionStorage from '@/lib/hooks/use_sessionstorage';

Amplify.configure(outputs);


const ForgotPasswordPage = () => {

  const [validUser, setValidUser] = useState<boolean>(true);
  const [store, setStorage] = useSessionStorage<string>('email_verfication');

  const handleSubmit = async(email:string) => {
    setStorage(email)
    const output = await resetPassword({
      username: email
    });
    
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
    setValidUser(false);
  }

  return (
    <>
      { validUser ? <SendEmail onSubmit = {handleSubmit} /> : <VerifyEmail/> }
    </>
  );
}

export default ForgotPasswordPage

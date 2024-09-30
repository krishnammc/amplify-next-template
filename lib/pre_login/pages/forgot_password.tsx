"use client"
import React, { useState } from 'react'
import VerifyEmail from '../forms/forgot_password_forms/verify_email';
import SendEmail from '../forms/forgot_password_forms/send_email';


const ForgotPasswordPage = () => {

  const [validUser, setValidUser] = useState<boolean>(true);

  const handleSubmit = () => {
    setValidUser(false);
  }

  return (
    <>
      { validUser ? <SendEmail onSubmit = {handleSubmit} /> : <VerifyEmail/> }
    </>
  );
}

export default ForgotPasswordPage

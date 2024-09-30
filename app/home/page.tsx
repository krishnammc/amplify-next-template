"use client"
import React, { FormEvent, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { confirmSignUp, getCurrentUser } from 'aws-amplify/auth';


 function page () {

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget
    const confirmationCode = "023750";
    // if (!confirmationCode) {
    //   // display an error message to the user
    //   return;
    // }
  }

  return (
    <>
    <form onSubmit={handleSubmit}  >  
     <input id='code' name='code' type="text" placeholder="Enter confirmation code" />
     <input type='submit' value="Submit" />
    </form>
    </>
  )
}

export default (page)
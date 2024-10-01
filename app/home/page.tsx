"use client"
import React, { FormEvent, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { confirmSignUp, getCurrentUser } from 'aws-amplify/auth';
 import { Hub } from 'aws-amplify/utils';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';



 function page () {

  const router = useRouter()
  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault()
  //   const form = event.currentTarget
  //   const confirmationCode = "023750";
  //   // if (!confirmationCode) {
  //   //   // display an error message to the user
  //   //   return;
  //   // }
  // }


  async function handleSignOut() {
    await signOut({ global: true })
    router.push("/client/signup")
  }


  return (
    <Flex bg={"red"} w={"100vw"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Button onClick={()=>{handleSignOut()}}>Sign out</Button>
    {/* <form onSubmit={handleSubmit}  >  
     <input id='code' name='code' type="text" placeholder="Enter confirmation code" />
     <input type='submit' value="Submit" />
    </form> */}
    </Flex>
  )
}

export default  (page)
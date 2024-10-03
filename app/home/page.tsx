"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { confirmSignUp, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
 import { Hub } from 'aws-amplify/utils';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { Button, Flex, Text } from '@chakra-ui/react';
import outputs from "@/amplify_outputs.json";
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/lib/hooks/use_currentuser';


Amplify.configure(outputs);


  function page () {

  const router = useRouter()
  const [state,setState]= useState(0);
 
  const { session, loading, error } = useCurrentUser();
  console.log(session);

  async function handleSignOut() {
    await signOut({ global: true })
    router.push("/client/login")
  }

  return (
    <Flex bg={"black"} w={"100vw"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Text>{}</Text>
      <Button onClick={()=>{handleSignOut()}}>Sign out</Button>
    </Flex>
  )
}

export default (page)
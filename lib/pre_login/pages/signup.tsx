"use client"
import React, { useState } from 'react'
import BasicInfoForm from '../forms/signup_forms/basic_info_form';
import AddressInfoForm from '../forms/signup_forms/address_info_form';
import CredentialInfo from '../forms/signup_forms/credential_info';
import Emailverified from '../forms/signup_forms/email_verified';
import CheckEmail from '../forms/signup_forms/check_email';
import { Flex } from '@chakra-ui/react';
import { autoSignIn, fetchUserAttributes, getCurrentUser, signIn, signUp } from 'aws-amplify/auth';
import useSessionStorage from '@/lib/hooks/use_sessionstorage';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Schema } from '@/amplify/data/resource';
import outputs from "@/amplify_outputs.json";
import { Hub } from 'aws-amplify/utils';


Amplify.configure(outputs);

const client = generateClient<Schema>();


interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
  phone_number:HTMLInputElement
  family_name:HTMLInputElement
  given_name:HTMLInputElement
  confirm_password: HTMLInputElement
  'custom:role':HTMLInputElement
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements
}


// export const awsConfig = {
//   // ... other configurations ...
//   Auth: {
//     mandatorySignIn: true,
//     // ... other auth configurations ...
//   },
//   attributeMapping: {
//     'custom:company_name': 'company_name',
//     'custom:role': 'role',
//   },
// };


const SignUpPage = () => {

  const [basicInfo, setBasicInfo] = useState<boolean>(true);
  const [agentInfo, setAgentInfo] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<boolean>(false);
  const [credentialInfo, setCredentialInfo] = useState<boolean>(false);
  const [sentEmail, setSentEmail] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [store, setStorage] = useSessionStorage<Record<string, string | string[] | number> | null>('Credential Info Form Values');
  const [basicstore, setBasicStorage] = useSessionStorage<Record<string, string | string[] | number> | null>('Basic Info Form Values');
 
 const SubmitedBasicInfo = () => {
  setBasicInfo(false);
  setAddressInfo(true);
 }

 const BacktoBasicInfo = () => {
  setAddressInfo(false);
  setBasicInfo(true);
 }

 const SubmitedAddressInfo = () => {
  setAddressInfo(false);
  setCredentialInfo(true);
 }

 const BacktoAddressInfo = () => {
  setCredentialInfo(false);
  setAddressInfo(true);
 }

 const SubmitedCredentialInfo = async () => {
  return new Promise((resolve, reject) => {
    setCredentialInfo(false);
    setSentEmail(true);
    setEmailVerified(true);
    // ... validate inputs

    signUp({
      username: basicstore !== null && basicstore !== undefined && basicstore.email ? basicstore.email as string : "",
      password: store !== null && store !== undefined && store.confirm_password ? store.confirm_password as string : "",

      options: {
        userAttributes: {
          email: basicstore !== null && basicstore !== undefined && basicstore.email ? basicstore.email as string : "",
          family_name:basicstore !== null && basicstore !== undefined && basicstore.first_name ? basicstore.first_name as string : "",
          given_name:basicstore !== null && basicstore !== undefined && basicstore.last_name ? basicstore.last_name as string : "",
          phone_number:basicstore !== null && basicstore !== undefined && basicstore.phone_number ? basicstore.phone_number as string : "",
          'custom:company_name': basicstore !== null && basicstore !== undefined && basicstore.company_name ? basicstore.company_name as string : "",
        },autoSignIn:true
      }
      
      
    })
    .then((response) => {
      resolve(response);
      
    })
    .catch((error) => {
      reject(error);
    });
  });
 }

 const handleEmailVerified = () => {
  setSentEmail(false);
  setEmailVerified(true);
 }

  return (
    <Flex flexDir = {'column'} w = {'100%'} h = {'fit-content'} justifyContent = {'center'} gap = {'40px'}>
      { basicInfo && <BasicInfoForm onSubmit = {SubmitedBasicInfo} /> }
      { addressInfo && <AddressInfoForm onSubmit = {SubmitedAddressInfo} moveBack = {BacktoBasicInfo}/> }
      { credentialInfo && <CredentialInfo onSubmit = {SubmitedCredentialInfo} moveBack = {BacktoAddressInfo}/> }
      {/* { sentEmail && <CheckEmail onSubmit = {handleEmailVerified}/> } */}
      { emailVerified && <Emailverified /> }
    </Flex>
  );
}

export default SignUpPage

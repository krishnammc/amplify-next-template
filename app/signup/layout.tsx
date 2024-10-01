import React from "react";
import { BUTTON_TEXT_COLOR, BUTTON_BG, FILE_BORDER_COLOR, PRE_LOGIN_PAGE_MAX_WIDTH, SECTION_PADDING_X } from "@/lib/app/app_constants";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LoginPageCarousel from "@/lib/pre_login/components/login_page_ carousel";
import { Hub } from 'aws-amplify/utils';

const PreLoginAppLayout = ({ children }:{ children: React.ReactNode }) => {


  Hub.listen('auth', (data) => {
    console.log(data)
  });

  return (
    <Flex w = {'100vw'} maxH = {'100vh'} h={"100%"} justifyContent = {'center'} alignItems = {'center'} >
      <Flex maxW = {'1440px'} w = {'100%'} maxH = {['100vh', '100vh', '100vh', '100%','fit-content']} h={"100%"} px = {['0px','0px','0px','20px']}>
        <Flex w = {['100%', '100%','100%', '50%']} py={"60px"} justifyContent = {'center'} h={"100%"} maxH={"100%"} minH={"1240px"} alignItems = {'center'} bg = {BUTTON_TEXT_COLOR}>
          <Flex maxW = {PRE_LOGIN_PAGE_MAX_WIDTH} w = {'100%'} h={"100%"} maxH={"100%"} gap = {'64px'} my={"60px"} flexDir = {'column'} alignItems={"center"} justifyContent={"center"} color = {BUTTON_BG} p = {SECTION_PADDING_X}>
            <Flex position = {'relative'} alignSelf={"flex-start"}  mt={"220px"}  maxW = {'104px'} w = {'100%'} minH = {'40px'} h = {'100%'} >
              <Image src = {'/images/Flash Logo.png'} priority = {true} alt = {"Flash Logo"} fill style = {{ objectFit: 'contain' }} />
            </Flex>
            {children}
          </Flex>
        </Flex>
        <Flex w = {['0%', '0%', '0%', '50%']} bg = {FILE_BORDER_COLOR}>
          <LoginPageCarousel />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PreLoginAppLayout;

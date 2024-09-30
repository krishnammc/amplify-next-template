import React from "react";
import { BUTTON_TEXT_COLOR, BUTTON_BG, FILE_BORDER_COLOR, PRE_LOGIN_PAGE_MAX_WIDTH, SECTION_PADDING_X } from "@/lib/app/app_constants";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import LoginPageCarousel from "@/lib/pre_login/components/login_page_ carousel";

const PreLoginAppLayout = ({ children }:{ children: React.ReactNode }) => {

  return (
    <Flex w = {'100vw'} minH = {'100vh'} justifyContent = {'center'} alignItems = {'center'} >
      <Flex maxW = {'1440px'} w = {'100%'} minH = {['100vh', '100vh', '100vh', 'auto']} px = {['0px','0px','0px','20px']}>
        <Flex w = {['100%', '100%','100%', '50%']} justifyContent = {'center'} alignItems = {'center'} bg = {BUTTON_TEXT_COLOR}>
          <Flex maxW = {PRE_LOGIN_PAGE_MAX_WIDTH} w = {'100%'} gap = {'64px'} flexDir = {'column'} color = {BUTTON_BG} p = {SECTION_PADDING_X}>
            <Flex position = {'relative'} maxW = {'104px'} w = {'100%'} minH = {'40px'} h = {'100%'} >
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

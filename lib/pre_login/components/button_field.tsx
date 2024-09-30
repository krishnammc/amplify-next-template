import { BUTTON_LINEAR_LEFT_COLOR, BUTTON_LINEAR_RIGHT_COLOR, TEXT_COLOR, PRE_LOGIN_BUTTON_TEXT_FONT_FAMILY, PRE_LOGIN_BUTTON_TEXT_FONT_SIZE, PRE_LOGIN_BUTTON_TEXT_FONT_WEIGHT, PRE_LOGIN_ALTERNATE_BUTTON_TEXT_COLOR, PRE_LOGIN_BUTTON_TEXT_COLOR } from '@/lib/app/app_constants';
import { Button, Text } from '@chakra-ui/react';
import React from 'react'

export interface fields {
  textValue:string,
  w?:string,
  h?:string
}

const ButtonField = ({ textValue, w = "100%", h = "40px" }:fields) => {
  return (
    <Button title = {'Montserrat Bold 18px'} w = {w} h = {h} type = {"submit"} bg={BUTTON_LINEAR_RIGHT_COLOR} _hover = {{ bgGradient: `linear(180deg, ${BUTTON_LINEAR_LEFT_COLOR}, ${BUTTON_LINEAR_RIGHT_COLOR})`}} borderRadius = {'4px'} >
      <Text color = {PRE_LOGIN_BUTTON_TEXT_COLOR} fontFamily = {PRE_LOGIN_BUTTON_TEXT_FONT_FAMILY} fontSize = {PRE_LOGIN_BUTTON_TEXT_FONT_SIZE} fontWeight = {PRE_LOGIN_BUTTON_TEXT_FONT_WEIGHT} >{textValue} </Text>
    </Button>
  );
}

export default ButtonField

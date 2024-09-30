import React, { useState } from 'react';
import { validateField } from '@/lib/utlils/utill_methods';
import { useRouter } from 'next/navigation';
import ButtonField from '../../components/button_field';
import TextField from '../../components/text_field';
import { Flex, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { PRE_LOGIN_PAGE_HEADING_TEXT_COLOR, PRE_LOGIN_PAGE_HEADING_FONT_FAMILY, PRE_LOGIN_PAGE_HEADING_FONT_SIZE, PRE_LOGIN_PAGE_HEADING_FONT_WEIGHT, PRE_LOGIN_PAGE_SUB_HEADING_FONT_FAMILY, PRE_LOGIN_PAGE_SUB_HEADING_FONT_SIZE, PRE_LOGIN_PAGE_SUB_HEADING_FONT_WEIGHT } from '@/lib/app/app_constants';
import { SignUpPageLabelDataValues } from '@/lib/interfaces/incorporation/pre_login_form/interfaces';

export const SignUpPasswordEnterData:SignUpPageLabelDataValues[] = [
  {
    id: 'password',
    type: 'TEXT',
    label: '',
    values: [],
    help_text: 'Enter Password',
    error_message: 'Please Enter Password',
    format_error_message: 'Invalid Password',
    format_validation: 'PASSWORD'
  }
]

const Emailverified = () => {
  const router = useRouter();
  const [data, setData] = useState(
    SignUpPasswordEnterData.map((field:SignUpPageLabelDataValues) => {

      let ansVal = '';
      return {
        id: field.id,
        value: ansVal as string | string[] | number,
        error: null as 'EMPTY' | 'FORMAT' | null
      }
    })
  );
  //console.log("Initial Data :", data);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string, field: SignUpPageLabelDataValues) => {
    const tempData: typeof data = JSON.parse(JSON.stringify(data));
    const index = tempData.findIndex((field) => field.id == id);

    if (index < 0) return;

    let value: string | number = event.target.value;
    const validateResult = validateField(value.toString(), field.format_validation)
    tempData[index].value = value;

    tempData[index].error = (validateResult.isEmpty == true ? "EMPTY" : validateResult.isContainsFormatError == true ? "FORMAT" : null)
    setData(tempData)
  }

  const submitValidate = () => {
    const tempData: typeof data = JSON.parse(JSON.stringify(data));
    tempData.forEach((input) => {
      let value = SignUpPasswordEnterData.filter((e) => e.id == input.id);
      value.map((e) => {
        if (e.type == "TEXT") {
          let value: number | string = input.value as number | string;
          const validateResult = validateField(value.toString(), e.format_validation)
          input.error = validateResult.isEmpty ? "EMPTY" : validateResult.isContainsFormatError ? "FORMAT" : null;
        }
      })
    })
    setData(tempData);
    return tempData.every((input) => input.error == null);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submitValidate()) return;
    console.log("Answer Data :", data);
    router.push('/client/login')
  }

  return (
    <>
    <Flex flexDir = {'column'} gap = {['4px', '4px', '16px']} color = {PRE_LOGIN_PAGE_HEADING_TEXT_COLOR}>
      <Heading fontFamily = {PRE_LOGIN_PAGE_HEADING_FONT_FAMILY} fontSize = {PRE_LOGIN_PAGE_HEADING_FONT_SIZE} fontWeight = {PRE_LOGIN_PAGE_HEADING_FONT_WEIGHT}>Enter your password</Heading>
      <Text fontFamily = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_FAMILY} fontSize = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_SIZE} fontWeight = {PRE_LOGIN_PAGE_SUB_HEADING_FONT_WEIGHT}>Your email has been verified. Please enter the password for the account associated with joe.allen@gmail.com to proceed with login.</Text>
    </Flex>

    <form onSubmit = {handleSubmit}>
      {/* Sign Up Page Input Field */}
      <SimpleGrid columns = {2} w = {'100%'} rowGap = {'16px'} columnGap = {'16px'}>
      {
        SignUpPasswordEnterData.map((e: SignUpPageLabelDataValues) => {
          let field = data.find((val) => val.id == e.id);
          let stateValue = field?.value!;
          const errorType = field?.error ?? null;
          const errorMessage = (errorType == null) ? '' : ((errorType == 'EMPTY') ? e.error_message : e.format_error_message);
          const isInValid = (errorType != null);

          switch (e.type) {
            case "TEXT":
              return (
                <GridItem colSpan = {2} key = {e.id}>
                  <TextField label = {e.label} value = {stateValue} placeholder = {e.help_text} format = {e.format_validation} inputProps = {{ onChange: event => onChange(event, e.id, e) }} isInValid = {isInValid} errorMessage = {errorMessage} />
                </GridItem>
              );
          }
        })
      }
      </SimpleGrid>

      {/* Verification Section */}
      <Flex mt = {'24px'}>
        <ButtonField textValue = {'Sign in'} />
      </Flex>
    </form>
  </>
);
}

export default Emailverified

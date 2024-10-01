import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone:true,
  },
 
    
  userAttributes: {
    
  
      preferredUsername: {
        mutable: true,
        required: false
      
    },
    'custom:role':{
    dataType:"String",
    mutable:true,
    maxLen:10,
    minLen:1
    }, 'custom:company_name':{
      dataType:"String",
      mutable:true,
      maxLen:30,
      minLen:1
    },

  }
});



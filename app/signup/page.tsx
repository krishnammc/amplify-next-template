"use client";

import { useState, useEffect, FormEvent } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
// import './page.css'
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, CheckboxField, Theme, ThemeProvider, useAuthenticator, View } from '@aws-amplify/ui-react';
import { SignUpInput, SignUpOutput, fetchUserAttributes, signIn, signUp } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import { Button, Flex, Heading, useTheme,Image,Text, background, FormControl, FormLabel, Input, InputGroup, Tab, TabList, TabPanel, TabPanels, Tabs, Select } from "@chakra-ui/react";
import { signOut } from 'aws-amplify/auth';
import axios from "axios";
import { useRouter } from "next/navigation";
import { BUTTON_LINEAR_RIGHT_COLOR, BUTTON_TEXT_COLOR } from "@/lib/app/app_constants";



Amplify.configure(outputs);

const client = generateClient<Schema>();


interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
  phone_number:HTMLInputElement
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
//     attributeMapping: {
//       'custom:company_name': 'company_name',
//       'custom:role': 'role',
//     }, 
//   },

  
// };



export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const router = useRouter()
  Amplify.configure(outputs);

// const existingConfig = Amplify.getConfig();
// Amplify.configure({
//   ...existingConfig,
//   API: {
//     ...existingConfig.API,
//     REST: outputs.custom.API,
//   },
// });
 

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  const { tokens } = useTheme();
  
  const theme: Theme = {
    name: 'Amplify Container',
    
    tokens: {
      
      components: {
        text:{
          color:"#fff"
        },
        heading:{
          color:"#fff"
        },
        authenticator: {
          
          router: {
            
            backgroundColor:BUTTON_TEXT_COLOR,
            borderWidth: '0',
            
          },
          form: {
            
            padding: `10px`,
          },
        },
        button: {
          primary: {
            backgroundColor: BUTTON_LINEAR_RIGHT_COLOR,
            color:"#000",
            
          },
          link: {
            color: '#fff',
          },
          color:"#fff"
        },
        select:{
          color:"#fff",
          backgroundColor:BUTTON_TEXT_COLOR
        },
        field:{
          fontSize:'16px',
          
          label:{
            color:"#fff",
            
          }
          
        },
       input:{
        color:"#fff"
       },
        icon:{
          
        },
        fieldcontrol: {
          color:"#fff",
        
        },
        fieldmessages:{
          error:{
            color:"#fff"
          },
          description:{
            color:"#fff"
          }
        },

        textfield:{
          color:"#fff",
          
        },
        tabs: {
          borderColor:"#fff",
          item: {
   
          
            borderColor:"#fff",
            color: "#fff",
            _active: {
              backgroundColor:BUTTON_LINEAR_RIGHT_COLOR,
              color: '#000',
            },
           
          },
          
        },
      },
    },
  };

  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={"20px"}>
          <Image
            alt="Amplify logo"
            src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={"20px"}>
          <Text color={"#000"}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={"20px"}
            
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
  
        return (
          
          <View textAlign="center">
            
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
           
            >
              Reset Password
            </Button>
          </View>
        );
      },
    
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={"20px"}
            
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
            
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={"20px"}
          
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    SetupTotp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={"20px"}
            
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={"20px"}
          
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ForgotPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={"20px"}
            
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={"20px"}
        
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };
  
const formFields = {
  
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
    
  },
  signUp: {
    given_name:{
      label: 'First Name:',
      placeholder: 'Enter your first name:',
      isRequired: true,
    }, 
     family_name:{
      label: 'last Name:',
      placeholder: 'Enter your last name:',
      isRequired: true,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 3,
    },  address:{
      label: 'address',
  
    },
    email:{
      label:"email"
    },
    phone_number: {
      dialCode: '+227'
    },
    'custom:company_name': {
      type:'String',
      label: 'Company Name',
      placeholder: 'Enter your name:',
      isRequired: false,
      order: 4,
    },
    'custom:role':{
      label:'role',
      id:'custom:role',
      type: 'String',
      isRequired:true,
      DefaultValue:"RFA"
    }

  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const apiCall = (user:any) => {

  const token = localStorage.getItem("CognitoIdentityServiceProvider.72f79shqof4g5qschugh46ttk9.e99af52c-8011-70d3-fe66-362ab355ab61.idToken")

  axios.get('https://jg0idlsox8.execute-api.ap-southeast-1.amazonaws.com/krishna', {
    headers: {
      'Content-Type': 'application/json',
      'authToken':token
    },
    // params: {
    //   id: 123
    // }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}

// console.log( printUserAttributes(),"data")
// const api = app.post('/do-something', async (req, res) => {
//   req.apiGateway.event.requestContext.authorizer.claims['<user-attribute>']
// });
async function handleSignOut() {
  await signOut({global:true})
}

 
const CustomSignup = () => {
  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault()
    const form = event.currentTarget
    // ... validate inputs
  
    // await signUp({
    //   username: form.elements.email.value,
    //   password: form.elements.password.value,
    //   options:{
    //     userAttributes:{
    //       'custom:role':form.elements["custom:role"].value
    //     }
    //   }

    // })
    router.push("/home")
  }
  return (
    <Flex flexDir={"column"}>
         <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column'}}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <label htmlFor="confirm_password">Confirm Password:</label>
      <input type="password" id="confirm_password" name="confirm_password" />
      <label htmlFor="custom:role">Role:</label>
     <select name="custom:role" id="custom:role">
      <option>RFA</option>
      <option>Client</option>
     </select>
     <br />
      <input type="submit" />
    </form>
        {/* <FormControl>
          <FormLabel>
            role
          </FormLabel>
          <InputGroup>
          <Select onChange={(event)=>{}} name="custom:role" >
            <option>Client</option>
            <option>RFA</option>
          </Select>
          </InputGroup>
        </FormControl> */}

    </Flex>
  );
};

  return (
    <Flex bg={BUTTON_TEXT_COLOR} flexDir={"row"} w={"100%"} maxW={"100vw"} maxH={"900px"} alignItems={"center"} justifyContent={"center"}>
      {/* <Button onClick={()=>{router.push("/client/signup")}}>Custom Signup</Button> */}
      <ThemeProvider theme={theme} >

     <Authenticator formFields={formFields}   initialState="signUp" 
// components={ {
//     SignUp: {
      
//       FormFields() {
//         const { validationErrors } = useAuthenticator();
//         const { toSignUp } = useAuthenticator();
     
//         return (
//           <>
//             <Tabs variant="line" colorScheme="blue">
//           <TabList>
//             <Tab>Personal Info</Tab>
//             <Tab>Terms and Conditions</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               {/* Personal Info tab content */}
//               <Authenticator.SignUp.FormFields />
              
          
//             </TabPanel>
//             <TabPanel>
//               {/* Terms and Conditions tab content */}
//               <CheckboxField
//                 name="acknowledgement"
//                 value="yes"
//                 label="I agree with the Terms and Conditions"
//               />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
          
//           </>
//         );
//       },
//     },
//   }}  
  //  services={{
  //   async validateCustomSignUp(formData) {
  //     if (!formData.acknowledgement) {
  //       return {
  //         acknowledgement: 'You must agree to the Terms and Conditions',
  //       };
  //     }
  //   },
  // }}
  >
  
  {({ signOut, user }) => (
    <Flex alignItems={"center"} justifyContent={"center"}>
    <main style={{background:"#fff", padding:"20px", borderRadius:"25px", width:"100%" , maxWidth:"500px" , alignSelf:"center" }}>
      <Text>user id: {user?.userId}</Text> 
      <Text>user email: {user?.signInDetails?.loginId}</Text> 
    
      <h1>My todos</h1>

      <button onClick={createTodo} style={{color:"black"}}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)} style={{cursor:"pointer", color:"#000"}}  >{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
        <Button onClick={()=>{apiCall(user)}} >Fetch</Button>
      <button style={{color:'#fff' , padding: "5px" , backgroundColor: "red"}} onClick={()=>{handleSignOut()}}>Sign out</button>
  
    </main>
    </Flex>
  )}

</Authenticator> 
          
       {/* <CustomSignup /> */}
      </ThemeProvider>
    
    </Flex>
  );
}

const CustomLogin = () => {
  return (
    <div>
      <h1>Custom Login</h1>
      <form>
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};



"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Button, Flex, Heading, useTheme,Image,Text, background } from "@chakra-ui/react";
import { color } from "framer-motion";


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

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
      // FormFields: {
      //   submitButton: (props:any) => (
      //     <Button
      //       fontWeight="normal"
      //       backgroundColor="red" // Update the background color here
      //       color="#fff" // Update the text color here
      //       onClick={props.onClick}
      //       size="small"
      //     >
           
      //     </Button>
      //   ),
      // },
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
  
  // const formFields = {
  //   signIn: {
  //     username: {
  //       placeholder: 'Enter your email',
  //     },
  //     submitButton: {
  //       background:'red',
  //       color:'black'
  //     }
  //   },
  //   signUp: {
  //     password: {
  //       label: 'Password:',
  //       placeholder: 'Enter your Password:',
  //       isRequired: false,
  //       order: 2,
  //     },
  //     confirm_password: {
  //       label: 'Confirm Password:',
  //       order: 1,
  //     },
  //   },
  //   forceNewPassword: {
  //     password: {
  //       placeholder: 'Enter your Password:',
  //     },
  //   },
  //   forgotPassword: {
  //     username: {
  //       placeholder: 'Enter your email:',
  //     },
  //   },
  //   confirmResetPassword: {
  //     confirmation_code: {
  //       placeholder: 'Enter your Confirmation Code:',
  //       label: 'New Label',
  //       isRequired: false,
  //     },
  //     confirm_password: {
  //       placeholder: 'Enter your Password Please:',
  //     },
  //   },
  //   setupTotp: {
  //     QR: {
  //       totpIssuer: 'test issuer',
  //       totpUsername: 'amplify_qr_test_user',
  //     },
  //     confirmation_code: {
  //       label: 'New Label',
  //       placeholder: 'Enter your Confirmation Code:',
  //       isRequired: false,
  //     },
  //   },
  //   confirmSignIn: {
  //     confirmation_code: {
  //       label: 'New Label',
  //       placeholder: 'Enter your Confirmation Code:',
  //       isRequired: false,
  //     },
  //   },
  // };
  
//   const components = {
//   Header,
//   SignIn: {
//     Header: SignInHeader,
//     Footer: SignInFooter
//   },
//   Footer
// };

// const CustomSignUp = withFormFieldProps({
//   usernameAlias: 'email',
//   formFields: [
//     {
//       type: 'email',
//       inputProps: {
//         placeholder: 'Email',
//         autocomplete: 'email',
//         style: {
//           backgroundColor: '#f7f7f7',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           fontSize: '16px',
//         },
//       },
//       label: 'Email',
//       required: true,
//     },
//     {
//       type: 'password',
//       inputProps: {
//         placeholder: 'Password',
//         autocomplete: 'new-password',
//         style: {
//           backgroundColor: '#f7f7f7',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           fontSize: '16px',
//         },
//       },
//       label: 'Password',
//       required: true,
//     },
//     {
//       type: 'name',
//       inputProps: {
//         placeholder: 'Name',
//         style: {
//           backgroundColor: '#f7f7f7',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           fontSize: '16px',
//         },
//       },
//       label: 'Name',
//       required: true,
//     },
//   ],
// });

// const CustomSignIn = withFormFieldProps({
//   usernameAlias: 'email',
//   formFields: [
//     {
//       type: 'email',
//       inputProps: {
//         placeholder: 'Email',
//         autocomplete: 'email',
//         style: {
//           backgroundColor: '#f7f7f7',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           fontSize: '16px',
//         },
//       },
//       label: 'Email',
//       required: true,
//     },
//     {
//       type: 'password',
//       inputProps: {
//         placeholder: 'Password',
//         autocomplete: 'current-password',
//         style: {
//           backgroundColor: '#f7f7f7',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           fontSize: '16px',
//         },
//       },
//       label: 'Password',
//       required: true,
//     },
//   ],
// });



  return (
        <Flex bg={"#fff"} flexDir={"row"} w={"100%"} maxW={"100vw"} justifyContent={"center"} alignItems={"center"}>
     
    <Authenticator   socialProviders={["google", "facebook"]}  components={components}>
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <button onClick={createTodo} style={{color:"black"}}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} onClick={() => deleteTodo(todo.id)} style={{cursor:"pointer"}} >{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
              Review next steps of this tutorial.
            </a>
          </div>
          <Button > edit </Button>
          <button style={{color:'black'}} onClick={signOut}>Sign out</button>
      
        </main>
      )}

    </Authenticator> 

    {/* <Flex w={"50%"} bg={"blue"}>
sdfdfdf
    </Flex> */}
    </Flex>
  );
}

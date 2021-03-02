import React from "react";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Form, Field, Formik } from "formik";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Box, FormLabel, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {

  const router = useRouter();

  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ usernameOrEmail: "", password: "", rememberMe: false }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({inputs: values});
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField 
            name="usernameOrEmail" 
            placeholder="username or email" 
            label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <FormLabel htmlFor="rememberMe">Remember Me</FormLabel>
              <Field type="checkbox" id="rememberMe" name="rememberMe" />
            </Box>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login);

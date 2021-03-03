import React from "react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Form, Field, Formik } from "formik";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import {
  Text,
  Flex,
  Center,
  Box,
  FormLabel,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();

  const [, login] = useLoginMutation();

  return (
    <>
      <Wrapper variant="small">
        <Center mb={10}>
          <Text fontSize="3xl">Log In</Text>
        </Center>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
            rememberMe: false,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ inputs: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
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
              <Flex mt={2}>
                <Box ml={1}>
                  <Field
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    margin="auto"
                  />
                </Box>
                <FormLabel ml={4} htmlFor="rememberMe">
                  Remember Me
                </FormLabel>
              </Flex>
              <Flex mt={4}>
                <Button isLoading={isSubmitting} type="submit">
                  Log In
                </Button>
                <NextLink href="/register">
                  <Link ml="auto" mr="5" mb="auto" mt="auto" fontSize="16px">
                    Register
                  </Link>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { useRegisterBuyerMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/InputField";
import { Text, Center, Flex, Link, Box, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

// placeholder interface, page doesn't take any params
interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  // router allows page navigation, useage: router.push(intended location string)
  const router = useRouter();

  // when using graphql mutations, takes format [, varname] = importedFunction
  const [, register] = useRegisterBuyerMutation();

  return (
    // wrapper is a component to control width of pages
    <Wrapper variant="small">
      {/* formik is a good form component, easy to use */}
      <Center mt={10} mb={10}>
        <Text fontSize="3xl">Register</Text>
      </Center>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // called on button click
          // sends the inputs to the server and saves the data returned
          // to this response variable
          const response = await register({ inputs: values });
          if (response.data?.registerBuyer.errors) {
            // error checking, setErrors will apply the errors
            // to the text boxes. try using a bad username or email
            // and see what happend
            // toErrorMap deconstructs the error field
            setErrors(toErrorMap(response.data.registerBuyer.errors));
          } else if (response.data?.registerBuyer.buyer) {
            // here is the router.push usage
            // user has been created, navigate to the homepage
            // TODO pass previous page as a param so the user is
            // returned to the page they came from
            // when using a link rather than a button redirect,
            // use the NextLink component. Works the same as <a>,
            // but uses relative path "/page"
            router.push("/");
          }
        }}
      >
        {/* isSubmitting is true when the user has clicked submit and
            the response is loading */}
        {({ isSubmitting }) => (
          <Form>
            {/* InputField is a component, just shortens the syntax. 
                Check the component for more info */}
            <InputField name="email" placeholder="email" label="Email" />
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={8}>
              <Button isLoading={isSubmitting} type="submit">
                Register
              </Button>
              <NextLink href="/login">
                <Link ml="auto" mb="auto" mt="auto" fontSize="16px">
                  Log In
                </Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
      <Flex w="100%" mt={2}>
        <NextLink href="/sell/register">
          <Link ml="auto">Become a Seller</Link>
        </NextLink>
      </Flex>
    </Wrapper>
  );
};

// notice the withUrqlClient. any page that communicates with the server
// needs this
export default withUrqlClient(createUrqlClient)(Register);

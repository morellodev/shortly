import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface Props {
  slug?: string;
  status?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const props: Props = {};

  if (typeof context.query.slug === "string") {
    props.slug = context.query.slug;
  }

  if (typeof context.query.status === "string") {
    props.status = context.query.status;
  }

  return {
    props,
  };
};

const Home: NextPage<Props> = (props) => {
  const hasError = typeof props.status === "string" && props.status !== "200";

  return (
    <>
      <Head>
        <title>Shortly</title>
      </Head>
      <SimpleGrid as="main" minH="100vh" placeItems="center">
        <Stack
          as="form"
          direction={{ base: "column", md: "row" }}
          method="get"
          action="/api/get-url"
        >
          <FormControl isInvalid={hasError} isRequired>
            <Input
              type="text"
              name="slug"
              defaultValue={props.slug}
              placeholder="Slug"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              No matching URL found
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" flexShrink={0}>
            Open URL
          </Button>
        </Stack>
      </SimpleGrid>
    </>
  );
};

export default Home;

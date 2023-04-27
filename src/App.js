import SupergraphRequests from "./SupergraphRequests.js";
import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Stack, Heading, Text, Link, Center } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Center>
        <Stack padding={4} maxWidth="600px">
          <Heading>Send traffic to your supergraph</Heading>
          <Text fontSize="sm">
            This tool sends operations to your Poetic Plates API. You can{" "}
            <Link
              as="a"
              isExternal
              color="purple.700"
              href="https://codesandbox.io/s/compassionate-rain-5qe3qh?file=/src/App.js"
            >
              check out the source code <ExternalLinkIcon mx="2px" />
            </Link>{" "}
            to find out what's happening behind the scenes!
          </Text>
          <SupergraphRequests />
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

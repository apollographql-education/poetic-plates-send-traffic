import { UnorderedList, ListItem, Box, Link } from "@chakra-ui/react";

export default function Troubleshooting() {
  return (
    <Box border="2px solid" p={4} borderRadius={4} borderColor="red.800">
      <b>Troubleshooting tips:</b>
      <UnorderedList>
        <ListItem>Confirm that your router URL is correct</ListItem>
        <ListItem>
          Confirm that your router is set to allow requests from this origin
          (refer to{" "}
          <Link
            color="teal.500"
            href="http://apollographql.com/tutorials/getting-started-with-graphos/05-sharing-supergraph"
          >
            GraphOS: Basics - Lesson 5)
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}

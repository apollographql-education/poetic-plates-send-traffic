import { Box, UnorderedList, ListItem, Highlight } from "@chakra-ui/react";

export default function Log({ log, operations }) {
  if (log.length === 0) return;

  return (
    <Box
      height="200px"
      overflow="scroll"
      border="2px solid"
      borderColor="gray.300"
      borderRadius={4}
    >
      <UnorderedList px={8} py={2}>
        {log.map((l) => (
          <ListItem>
            <Highlight
              query={operations.map((o) => o.queryName)}
              styles={{ px: "1", py: "1", bg: "orange.100" }}
            >
              {l}
            </Highlight>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

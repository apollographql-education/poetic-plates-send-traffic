import { useState } from "react";
import "./styles.css";
import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Stack
} from "@chakra-ui/react";

import { GetRecipeQuery, GetRandomRecipeQuery } from "./queries.js";
import { randomNumber, sleep } from "./utils";
import Troubleshooting from "./components/Troubleshooting";
import Log from "./components/Log";

export default function SupergraphRequests() {
  const [numberOfOperations, setNumberOfOperations] = useState(15);
  const [routerURL, setRouterURL] = useState("");
  const [log, setLog] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isRouterURLValid, setIsRouterURLValid] = useState(false);
  const [showTroubleshootingTips, setShowTroubleshootingTips] = useState(false);

  // The list of possible operations to send, imported from queries.js
  const operations = [
    { queryString: GetRecipeQuery, queryName: "GetRecipe" },
    { queryString: GetRandomRecipeQuery, queryName: "GetRandomRecipe" }
  ];

  async function sendOperations(routerURL, numberOfOperationsToSend) {
    setIsSending(true);

    if (routerURL === "") {
      setLog((currLog) => ["Error: Please provide a router URL", ...currLog]);
      setIsSending(false);
      return;
    }

    setLog((currLog) => [`Connecting to router at ${routerURL}`, ...currLog]);

    for (let i = 0; i < numberOfOperationsToSend; i++) {
      // We'll select a random query each time
      const queryToSend =
        operations[Math.floor(Math.random() * operations.length)];

      setLog((currLog) => [
        `Sending query ${queryToSend.queryName}`,
        ...currLog
      ]);

      try {
        const response = await fetch(routerURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apollographql-client-name": "codesandbox",
            "apollographql-client-version": "1.0"
          },
          body: JSON.stringify({
            query: queryToSend.queryString
          })
        });

        if (!response.ok) {
          setIsSending(false);
          console.log(response);
          setLog((currLog) => [
            `Something went wrong ${response.statusText}`,
            ...currLog
          ]);
          setShowTroubleshootingTips(true);
          return;
        }

        const data = await response.json();
        console.log(`Query sent for: ${queryToSend.queryName}`);
        console.log("Response ", data);
      } catch (e) {
        setIsSending(false);
        console.log("Error:", e);
        setLog((currLog) => [`Error: ${e.message}`, ...currLog]);
        setShowTroubleshootingTips(true);
        return;
      }

      // Wait a random amount of time in between operations
      // This allows our metrics to be spread out more and randomized
      const sleepTime = randomNumber(1, 5) * 1000; // in milliseconds

      setLog((currLog) => [
        `Sleeping for ${Math.round(sleepTime / 1000)} seconds...`,
        ...currLog
      ]);

      await sleep(sleepTime);
    }

    setLog((currLog) => [
      "Finished sending operations. Check your supergraph's Operations page for metrics.",
      ...currLog
    ]);

    setIsSending(false);
  }

  return (
    <Stack>
      <FormControl isRequired isInvalid={!isRouterURLValid}>
        <FormLabel>Router URL</FormLabel>
        <Input
          placeholder="https://your-router-url.com/graphql"
          value={routerURL}
          onChange={(e) => {
            setRouterURL(e.target.value);

            if (e.target.value !== "") {
              setIsRouterURLValid(true);
            }
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Number of operations</FormLabel>
        <NumberInput
          defaultValue={15}
          min={1}
          max={100}
          value={numberOfOperations}
          onChange={(val) => setNumberOfOperations(val)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button
        onClick={() => {
          setLog([]);
          setShowTroubleshootingTips(false);
          sendOperations(routerURL, numberOfOperations);
        }}
        isDisabled={isSending || !isRouterURLValid}
        isLoading={isSending}
        loadingText="Sending operations"
      >
        Send operations
      </Button>
      <Log log={log} operations={operations} />
      {showTroubleshootingTips && <Troubleshooting />}
    </Stack>
  );
}

import React from "react";
import { Box, Text } from "ink";

export default function RandomQuote({ result }) {
    if (result.error) {
        return <Text color={"red"}>{JSON.stringify(result, null, 5)}</Text>
    }
    return (
        <Box
            flexDirection="column"
            gap={1}
            width={80}
            borderStyle={"round"}
            borderColor={"cyanBright"}
            padding={1}
            justifyContent="flex-start"
        >
            <Text color={"yellowBright"}>{result.quote}</Text>
            <Box justifyContent="flex-end" marginTop={1}>
                <Text color={"magentaBright"}>{result.author}</Text>
            </Box>
        </Box>
    )
}
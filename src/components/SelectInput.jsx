import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export default function ({ options, onSelect }) {
    const [index, setIndex] = useState(0);

    useInput((input, key) => {
        if (key.upArrow) setIndex(i => Math.max(0, i - 1));
        if (key.downArrow) setIndex(i => Math.min(options.length - 1, i + 1));
        if (key.return) {
            onSelect(options[index])
        }
    });

    return (
        <Box flexDirection="column">
            {options.map((opt, i) => (
                <Text key={opt} color={i === index ? "green" : "gray"}>
                    {i === index ? "▶ " : "  "}
                    {opt}
                </Text>
            ))}
        </Box>
    );
}

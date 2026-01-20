import React from "react";
import { Text } from "ink";

export default function IPInfo({ result }) {
    if (result.error) {
        return <Text color={"red"}>{JSON.stringify(result, null, 5)}</Text>
    }
    return <Text>{JSON.stringify(result, null, 5)}</Text>
}
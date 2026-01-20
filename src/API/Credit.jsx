import open from "open";
import React, { useEffect } from "react";
import { Text } from "ink";

export default function Credit({ result }) {
    useEffect(() => {
        open("https://github.com/bpn333");
    }, []);

    return <Text>{result}</Text>
}
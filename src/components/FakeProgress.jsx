import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";

export default function Loader({
    func,
    expectedTime = 4,
    onRes
}) {
    const total = 70;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const dta = await func();
            setProgress(total);
            onRes(dta);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const intervalMs = (expectedTime * 1000) / total;

        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= total - 3) {
                    clearInterval(timer);
                    return p;
                }
                return p + 1;
            });
        }, intervalMs);

        return () => clearInterval(timer);
    }, [expectedTime]);

    const bar =
        "█".repeat(progress) +
        "░".repeat(total - progress);

    const percent = Math.round((progress / total) * 100);

    if (progress == total) return;

    return (
        <Box marginY={1} marginLeft={1}>
            <Text color={total * 0.8 < progress ? "green" : total * 0.3 < progress ? "yellow" : "red"}>{bar}</Text>
            <Text color="gray"> {percent}%</Text>
        </Box>
    );
}

import open from "open";
import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../../config";

export default function AnimeSearch({ result }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useInput((inpt, key) => {
        if (key.rightArrow)
            setCurrentIndex(p => (p + 1) % result.length);
        else if (key.leftArrow)
            setCurrentIndex(p => p == 0 ? result.length - 1 : p - 1);
        else if (inpt == "o")
            open(result[currentIndex].url)
    })

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
            <Box justifyContent="center">
                <Text {...THEME.text.info}>'o': open anime page  | {'<'}- {currentIndex + 1}/{result.length} -{'>'}</Text>
            </Box>

            <Box justifyContent="center" flexWrap="wrap">
                {result[currentIndex].titles?.map((n, indx) => (
                    <Text color={indx == 0 ? "yellowBright" : "whiteBright"} key={indx}> {indx == 0 ? n.title : "[" + n.title + "]"} </Text>
                ))}
            </Box>

            <Text
                color={"magentaBright"}
            >
                Genres: {result[currentIndex].genres.map(nm => " " + nm.name)}
            </Text>

            <Text
                color={"whiteBright"}
            >
                Score: {result[currentIndex].score} | Popularity: {result[currentIndex].popularity}
            </Text>

            <Box justifyContent="space-between" flexWrap="wrap">
                <Text
                    color={"green"}
                >
                    Episodes: {result[currentIndex].episodes} | Status: {result[currentIndex].status}
                </Text>

                <Text
                    color={"gray"}
                >
                    Aired On: {result[currentIndex].aired?.string}
                </Text>
            </Box>
        </Box>
    )
}
import open from "open";
import React from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../../config";

export default function RandomAnime({ result }) {

    useInput((inpt, key) => {
        if (inpt == "o")
            open(result.url);
    }, { isActive: !result.error })

    if (result.error) {
        return <Text color={"red"}>ERROR FETCHING {result.url}</Text>
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
            <Text {...THEME.text.info}>Press 'o' to open anime page</Text>

            <Text
                color={"yellowBright"}
            >
                Name: {result.titles?.map((n, indx) => {
                    const repeatCount = 3;
                    if (indx == result?.titles?.length - 1)
                        return n.title;
                    else
                        return n.title + " ".repeat(repeatCount) + "|" + " ".repeat(repeatCount)
                })}
            </Text>

            <Text
                color={"magentaBright"}
            >
                Genres: {result.genres.map(nm => " " + nm.name)}
            </Text>

            <Text
                color={"whiteBright"}
            >
                Score: {result.score} | Popularity: {result.popularity}
            </Text>

            <Text
                color={"green"}
            >
                Episodes: {result.episodes} | Status: {result.status}
            </Text>

            <Text
                color={"gray"}
            >
                Aired On: {result.aired?.string}
            </Text>
        </Box>
    )
}
import open from "open";
import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../config";
import FakeProgress from "./components/FakeProgress";
import SelectInput from "./components/SelectInput";

let COMMANDS_TIMERS = new Set();
const COMMANDS_MAP = {
    "Get Random Quote": {
        func: () => fetch("https://quotes-api-self.vercel.app/quote").then(r => r.json())
            .catch(e => ({
                error: "Request Failed",
                url: "https://quotes-api-self.vercel.app/quote",
            })),
        resultParser: (res) => {
            if (res.error) {
                return <Text color={"red"}>{JSON.stringify(res, null, 10)}</Text>
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
                    <Text color={"yellowBright"}>{res.quote}</Text>
                    <Box justifyContent="flex-end" marginTop={1}>
                        <Text color={"magentaBright"}>{res.author}</Text>
                    </Box>
                </Box>
            )
        },
        expectedTime: 0.5
    },
    "Get Random Anime to Watch": {
        func: () => fetch("https://api.jikan.moe/v4/random/anime").then(r => r.json()).then(d => {
            if (!d.data) throw Error();
            const dataa = d.data;
            const dta = {
                url: dataa.url,
                titles: dataa.titles,
                genres: dataa.genres,
                status: dataa.status,
                episodes: dataa.episodes,
                aired: dataa.aired,
                score: dataa.score,
                popularity: dataa.popularity
            }
            return dta;
        })
            .catch(e => ({
                error: "Request Failed",
                url: "https://api.jikan.moe/v4/random/anime",
            })),
        resultParser: (res) => {
            if (res.error) {
                return <Text color={"red"}>ERROR FETCHING {res.url}</Text>
            }
            const timer = setTimeout(() => {
                open(res.url);
                COMMANDS_TIMERS.delete(timer);
            }, 8000);
            COMMANDS_TIMERS.add(timer);
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
                    <Text {...THEME.text.info}>Anime page will open in 8 seconds</Text>

                    <Text
                        color={"yellowBright"}
                    >
                        Name: {res.titles?.map((n, indx) => {
                            const repeatCount = 3;
                            if (indx == res?.titles?.length - 1)
                                return n.title;
                            else
                                return n.title + " ".repeat(repeatCount) + "|" + " ".repeat(repeatCount)
                        })}
                    </Text>

                    <Text
                        color={"magentaBright"}
                    >
                        Genres: {res.genres.map(nm => " " + nm.name)}
                    </Text>

                    <Text
                        color={"whiteBright"}
                    >
                        Score: {res.score} | Popularity: {res.popularity}
                    </Text>

                    <Text
                        color={"green"}
                    >
                        Episodes: {res.episodes} | Status: {res.status}
                    </Text>

                    <Text
                        color={"gray"}
                    >
                        Aired On: {res.aired?.string}
                    </Text>
                </Box>
            )
        },
        expectedTime: 1.3
    },
    "Feeling Lucky": {
        func: async () => {
            const texts = [
                "bpn333",
                "Hello World",
                "Fuck You!",
                "Hello There",
                "Lucky Click",
                "Surprise Me",
                "Random Vibes",
                "Good Energy",
                "Try Again",
                "Magic Moment",
                "Why Not?",
                "Instant Win",
                "Feeling Bold",
                "Just Clicked",
                "Pure Chance",
                "Today’s Pick",
                "Quick Smile",
                "Wildcard",
                "Let’s Go",
                "Unexpected",
                "Fortune Time",
                "Click Fate",
                "Random Joy"
            ]
            return fetch(`https://asciified.thelicato.io/api/v2/ascii?text=${encodeURI(texts[Math.floor(Math.random() * texts.length)])}`)
                .then(r => r.text())
                .catch(e => "REQUEST FAILED [https://asciified.thelicato.io/api/v2/ascii?text=bpn333]")
        },
        expectedTime: 0.1
    },
    "Credit": {
        func: () => {
            open("https://github.com/bpn333")
            return "Thank You!"
        }
    }
}

export default function () {
    const [command, setCommand] = useState();
    const [result, setResult] = useState();

    useInput((inpt, key) => {
        if (inpt == "r" || inpt == "q" || key.escape) {
            setCommand(null);
            setResult('');

            // hacky way to clear all timeouts
            for (const timr of COMMANDS_TIMERS) clearTimeout(timr);
            COMMANDS_TIMERS.clear();
        }
    })

    if (!process.stdout.isTTY) {
        console.log("Open this URL:", url);
        return;
    }

    return (
        <>
            <Box marginY={2} {...THEME.box.heading}>
                <Text {...THEME.text.title}>RANDOM STUFF TO TRY</Text>
            </Box>
            {
                command ?
                    <FakeProgress
                        func={COMMANDS_MAP[command].func}
                        expectedTime={COMMANDS_MAP[command].expectedTime}
                        onRes={(d) => {
                            if (COMMANDS_MAP[command].resultParser)
                                setResult(COMMANDS_MAP[command].resultParser(d))
                            else
                                setResult(<Text>{d}</Text>)
                        }}
                    />
                    :
                    <SelectInput options={Object.keys(COMMANDS_MAP)} onSelect={(d) => setCommand(d)} />
            }
            {
                result &&
                <>
                    <Box>
                        {result}
                    </Box>
                    <Box marginY={1}>
                        <Text {...THEME.text.info}>press [r|q|esc] to reset</Text>
                    </Box>
                </>
            }
        </>
    )
}
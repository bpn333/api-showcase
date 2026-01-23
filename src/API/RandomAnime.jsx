import open from "open";
import React, { useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../../config";
import Chafa from "chafa-wasm";

const chafa = await Chafa();

export default function RandomAnime({ result }) {
    const [imgOut, setImgOut] = useState();

    const imgUrl = result?.images?.jpg?.image_url;
    useEffect(() => {
        if (!imgUrl) return;

        let cancelled = false;

        (async () => {
            try {
                const res = await fetch(imgUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const arrayBuffer = await res.arrayBuffer();

                const decodedImage = await new Promise((resolve, reject) => {
                    chafa.decodeImage(arrayBuffer, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
                const result = await new Promise((resolve, reject) => {
                    chafa.imageToAnsi(
                        decodedImage,
                        {
                            height: 15,
                            symbols: "braille",
                            colors: chafa.ChafaCanvasMode.CHAFA_CANVAS_MODE_TRUECOLOR.value
                        },
                        (err, out) => {
                            if (err) reject(err);
                            else resolve(out);
                        }
                    );
                });

                if (!cancelled) {
                    setImgOut(result.ansi);
                }
            } catch (e) {
                if (!cancelled) {
                    setImgOut("Failed to render image: " + (e.message || e));
                }
            }
        })();

        return () => { cancelled = true; };
    }, [imgUrl]);

    useInput((inpt, key) => {
        if (inpt == "o")
            open(result.url);
    }, { isActive: !result.error })

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
                <Text {...THEME.text.info}>Press 'o' to open anime page</Text>
            </Box>

            <Box justifyContent="center" flexWrap="wrap">
                {result.titles?.map((n, indx) => (
                    <Text color={indx == 0 ? "yellowBright" : "whiteBright"} key={indx}> {indx == 0 ? n.title : "[" + n.title + "]"} </Text>
                ))}
            </Box>

            <Box justifyContent="center">
                <Text>
                    {imgOut}
                </Text>
            </Box>

            <Box justifyContent="space-between" borderStyle={"classic"} borderColor={"gray"}>
                <Text color={"whiteBright"}>
                    ⭐: {result.score || "??"} | 🔥: {result.popularity || "??"} | 📺: {result.episodes || "??"}
                </Text>

                <Text
                    color={"gray"}
                >
                    📅: {result.aired?.string}
                </Text>
            </Box>

            <Box justifyContent="center">
                <Text color={"green"}>
                    Rating: {result.rating || "??"} | EP Info: [{result.duration || "??"}]/[{result.status || "??"}]
                </Text>
            </Box>

            <Box justifyContent="center">
                <Text
                    color={"magentaBright"}
                >
                    {result.genres.map((nm, indx) => indx == 0 ? nm.name : ", " + nm.name)}
                </Text>
            </Box>
        </Box>
    )
}
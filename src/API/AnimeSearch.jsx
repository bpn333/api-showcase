import open from "open";
import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../../config";
import Chafa from "chafa-wasm";

const chafa = await Chafa();

export default function AnimeSearch({ result }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgOut, setImgOut] = useState();

    const imgUrl = result[currentIndex]?.images?.jpg?.image_url;
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

            <Box justifyContent="center">
                <Text>
                    {imgOut}
                </Text>
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
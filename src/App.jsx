import React, { useEffect, useRef, useState } from "react";
import { Box, Text, useInput } from "ink";
import { THEME } from "../config";
import FakeProgress from "./components/FakeProgress";
import SelectInput from "./components/SelectInput";
import FillInput from "./components/FillInput";
import COMMANDS_MAP from "./API/COMMANDS_MAP";

export default function () {
    const [command, setCommand] = useState();
    const [commandInputs, setCommandInputs] = useState(null);
    const [result, setResult] = useState();
    const refreshToken = useRef(0);

    useInput((inpt, key) => {
        if (inpt == "q" || key.escape) {
            setCommand(null);
            setCommandInputs(null);
            setResult('');
        } else if (inpt == " ") {
            setResult('')
            refreshToken.current += 1;
        }
    },
        {
            isActive: result
        }
    )

    if (!process.stdout.isTTY) {
        console.log("SORRY CANT RUN HERE");
        return;
    }

    return (
        <>
            <Box marginTop={2} marginBottom={1} marginLeft={2} {...THEME.box.heading}>
                <CoolTitle />
            </Box>
            {
                command ?
                    COMMANDS_MAP[command].inputs && !commandInputs
                        ?
                        <FillInput inputs={COMMANDS_MAP[command].inputs} onFill={(dta) => setCommandInputs(dta)} />
                        :
                        <FakeProgress
                            func={
                                commandInputs ?
                                    async () => COMMANDS_MAP[command].func(commandInputs)
                                    : COMMANDS_MAP[command].func
                            }
                            expectedTime={COMMANDS_MAP[command].expectedTime}
                            onRes={(d) => {
                                setResult(React.createElement(COMMANDS_MAP[command].component, { result: d }));
                            }}
                            key={refreshToken.current}
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
                    <Box marginY={1} marginLeft={1}>
                        <Text {...THEME.text.info}>[q|esc] to quit -:|:- [SPACE] to redo</Text>
                    </Box>
                </>
            }
        </>
    )
}

const CoolTitle = () => {
    const [title, setTitle] = useState("api-showcase".split(''));
    const indexToEdit = useRef(0);

    useEffect(() => {
        const intr = setInterval(() => {
            setTitle(p => {
                const newTitle = [...p];
                newTitle[indexToEdit.current] =
                    /[A-Z]/.test(newTitle[indexToEdit.current]) ?
                        newTitle[indexToEdit.current].toLowerCase() :
                        newTitle[indexToEdit.current].toUpperCase();
                indexToEdit.current = Math.floor(Math.random() * title.length);
                return newTitle;
            })
        }, 333)
        return () => clearInterval(intr)
    }, [])

    return (
        <>
            {
                title.map(c => (
                    <Text color={/[A-Z]/.test(c) ? "yellowBright" : "whiteBright"}>{c}</Text>
                ))
            }
        </>
    )
}
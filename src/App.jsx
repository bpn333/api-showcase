import React, { useRef, useState } from "react";
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
        } else if (inpt == "r") {
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
                <Text {...THEME.text.title}>api-showcase</Text>
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
                    <Box marginY={1}>
                        <Text {...THEME.text.info}>[q|esc] to quit -:|:- [r] to redo</Text>
                    </Box>
                </>
            }
        </>
    )
}
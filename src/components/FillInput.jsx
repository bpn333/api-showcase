import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { Box, Text } from "ink";
import SelectInput from "./SelectInput";

// Input object
// {
//     label,
//     key,
//     type: optional,
//     options: [type:select] 
// }

export default function FillInput({ inputs, onFill }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [values, setValues] = useState({});

    const currentInput = inputs[currentIndex];

    const handleSubmit = (value) => {
        const newValues = { ...values, [currentInput.key]: value };
        setValues(newValues);
        if (currentIndex < inputs.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onFill(newValues);
        }
    };

    return (
        <Box flexDirection="column">
            <Text>{currentInput.label}</Text>
            {currentInput.type == "select" ?
                <SelectInput
                    options={currentInput.options}
                    onSelect={handleSubmit}
                />
                :
                <TextInput
                    value={values[currentInput.key] || ''}
                    onChange={(value) => setValues({ ...values, [currentInput.key]: value })}
                    onSubmit={handleSubmit}
                />}
        </Box>
    );
}
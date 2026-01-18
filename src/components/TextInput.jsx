import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export function TextInput({ value = "", onChange, onSubmit }) {
    const [internal, setInternal] = useState(value);

    useInput((input, key) => {
        if (key.return) {
            onSubmit?.(internal);
            return;
        }

        if (key.backspace || key.delete) {
            const next = internal.slice(0, -1);
            setInternal(next);
            onChange?.(next);
            return;
        }

        if (!key.ctrl && !key.meta) {
            const next = internal + input;
            setInternal(next);
            onChange?.(next);
        }
    });

    return (
        <Box>
            <Text color="cyan">{internal}</Text>
            <Text color="green">▌</Text>
        </Box>
    );
}
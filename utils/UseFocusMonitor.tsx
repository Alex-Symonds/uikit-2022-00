import React from 'react';

export default function useFocusMonitor(){
    const [inputHasFocus, setInputHasFocus] = React.useState(false);

    function handleFocus(){
        setInputHasFocus(true);
    }

    function handleBlur(){
        setInputHasFocus(false);
    }

    return {
        inputHasFocus,
        handleFocus,
        handleBlur,
    }
}
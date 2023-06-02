export function convertRemToPixels(rem : number){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getClassName(styledComponent : any){
    const className = String(styledComponent).replace(".", "");
    return className;
}

// Convert hex or rgb CSS values into RGBA
export function rgba(colorStr : string, opacity: number | string){
    /* Guide for if you haven't used regex in a while:
       ---------------------------------------------------------------------------------------------------
        Hex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/
            ^                   Beginning of string
            #                   # character, because it's a hex code
            (                   Begin a group. This group will define "valid hex codes"
                [a-fA-F0-9]{3}      3 x any character that's a-f, A-F or 0-9
                |                   OR
                [a-fA-F0-9]{6}      6 x any character that's a-f, A-F or 0-9
            )                   End of the group
            $                   End of string

        RGB = ^rgb\((([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5])),\s?(([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5])),\s?(([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))\)$
            ^                               Beginning of string
            rgb\(                           Literally "rgb(", with the bracket escaped
            (                               Begin a group. This group will define "one valid argument in a CSS RGB function, with a comma after it"
                (                               Begin a group. This group will define "one valid argument in a CSS RGB function"
                    ([0-1]?[0-9]?[0-9])             0-199. The "?"s make the first two digits optional, so this says we want 1-3 digits and if there are three, the first must be 0 or 1.
                    |                               OR
                    (2[0-4][0-9])                   200-249. Three digits required, first must be 2, second can be 0-4, third can be 0-9.
                    |                               OR
                    (25[0-5])                       250-255. Three digits required, first two must be 2 and 5.
                )                               End of the "valid RGB argument" group
                ,                               Literally a comma. (rgb wants comma-separated arguments)
                \s*                             0 or more spaces, so as to support "rgb(1,2,3)" and "rgb(1, 2, 3)" and, indeed, "rgb(1,    2,  245)"
            )                               End of the "valid arg, with comma" group
            {2}                             Two of the preceeding token, i.e. "two valid args, with a comma after each"
            
            (([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))
                                            This is the "one valid argument" group copy/pasted again, only this time without the comma

            \)                              Literally ")", with the escape character
            $                               End of string

    */
    const colorSyntaxes = [
        {
            regex: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
            getRgba: rgbaFromHex,
        },
        {
            regex: /^rgb\(((([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))\s*,\s*){2}(([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))\s*\)$/,
            getRgba: rgbaFromRgb 
        }
    ];


    function rgbaFromRgb() : string {
        // When this is called, colorStr should be in the format "rgb(#,#,#)"
        /*
            regex helper:
            This is the same as before, except I added "positive look-behind" around 
            "^rgb\(" and positive look ahead around "\)$" so it snips out the part
            with the comma-separated numbers
        */
        const regexCSVs = /(?<=^rgb\()((([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))\s*,\s*){2}(([0-1]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))(?=\s*\)$)/;
        let regexMatch = colorStr.match(regexCSVs);
        if(regexMatch !== null && regexMatch.length > 0){
            return formatAsRGBA(regexMatch[0]);
        }
        return colorStr;
    }


    function rgbaFromHex() : string {
        // When this is called, colorStr should be either 6 or 3 hex digits preceeded with a #
        // e.g. #1A2F3D or #A6B
    
        // Get rid of the "#"
        let hexStr = colorStr.slice(1);
    
        // Convert 3-digit codes to 6, so we can proceed under the assumption of always having 6 digits
        hexStr = hexStr.length === 3 ?
                    convertThreeDigitHexToSix(hexStr)
                    : hexStr;
    
        // Convert each of the three colours to a decimal value
        let rgbArr : number[] = [];
        for(let idx = 0; idx < hexStr.length; idx += 2){
            let twoHexDigits : string = hexStr.slice(idx, idx + 2);
            let decimalVal : number = parseInt(twoHexDigits, 16);
            rgbArr.push(decimalVal);
        }
    
        return formatAsRGBA(rgbArr);
    }
    

    function formatAsRGBA(rgbValues: number[] | string) : string {
        // rgbValues should be formatted as either:
        //      > string, e.g. "255, 0, 23"
        //      > array, e.g. [255, 0, 23]
        const separator : string = ", ";
    
        let rgbStr : string = typeof rgbValues === "string" ?
                                rgbValues
                                : rgbValues.join(separator);
    
        return `rgba(${rgbStr}${separator}${opacity})`;
    }


    // Convert 3-character hex syntax to 6 characters
    function convertThreeDigitHexToSix(hexStr : string) : string {
        if(hexStr.length === 3){
            let tempStr : string = hexStr[0] + hexStr[0] + hexStr[1] + hexStr[1] + hexStr[2] + hexStr[2];
            hexStr = tempStr;
        }
        return hexStr;
    }
    

    // Identify if this string is hex, RGB, or neither.
    // If none, return the original string.
    // Otherwise, return the result of the RGBA conversion function linked to the matching regex
    let matchResult : RegExpMatchArray | null = null;
    for(let i = 0; i < colorSyntaxes.length; i++){
        matchResult = colorStr.trim().match(colorSyntaxes[i].regex);
        if(matchResult !== null && matchResult.length > 0){
            return colorSyntaxes[i].getRgba();
        }
    }
    return colorStr;
}



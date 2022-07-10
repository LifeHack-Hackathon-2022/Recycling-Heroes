export function splitPascalCaseStringWithDelimiter(string, delimiter) {
    const tokens = []
    var currToken = ''
    
    for (var i = 0; i < string.length; i++) {
        var char = string.charAt(i)
        
        if (isUpperCase(char)) {
            tokens.push(currToken)
            currToken = char.toLowerCase()
        } else {
            currToken += char
        }
    }
    
    tokens.push(currToken)
    return tokens.join(delimiter)
}

function isUpperCase(string) {
    return string.toUpperCase() === string
}
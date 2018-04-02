// pattern(s)
export const reHasBrackets = /\[|\]/;
export const reStartWithBracket = /^\[/;
export const reParts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;
export const reDot = /\.(?![^[]*\])/g;

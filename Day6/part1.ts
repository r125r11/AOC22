import { input, sample } from "./input";

const output = input.split('').reduce((acc, curr, i, og)=>{
    if(og[i] !== og[i+1] && og[i] !== og[i+2] && og[i] !== og[i+3]
        && og[i+1] !== og[i+2] && og[i+1] !== og[i+3]
        && og[i+2] !== og[i+3]
        ){
            console.log(og[i], og[i+1], og[i+2], og[i+3])
            acc.push(i)
        }
    return acc
},[] as number[])

console.log(output[0]+4)
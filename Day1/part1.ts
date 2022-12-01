import { input, sample } from "./source";

const output = input.split(/\r?\n/).reduce((acc, v) => {
    if(v !== ''){
        acc[acc.length-1] += Number(v)
    } else {
        acc.push(0)
    }
    return acc
},[] as number[])

console.log(Math.max(...output))

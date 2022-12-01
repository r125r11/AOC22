import { input, sample } from "./source";

const output = input
    .split(/\r?\n/)
    .reduce((acc, v) => {
        if(v !== ''){
            acc[acc.length-1] += Number(v)
        } else {
            acc.push(0)
        }
        return acc
    },[] as number[])
    .sort((a,b)=> b - a)



console.log(output[0] + output[1] + output[2])

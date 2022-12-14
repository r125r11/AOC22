import { input, sample } from "./input";

const output = input
    .split(/\r?\n/)
    .map(pair => pair.split(','))
    .reduce((acc, curr)=>{
        const left = curr[0].split('-').map(v => Number(v))
        const right = curr[1].split('-').map(v => Number(v))
        if((left[0] <= right[0] && left[1] >= right[1]) || (left[0] >= right[0] && left[1] <= right[1])){
            return acc+1
        }
        return acc
    },0)

console.log(output)
import { input2, sample } from "./input";

const output = input2
    .split(/\r?\n/)
    .map(pair => pair.split(','))
    .reduce((acc, curr)=>{
        const left = curr[0].split('-').map(v => Number(v))
        const right = curr[1].split('-').map(v => Number(v))
        if(left[0] <= right[1] && left[1] >= right[0]){
            return acc+1
        }
        return acc
    },0)

console.log(output)
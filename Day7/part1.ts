import { sample } from "./input";


let lastKey = ''
const output = sample
    .split(/\r?\n/)
    .reduce((acc,curr) => {
        const command = curr.split(' ')
        if(command[0] === '$'){
            if(command[1] === 'cd'){
                if(command[2] === '..'){
                    return acc
                } else {
                    lastKey = command[2]
                    acc[command[2]] = []
                }
            }
        } else {
            if(!isNaN(Number(command[0]))){
                acc[lastKey].push(command[0])
            } else {
                acc[lastKey].push(command[1])
            }
        }
        return acc
    },{} as {[key: string]: (string)[]})

const sizes:{[key: string]: number} = Object(output).keys().map((key:string) => {
    return {key : calcSize(output[key], output)}
})

const calcSize = (arr: (string)[], map: {[key: string]: (string)[]} ): number => {
    arr.reduce((acc, curr)=>{
        if(!isNaN(Number(curr))){
            acc += Number(curr)
        } else {
            acc += calcSize(map[curr], map)
        }
        return acc
    },0 as number)
    return 0
}

console.log(output)
console.log(sizes)
import { input, sample } from "./input";

let lastKey = [] as string[]
const dirs = input
    .split(/\r?\n/)
    .reduce((acc,curr) => {
        const command = curr.split(' ')
        if(command[0] === '$'){
            if(command[1] === 'cd'){
                if(command[2] === '..'){
                    lastKey.pop()
                    return acc
                } else {
                    lastKey.push(command[2])
                    acc[lastKey.join('-')] = []
                }
            }
        } else {
            if(!isNaN(Number(command[0]))){
                acc[lastKey.join('-')].push(command[0])
            } else {
                acc[lastKey.join('-')].push([...lastKey,command[1]].join('-'))
            }
        }
        return acc
    },{} as {[key: string]: (string)[]})

const calcSize = (arr: (string)[], map: {[key: string]: (string)[]} ): number => 
    arr.reduce((acc, curr)=>{
        if(!isNaN(Number(curr))){
            return acc + Number(curr)
        } else {
            return acc + calcSize(map[curr], map)
        }
    },0)

const sizes = Object.keys(dirs)
    .reduce((acc, curr) => {
        acc[curr] = calcSize(dirs[curr], dirs)
        return acc
    },{} as {[key: string]: number} )
    

console.log(Object.keys(sizes).filter(key => sizes[key]<=30000000).map(key => ({[key]: sizes[key]})))
const rootSpace = 70000000 - sizes['/']
console.log(Math.min(...Object.keys(sizes).filter(key => sizes[key]>=30000000-rootSpace).map(key => sizes[key])))
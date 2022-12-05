import { sample } from "./input"

const lines = sample.split(/\r?\n/)
const stacks:string[] = [], instructions:string[][] = []

lines.forEach(line => {
    const chars = line.split('')
    if(chars[0] === 'm'){
        instructions.push(line.split(' '))
    } else if(chars[1] === '1'){
        chars.forEach(char => {
            if(char !== ' '){ stacks.push(char)}
        })
    } else {
        return
    }
})

let crates:string[][] = Array(stacks.length)

lines.forEach(line => {
    const chars = line.split('')
    if((chars[2] === ']' || chars[2] === ' ') && chars[1]!== '1'){
        chars.forEach((char,i) => {
            if(char !== ' ' && char !== '[' && char !== ']') {
                if(crates[i] === undefined){
                    crates[i] = [char]
                } else {
                    crates[i].push(char)
                }
            }
        })
    } else {
        return
    }
})

crates = crates.filter(crate => crate !== undefined)

instructions.forEach(instruction => {
    const stack:string[] = crates[Number(instruction[3])].slice(0,Number(instruction[1]))
    // crates[Number(instruction[3])] = crates[Number(instruction[3])].slice(Number(instruction[1]))
    const cIndex = Number(instruction[5])
    console.log('crate ',crates[cIndex], cIndex)
    // crates[cIndex] = [...crates[cIndex], ...stack.reverse()]
})

console.log(crates, stacks, instructions)
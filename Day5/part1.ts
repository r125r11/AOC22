import { input, sample } from "./input";

const lines = input.split(/\r?\n/)

const stacks:string[][] = [], instructions:string[][] = []

lines.forEach(line => {
    const chars = line.split('')

    if(chars[0] === 'm'){
        instructions.push(line.split(' '))
    } else if (chars[1] === '1'){
        chars.forEach(char => {
            if(char !== ' '){
                stacks.push([])
            }
        })
    } else {
        return
    }
})

lines.forEach(line => {
    const chars = line.split('')

    if(chars[0] === 'm' || chars[1] === '1' || chars[1] === undefined){
        return
    } else {
        stacks.forEach((stack, i)=>{
            if(chars[i*4 + 1] !== ' '){
                stack.push(chars[i*4+1])
            }
        })
    }
})

instructions.forEach((instruction, i) => {
    const count = Number(instruction[1])
    const lIndex = Number(instruction[3])-1
    const rIndex = Number(instruction[5])-1
    stacks[rIndex] = [...stacks[lIndex].slice(0, count).reverse(), ...stacks[rIndex]]
    stacks[lIndex] = [...stacks[lIndex].slice(count)]
})

// console.log(stacks)
console.log(stacks.map(stack => stack[0]).join(''))
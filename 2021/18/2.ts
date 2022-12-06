import { input, miniSample, sample } from "./input"

const sum = (left: string, right: string) => `[${left},${right}]`

// left index is the index of left '['
// right index is the index of the right ']'
const explode = (input: string[], index: number) => {
    const left = input.slice(0, index).reverse()
    const li = left.findIndex(val => !Number.isNaN(Number(val)))
    if(li >= 0){
        left[li] = String(Number(left[li]) + Number(input[index+1]))
    }
    // we only need what's outside the []
    const right = input.slice(index + 5)
    const ri = right.findIndex(val => !Number.isNaN(Number(val)))
    if(ri >= 0){
        right[ri] = String(Number(right[ri]) + Number(input[index+3]))
    }
    return [...left.reverse(), '0', ...right].join('')
}

// separated by kommas
const separate = (input: string[], index: number) => [
        ...input.slice(0, index),
        `[${Math.floor(Number(input[index]) / 2)},${Math.ceil(Number(input[index]) / 2)}]`,
        ...input.slice(index + 1)
    ].join('')

const solve = (input: string): string => {
    const chars = input.split(/([0-9]{1,2}|\,|\[|\])/g).filter(val => val !== '')
    let depth = 0
    for( let i = 0; i < chars.length; i++){
        if(chars[i] === '['){
            depth ++
        }
        if(chars[i] === ']'){
            depth --
        }
        // step 2: explode
        if(depth === 5){
            return solve(explode(chars, i))
        }
    }
    for(let i = 0; i < chars.length; i++){
        const value = Number(chars[i])
        if(!Number.isNaN(value) && value >= 10){
            return solve(separate(chars, i))
        }
    }

    return input
}

const func = (lines: string[]) => 
    lines.reduce((acc, curr, indexer, og) => {
        for(let i = 0; i < og.length; i++){
            if(i === indexer){
                continue
            }
            const combination = Number(calc(solve(sum(curr, og[i]))))
            if(!isNaN(combination) &&combination > acc){
                acc = combination
            }
        }
        return acc
    }, 0)

const calc = (line: string):string|undefined => {
    const chars = line.split(/([0-9]{1,6}|\,|\[|\])/g).filter(val => val !== '')
    for(let i = 0; i< chars.length; i++){
        const left = Number(chars[i])
        const right = Number(chars[i+2])
        if(!isNaN(left) && !isNaN(right)){
            return calc([
                ...chars.slice(0, i - 1),
                `${3*left + 2*right}`,
                ...chars.slice(i+4)
            ].join(''))
        }
    }
    if(chars[0] !== '['){
        return line
    }
}

console.log(func(input.split(/\r?\n/)))
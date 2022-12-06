import { input, sample } from "./input";

const output = input.split('').reduce((acc, curr, i, og)=>{
    let bool = true
    const out1:string[] = og.slice(i, i+14)
    if(out1.length === 14){
        const out2 = out1.reduce((acc,curr)=>{
            if(!acc.find(v => curr === v)){
                acc.push(curr)
            }
            return acc
        },[] as string[])
        if(out2.length === 14){
            acc.push(i)
        }
    }
    // console.log(out1.join(' '))
    return acc
},[] as number[])

console.log(output[0]+14)
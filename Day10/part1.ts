import { input, sample } from "./input"

const signals:any[] = []
let cycle = 0
let X = 1

const program = input.split(/\r?\n/)
    .map(instruction => instruction.split(' '))
    .forEach(instruction => {
        if(instruction.length === 1){
            cycle++
            if(cycle === 20 + signals.length * 40){
                signals.push(cycle * X)
            } 
        } else {
            cycle++
            if(cycle === 20 + signals.length * 40){
                signals.push(cycle * X)
            } 
            
            if(instruction.length === 2){
                cycle++
            }
            
            if(cycle === 20 + signals.length * 40){
                signals.push(cycle * X)
            }
            
            if(instruction.length === 2){
                X += Number(instruction[1])
            } 
        }

    })

console.log(
    signals.reduce((acc, curr)=>acc + curr,0)
    )
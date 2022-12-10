import { input, sample } from "./input"

const signals:string[] = ['','','','','','']
let cycle = 0
let X = 1

const program = input.split(/\r?\n/)
    .map(instruction => instruction.split(' '))
    .forEach(instruction => {
        if(instruction.length === 1){
            let index = Math.floor(cycle/40)
            signals[index] += signals[index].length >= X - 1 && signals[index].length <= X + 1 ? '#' : '.'
            cycle++
        } else {
            let index = Math.floor(cycle/40)
            signals[index] += signals[index].length >= X - 1 && signals[index].length <= X + 1 ? '#' : '.'
            cycle++
            index = Math.floor(cycle/40)
            signals[index] += signals[index].length >= X - 1 && signals[index].length <= X + 1 ? '#' : '.'
            cycle++
            X += Number(instruction[1])
        }

    })

console.log(signals)
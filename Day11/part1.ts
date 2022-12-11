import { input, sample } from "./input";

type Monkey = {
    items: number[]
    operation: Operation
    test: Test
    inspections: number
}

type Test = {
    mod: number
    trueTarget: number
    falseTarget: number
}

type Operation = {
    operator: '+' | '*'
    value: number | string
}

const Monkeys:Monkey[] = []

const operations = input.split(/\r?\n/)

let startingItems:number[] = []
let op:Operation = {
    operator: '+',
    value: 0
}
let test:Test = {
    mod: 1,
    trueTarget: 1,
    falseTarget: 1
}

let index = 0
const init = operations.forEach(line => {
    if(line === '' || line === ' '){
        index++
        return
    }
    const instructions = line.split(' ').filter(val => val !== '' && val !== ' ')
    if(instructions[0] === 'Starting'){
        startingItems = line.split(/([0-9]{1,2})/g).filter(val => val !== '' && !isNaN(Number(val))).map(val => Number(val))
    }
    if(instructions[0] === 'Operation:'){
        op = {
            operator: instructions[4] as '*' | '+',
            value: isNaN(Number(instructions[5])) ? instructions[5] : Number(instructions[5])
        }
    }
    if(instructions[0] === 'Test:'){
        test = {
            ...test,
            mod: Number(instructions[3])
        }
    }
    if(instructions[1] === 'true:'){
        test = {
            ...test,
            trueTarget: Number(instructions[5])
        }
    }
    if(instructions[1] === 'false:'){
        test = {
            ...test,
            falseTarget: Number(instructions[5])
        }
        
        Monkeys.push({
            items: startingItems,
            operation: op,
            test: test,
            inspections: 0
        })
    }
})

const round = () => {
    Monkeys.forEach(monkey => {
        monkey.items.forEach(item =>{
            let worry = item
            if(typeof monkey.operation.value === 'string'){
                if(monkey.operation.operator === '+'){
                    worry = worry + worry
                } else {
                    worry = worry * worry
                }
            } else {
                if(monkey.operation.operator === '+'){
                    worry = worry + monkey.operation.value
                } else {
                    worry = worry * monkey.operation.value
                }
            }
            worry = Math.floor(worry / 3)
            if(worry % monkey.test.mod){
                Monkeys[monkey.test.falseTarget].items.push(worry)
            } else {
                Monkeys[monkey.test.trueTarget].items.push(worry)
            }
            
            const shifted = monkey.items.slice()
            shifted.shift()
            monkey.items = shifted
            monkey.inspections++
        })
    })
}

console.log([...Array(20)].forEach(_=>round()), Monkeys.sort((a,b)=> a.inspections - b.inspections).slice(Monkeys.length-2).reduce((acc,curr)=>acc * curr.inspections,1))
import { input, sample } from "./input";

type Monkey = {
    items: bigint[]
    operation: Operation
    test: Test
    inspections: number
}

type Test = {
    mod: bigint
    trueTarget: number
    falseTarget: number
}

type Operation = {
    operator: Operator
    value: bigint | string
}

type Operator = '+' | '-' | '*' | '/'

const Monkeys:Monkey[] = []

const operations = input.split(/\r?\n/)

let startingItems:bigint[] = []
let op:Operation = {
    operator: '+',
    value: 0n
}
let test:Test = {
    mod: 1n,
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
        startingItems = line.split(/([0-9]{1,2})/g).filter(val => val !== '' && !isNaN(Number(val))).map(BigInt)
    }
    if(instructions[0] === 'Operation:'){
        op = {
            operator: instructions[4] as Operator,
            value: [...instructions[5]][0] === 'o' ? instructions[5] : BigInt(instructions[5])//if old, then old, else bigint
        }
    }
    if(instructions[0] === 'Test:'){
        test = {
            ...test,
            mod: BigInt(instructions[3])
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

const calc = (a: bigint, op: Operator, b: bigint) => {
    switch(op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
    }
}

const maxMulti = Monkeys.reduce((acc, curr)=>acc * curr.test.mod,1n)

const round = () => {
    Monkeys.forEach(monkey => {
        monkey.items.forEach(item =>{
            let worry = calc(item, monkey.operation.operator, typeof monkey.operation.value === 'string' ? item: monkey.operation.value)
            Monkeys[worry % monkey.test.mod ? monkey.test.falseTarget : monkey.test.trueTarget].items.push(worry % maxMulti)
            const shifted = monkey.items.slice()
            shifted.shift()
            monkey.items = shifted
            monkey.inspections++
        })
    })
}

console.log([...Array(10000)].forEach(_=>round()), Monkeys.map(monkey => ({inspections: monkey.inspections})).sort((a,b)=> a.inspections - b.inspections).slice(Monkeys.length-2).reduce((acc,curr)=>acc * curr.inspections,1))
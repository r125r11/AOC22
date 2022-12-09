import { input, sample } from "./input";

const instructions = input.split(/\r?\n/).map(line => line.split(' '))

type Position = {
    x: number
    y: number
}

let headPos:Position = {x:0, y: 0}
let tailPos:Position = {x:0, y: 0}

let headPositions = [headPos]
let tailPositions = [tailPos]

const output = instructions.forEach(instruction => [...Array(Number(instruction[1]))].forEach(()=> moveHead(instruction[0])))

function moveHead(direction: string): void {
    switch(direction){
        case 'L':
            headPos = {x: headPos.x - 1, y: headPos.y}
            checkPositionDupes('head', headPos)
            updateTailPosition()
            break;
        case 'R':
            headPos = {x: headPos.x + 1, y: headPos.y}
            checkPositionDupes('head', headPos)
            updateTailPosition()
            break;
        case 'U':
            headPos = {x: headPos.x, y: headPos.y + 1}
            checkPositionDupes('head', headPos)
            updateTailPosition()
            break;
        case 'D':
            headPos = {x: headPos.x, y: headPos.y - 1}
            checkPositionDupes('head', headPos)
            updateTailPosition()
            break;
    }
}
function checkPositionDupes(list: string, position: Position) {
    if(list === 'head'){
        if(!headPositions.find(pos => pos.x === position.x && pos.y === position.y)){
            headPositions.push(position)
        }
    } else {
        if(!tailPositions.find(pos => pos.x === position.x && pos.y === position.y)){
            tailPositions.push(position)
        }
    }
}

function updateTailPosition() {
    console.log(headPos, tailPos)
    if(Math.abs(headPos.x - tailPos.x) > 1){
        // horizontal
        if(headPos.x < tailPos.x){
            tailPos = {x: tailPos.x - 1, y: tailPos.y}
        } else {
            tailPos = {x: tailPos.x + 1, y: tailPos.y}
        }
        // diagonal
        if(headPos.y < tailPos.y){
            tailPos = {x: tailPos.x, y: tailPos.y - 1}
        }
        if(headPos.y > tailPos.y){
            tailPos = {x: tailPos.x, y: tailPos.y + 1}
        }
        console.log('horizontal move', headPos.x - tailPos.x, headPos, tailPos)
    }
    if(Math.abs(headPos.y - tailPos.y) > 1){
        // vertical
        if(headPos.y < tailPos.y){
            tailPos = {x: tailPos.x, y: tailPos.y - 1}
        } else {
            tailPos = {x: tailPos.x, y: tailPos.y + 1}
        }
        // diagonal
        if(headPos.x < tailPos.x){
            tailPos = {x: tailPos.x - 1, y: tailPos.y}
        } 
        if (headPos.x > tailPos.x) {
            tailPos = {x: tailPos.x + 1, y: tailPos.y}
        }
        console.log('vertical move', headPos.y - tailPos.y, headPos, tailPos)
    }
    checkPositionDupes('tail', tailPos)
}

console.log(output, '\nhead positions:', headPositions)
console.log(tailPositions, tailPositions.length)
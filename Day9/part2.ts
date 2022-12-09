import { input, sample } from "./input";

const instructions = input.split(/\r?\n/).map(line => line.split(' '))

type Position = {
    x: number
    y: number
}

let headPos:Position = {x:0, y: 0}
let k1:Position = {x:0, y: 0}
let k2:Position = {x:0, y: 0}
let k3:Position = {x:0, y: 0}
let k4:Position = {x:0, y: 0}
let k5:Position = {x:0, y: 0}
let k6:Position = {x:0, y: 0}
let k7:Position = {x:0, y: 0}
let k8:Position = {x:0, y: 0}
let k9:Position = {x:0, y: 0}

let tailPositions = [k9]

const output = instructions.forEach(instruction => [...Array(Number(instruction[1]))].forEach(()=> moveHead(instruction[0])))

function moveHead(direction: string): void {
    switch(direction){
        case 'L':
            headPos = {x: headPos.x - 1, y: headPos.y}
            updatePositions()
            break;
        case 'R':
            headPos = {x: headPos.x + 1, y: headPos.y}
            updatePositions()
            break;
        case 'U':
            headPos = {x: headPos.x, y: headPos.y + 1}
            updatePositions()
            break;
        case 'D':
            headPos = {x: headPos.x, y: headPos.y - 1}
            updatePositions()
            break;
    }
}
function checkPositionDupes(position: Position) {
    if(!tailPositions.find(pos => pos.x === position.x && pos.y === position.y)){
        tailPositions.push(position)
    }
}

function updatePositions() {
    k1 = updatePosition(headPos, k1);
    k2 = updatePosition(k1, k2);
    k3 = updatePosition(k2, k3);
    k4 = updatePosition(k3, k4);
    k5 = updatePosition(k4, k5);
    k6 = updatePosition(k5, k6);
    k7 = updatePosition(k6, k7);
    k8 = updatePosition(k7, k8);
    k9 = updatePosition(k8, k9);
    checkPositionDupes(k9)
}

function updatePosition(head: Position, tail: Position) {
    let returnPos:Position = {x:0, y: 0}
    if (Math.abs(head.x - tail.x) > 1) {
        // horizontal
        if (head.x < tail.x) {
            returnPos = { x: tail.x - 1, y: tail.y };
        } else {
            returnPos = { x: tail.x + 1, y: tail.y };
        }
        // diagonal
        if (head.y < tail.y) {
            returnPos = { x: tail.x, y: tail.y - 1 };
        }
        if (head.y > tail.y) {
            returnPos = { x: tail.x, y: tail.y + 1 };
        }
        // console.log('horizontal move', head.x - returnPos.x, head, returnPos);
    }
    if (Math.abs(head.y - tail.y) > 1) {
        // vertical
        if (head.y < tail.y) {
            returnPos = { x: tail.x, y: tail.y - 1 };
        } else {
            returnPos = { x: tail.x, y: tail.y + 1 };
        }
        // diagonal
        if (head.x < tail.x) {
            returnPos = { x: tail.x - 1, y: tail.y };
        }
        if (head.x > tail.x) {
            returnPos = { x: tail.x + 1, y: tail.y };
        }
        // console.log('vertical move', head.y - returnPos.y, head, returnPos);
    }
    return returnPos
}

console.log(tailPositions, tailPositions.length)

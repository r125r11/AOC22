import { sample } from "./input";

type Point = {
    x: number
    y: number
}

type Node = {
    position: Point
    h: number
    f: number
    g: number
    weight: number
    parentNode?: Node
    isOnOpenList: boolean
    isOnClosedList: boolean
}

const weights = 'SEabcdefghijklmnopqrstuvwxyz'

let start: Node = {position:{x:0,y:0},h:0,f:0,g:0,weight:0,isOnClosedList:true,isOnOpenList:true}
let end: Node = start

const lines = sample.split(/\r?\n/)
const width = [...lines[0]].length
const height = lines.length
const world = lines.map((line, y) => {
    const chars = [...line]
    return chars.map((char,x) => {
        if(char === 'S'){
            start = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === char), isOnClosedList: false, isOnOpenList: false } as Node)
        }
        if(char === 'E'){
            end = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === char), isOnClosedList: false, isOnOpenList: false } as Node)
        }
        return({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === char), isOnClosedList: false, isOnOpenList: false } as Node)}
    )
})

const calcHeuristic = (start: Point, end: Point, weight: number) => ((end.x - start.x) + (end.y - start.y)) * weight

const findPath = (start: Point, end: Point) => {
    const openSet:Node[] = []
    const closedSet:Node[] = []

    const startNode = world[start.x][start.y]
    const endNode = world[end.x][end.y]

    startNode.isOnOpenList = true
    openSet.push(startNode)

    world.forEach(row => row.forEach(node => node.h = calcHeuristic(node.position, endNode.position, node.weight )))
}

const reconstructPath = (cameFrom: Node[], current: Node ) => {
    const totalPath = [current]
    // cameFrom.forEach()
}

console.log(world)
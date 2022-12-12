import { input, sample } from "./input";

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

const weights = '.abcdefghijklmnopqrstuvwxyz'

let start: Node = {position:{x:0,y:0},h:0,f:0,g:0,weight:0,isOnClosedList:true,isOnOpenList:true}
let end: Node = start

const lines = sample.split(/\r?\n/)
const width = [...lines[0]].length
const height = lines.length
const world = lines.map((line, y) => {
    const chars = [...line]
    return chars.map((char,x) => {
        if(char === 'S'){
            start = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === 'a'), isOnClosedList: false, isOnOpenList: false } as Node)
        }
        if(char === 'E'){
            end = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === 'z'), isOnClosedList: false, isOnOpenList: false } as Node)
        }
        return({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => char === 'S' 
            ? (weight === 'a') 
            : char === 'E' 
                ? (weight === 'z') 
                : weight === char
        ), isOnClosedList: false, isOnOpenList: false } as Node)}
    )
})

const calcHeuristic = (start: Point, end: Point, weight: number) => (Math.abs(end.x - start.x) + Math.abs(end.y - start.y)) * weight

const backtrace = (node: Node) => {
    const path: number[][] = []

    let currentNode: Node = node
    while(currentNode.parentNode){
        path.push([currentNode.position.x, currentNode.position.y])
        currentNode = currentNode.parentNode
    }

    path.push([currentNode.position.x, currentNode.position.y])

    return path.reverse()
}

const getSurroundingNodes = (point: Point) => world.flat().filter(node => 
    (point.x === node.position.x + 1 && point.y === node.position.y)
    || (point.x === node.position.x - 1 && point.y === node.position.y)
    || (point.x === node.position.x && point.y === node.position.y + 1)
    || (point.x === node.position.x && point.y === node.position.y - 1)
)

const getLowest = (map: Node[]) => map.map(node => ({...node, f: node.g + node.h})).sort((a,b) => a.f - b.f)[0]

const findPath = (start: Point, end: Point) => {
    const openSet:Node[] = []
    const closedSet:Node[] = []

    const startNode = world[start.y][start.x]
    const endNode = world[end.y][end.x]

    startNode.isOnOpenList = true
    openSet.push(startNode)

    world.forEach(row => row.forEach(node => node.h = calcHeuristic(node.position, endNode.position, node.weight )))
    while(openSet.length !== 0){
        // get the node with the lowest F
        const currentNode = getLowest(openSet)
        // console.log(openSet.map(node => node.g + node.h), currentNode.f)

        // move current node from openSet to closedSet
        currentNode.isOnOpenList = false
        openSet.splice(openSet.findIndex(node => node.position.x === currentNode.position.x && node.position.y === currentNode.position.y),1)
        currentNode.isOnClosedList = true
        closedSet.push(currentNode)

        if(currentNode.position.x === endNode.position.x && currentNode.position.y === endNode.position.y){
            return backtrace(currentNode)
        }

        const neighbors = getSurroundingNodes(currentNode.position)

        for(let n in neighbors){
            let neighbor = neighbors[n]

            if(neighbor.isOnClosedList){
                continue
            }

            const nextGValue = currentNode.g + neighbor.weight
            
                if(neighbor.weight <= currentNode.weight + 1){
                neighbor.g = nextGValue
                neighbor.parentNode = currentNode

                if(!neighbor.isOnOpenList){
                    neighbor.isOnOpenList = true
                    openSet.push(neighbor)
                } else {
                    neighbor.parentNode = currentNode
                }
            }
        }
    }

    return []
}

const pad = (str: string, size: number) => {
    const chars = [...str]
    return [...[...Array(size - chars.length)].map(_ => ' '), ...chars].join('')
}

const visualizePath = () => {
    const path = findPath(start.position, end.position)
    const emptyWorld = world.map(row => row.map(_ => ' . '))
    path.forEach((pos, i) => emptyWorld[pos[1]][pos[0]] = pad(String(i), 3))
    return emptyWorld.map(row => row.join(' ')).join('\n')
}

// console.log(findPath(start.position, end.position), start.position, end.position)
console.log(visualizePath())
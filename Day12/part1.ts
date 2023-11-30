import { input, sample } from "./input";

type Point = {
    x: number
    y: number
}

type Node = {
    position: Point

    // The cost of moving to this node from the start
    // This value is used to calculate the f-score of the node
    g: number,

    // The estimated cost of moving from this node to the goal
    // This value is used to calculate the f-score of the node
    h: number,

    // The total cost of moving to this node from the start,
    // taking into account both the g-score and the h-score
    f: number,

    weight: number
    // The parent node of this node, used to trace the path
    // from the start to the goal once the algorithm has finished

    parentNode?: Node
    isOnOpenList: boolean
    isOnClosedList: boolean
    value: string
}

const weights = '.abcdefghijklmnopqrstuvwxyz'

let start: Node = {position:{x:0,y:0},h:0,f:0,g:0,weight:0,isOnClosedList:true,isOnOpenList:true,value:''}
let end: Node = start

const lines = input.split(/\r?\n/)
const world = lines.map((line, y) => {
    const chars = [...line]
    return chars.map((char,x) => {
        if(char === 'S'){
            start = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === 'a'), isOnClosedList: false, isOnOpenList: false, value: char } as Node)
        }
        if(char === 'E'){
            end = ({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => weight === 'z'), isOnClosedList: false, isOnOpenList: false, value: char } as Node)
        }
        return({position: {x:x, y:y}, h: 0, g:0, f: 0, weight: [...weights].findIndex(weight => char === 'S' 
            ? (weight === 'a') 
            : char === 'E' 
                ? (weight === 'z') 
                : weight === char
        ), isOnClosedList: false, isOnOpenList: false, value: char } as Node)}
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

const getLowest = (map: Node[]) => map.sort((a,b) => a.f - b.f)[0]

const findPath = (start: Point, end: Point) => {
    const openSet:Node[] = []
    const closedSet:Node[] = []

    const startNode = world[start.y][start.x]
    const endNode = world[end.y][end.x]

    startNode.isOnOpenList = true
    openSet.push(startNode)

    // calc heuristic
    // world.forEach(row => row.forEach(node => node.h = calcHeuristic(node.position, endNode.position, node.weight )))
    // world.forEach(row => row.forEach(node => node.f = node.h + node.g))

    //AStar
    // while(openSet.length !== 0){
    //     // get the node with the lowest F
    //     const currentNode = getLowest(openSet)
        
    //     if(currentNode.position.x === endNode.position.x && currentNode.position.y === endNode.position.y){
    //         return backtrace(currentNode)
    //     }
        
    //     const neighbors = getSurroundingNodes(currentNode.position)
    //     if(currentNode.position.x <= 5 && currentNode.position.y <= 5){
    //         console.log(openSet.map(node => [node.f, node.g, node.h, node.position]),'\n=>', [currentNode.f, currentNode.g, currentNode.h, currentNode.position])
    //         console.log(neighbors.map(node => [node.f, node.g, node.h, node.position]))
    //     }


    //     // move current node from openSet to closedSet
    //     currentNode.isOnOpenList = false
    //     openSet.splice(openSet.findIndex(node => node.position.x === currentNode.position.x && node.position.y === currentNode.position.y),1)
    //     currentNode.isOnClosedList = true
    //     closedSet.push(currentNode)

    //     for(let n in neighbors){
    //         let neighbor = neighbors[n]

    //         if(neighbor.isOnClosedList){
    //             continue
    //         }

    //         const nextGValue = currentNode.g + ((neighbor.position.x !== currentNode.position.x || neighbor.position.y !== currentNode.position.y) ? neighbor.weight : neighbor.weight * 1.41421)
            
    //         if(!neighbor.isOnOpenList || nextGValue < neighbor.g){
    //             neighbor.g = nextGValue
    //             neighbor.f = nextGValue + neighbor.h
    //             neighbor.parentNode = currentNode

    //             if(!neighbor.isOnOpenList && neighbor.weight <= currentNode.weight + 1){
    //                 neighbor.isOnOpenList = true
    //                 openSet.push(neighbor)
    //             } else {
    //                 neighbor.parentNode = currentNode
    //             }
    //         }
    //     }
    //     if(currentNode.position.x <= 5 && currentNode.position.y <= 5){
    //         console.log('')
    //     }
    // }

    //Drijkstra
    while(true){
        const currentNode = getLowest(openSet)
        const neighbors = getSurroundingNodes(currentNode.position)
        openSet.splice(openSet.findIndex(item => item.position.x === currentNode.position.x && item.position.y === currentNode.position.y), 1)
        
        if(currentNode.position.x === end.x && currentNode.position.y === end.y){
            return currentNode
        }
        
        neighbors.forEach(neighbor => {
            if (neighbor.weight - currentNode.weight <= 1) {
                const totalRisk = currentNode.f + 1
                if (totalRisk < (neighbor.f > 0 ? neighbor.f: Number.MAX_SAFE_INTEGER)) {
                    world[neighbor.position.y][neighbor.position.x].f = totalRisk
                    const itemIndex = openSet.findIndex(item => item.position.x === neighbor.position.x && item.position.y === neighbor.position.y)
                    if(itemIndex > -1){
                        openSet[itemIndex].f = totalRisk
                    } else {
                        openSet.push({...neighbor, f: totalRisk})
                    }
                    // console.log(currentNode.position, neighbors.map(i => i.position))
                }
            }
        })

    }

    return []
}

const pad = (str: string, size: number) => {
    const chars = [...str]
    return [...[...Array(size - chars.length)].map(_ => ' '), ...chars].join('')
}

const visualizePath = (path: number[][]) => {
    const emptyWorld = world.map(row => row.map(_ => ' . '))
    path.forEach((pos, i) => emptyWorld[pos[1]][pos[0]] = ' ' + world[pos[1]][pos[0]].value + ' ')//+':'+pad(String(i), 3))
    return emptyWorld.map(row => row.join(' ')).join('\n')
}

const SEPath = findPath(start.position, end.position)

// console.log(findPath(start.position, end.position), start.position, end.position)
// console.log(visualizePath(SEPath))
// console.log(SEPath.length)
console.log(SEPath)
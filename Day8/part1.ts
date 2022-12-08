import { input, sample } from "./input";

const output = input.split(/\r?\n/)
const allTrees = output.reduce((acc, curr)=> [...acc, ...curr],[] as string[])

const width = [...output[0]].length - 1
const height = output.length - 1

// let visible = width * 2 + height * 2
const visible = output.reduce((acc, curr, i) => {
    if(i === 0 || i === height){
        acc.push([...curr].map(_=>true))
    } else {
        acc.push([...curr].map((_, i)=>i===0 || i===width))
    }
    return acc
}, [] as boolean[][])

const columns = [...output[0]].forEach((_, x) => {
    if(x === 0 || x === width){
        return
    }
    const column = allTrees.filter((_,y) => y % (width+1) === x)
    column.forEach((el, y)=> {
        if(y === 0 || y === height){
            return
        }
        let vis = true
        for(let i = y - 1; i >= 0; i--){
            if(Number(el) <= Number(column[i])){
                vis = false
            }
        }
        if(vis){
            visible[y][x] = true
        }
    })
    column.forEach((el, y)=> {
        if(y === 0 || y === height){
            return
        }
        let vis = true
        for(let i = y + 1; i <= height; i++){
            if(Number(el) <= Number(column[i])){
                vis = false
            }
        }
        if(vis){
            visible[y][x] = true
        }
    })
});

const rows = output.forEach((row,y) => {
    if(y === 0 || y === width){
        return
    }

    const curr = [...row]

    curr.forEach((el,x)=>{
        if(x === 0 || x === width){
            return
        }

        let vis = true
        for(let i = x - 1; i >= 0; i--){
            if(Number(el) <= Number(row[i])){
                vis = false
            }
        }
        if(vis){
            visible[y][x] = true
        }
    })

    curr.forEach((el,x)=>{
        if(x === 0 || x === width){
            return
        }

        let vis = true
        for(let i = x + 1; i <= width; i++){
            if(Number(el) <= Number(row[i])){
                vis = false
            }
        }
        if(vis){
            visible[y][x] = true
        }
    })
})

console.log(visible.reduce((acc, curr)=>acc + [...curr].reduce((arr, bool)=>bool ? arr + 1: arr,0),0))
import { sample } from "./input"

const comparisons = sample.split(/\n\n/).map(comp => comp.split(/\n/))

const compared = comparisons.map(comp => {
    const left = comp[0].split('').filter(val => val !== ',')
    const right = comp[1].split('').filter(val => val !== ',')

    console.log(left)

    let leftOffset = 0
    let rightOffset = 0

    for(let i = 0; i - leftOffset < left.length; i++){
        const leftNumber = Number(left[i - leftOffset])
        const rightNumber = Number(right[i - rightOffset])
        if(right[i-rightOffset] === undefined) {
            return false
        }

        // is numbers
        if(!isNaN(leftNumber) && !isNaN(rightNumber)){
            if(rightNumber < leftNumber){
                return false
            }
        }
        // left is arr, right is number
        if(isNaN(leftNumber) && !isNaN(rightNumber)){
            rightOffset--
            continue
        }

        // left is number, right is arr
        if(!isNaN(leftNumber) && isNaN(rightNumber)){
            leftOffset--
            continue
        }
    }

    // comparing 2 arrays
    const leftArr: number[] = []
    const rightArr: number[] = []
    const rightNumber = 0
    if(leftArr.find((n,i)=> n > rightArr[i])){
        return false
    }

    if(leftArr[0] > rightNumber){
        return false
    }
})

const compareArrays = (left: number[], right: number[]) => left.find((n,i) => n > right[i])
    // const chars = line.split(/([0-9]{1,6}|\,|\[|\])/g).filter(val => val !== '')

console.log(compared)
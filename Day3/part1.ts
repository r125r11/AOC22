import { input, sample } from "./source";

const charVals: {[key: string]: number} = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
}

const sacks = input
    .split(/\r?\n/)
    .map(sack => ({left: sack.slice(0, sack.length/2), right: sack.slice(sack.length/2)}))
    .reduce((acc, curr) => {
        const left = curr.left.split('')
        const right = curr.right.split('')
        const commons = left.reduce((acc, curr) => {
            if(!acc.find(c => c === curr)){
                if(right.find(r => r === curr)){
                    acc.push(curr)
                }
            }
            return acc
        },[] as string[])
        commons.filter(c => commons.find(com => com === c)).forEach(c => acc.push(c))
        return acc
    },[] as string[])

console.log(sacks.reduce((acc, curr) => acc + charVals[curr],0))
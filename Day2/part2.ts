import { input, sample } from "./input";

/*
    A -Rock     -X -1
    B -Paper    -Y -2
    C -Scissors -Z -3
*/
const output:number[] = input
    .split(/\r?\n/)
    .map(line => {
        const matchInput = line.split(' ')
        switch(matchInput[0]){
            case 'A':
                if(matchInput[1] === 'Z' ){
                    return 8
                }
                if(matchInput[1] === 'Y' ){
                    return 4
                }
                else{
                    return 3
                }
            case 'B':
                if(matchInput[1] === 'Z' ){
                    return 9
                }
                if(matchInput[1] === 'Y' ){
                    return 5
                }
                else{
                    return 1
                }
            case 'C':
                if(matchInput[1] === 'Z' ){
                    return 7
                }
                if(matchInput[1] === 'Y' ){
                    return 6
                }
                else{
                    return 2
                }
            default: return 0
        }
    })

    console.log(output.reduce((acc,val)=>acc + val,0))
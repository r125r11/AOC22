import { input } from "./input";

/*
    A -Rock     -X -1
    B -Paper    -Y -2
    C -Scissors -Z -3
*/
const output = input
    .split(/\r?\n/)
    .map(line => {
        const matchInput = line.split(' ')
        let matchValue = 0
        switch(matchInput[1]){
            case 'X':
                matchInput[1] = 'A'
                matchValue += 1
                if(matchInput[0] === 'C' ){
                    matchValue += 6
                }
                break;
            case 'Y':
                matchInput[1] = 'B'
                matchValue += 2
                if(matchInput[0] === 'A' ){
                    matchValue += 6
                }
                break;
            case 'Z':
                matchInput[1] = 'C'
                matchValue += 3
                if(matchInput[0] === 'B' ){
                    matchValue += 6
                }
                break;
        }
        if(matchInput[0] === matchInput[1]){
            matchValue += 3
        }

        return matchValue
    })

    console.log(output.reduce((acc,val)=>acc + val,0))
import { isNotNumber } from "./utils"

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Values {
    target: number;
    arr: number[];
}

const parseArguments = (args: string[]): Values => {
    if (!isNotNumber(Number(args[2]))) {
        return {
            target: Number(args[2]),
            arr: args.slice(3).map(val => Number(val))
        }
    }
    else {
        throw new Error('Missing arguments') 
    }
}

export const calculateExercises = (hours: number[], target: number) : Result => {   
    const numberOfDays = hours.length
    const trainingDays = hours.filter(h => h !== 0).length
    const average = hours.reduce((hour, curr) => hour + curr, 0) / numberOfDays
    return {
        periodLength: numberOfDays,
        trainingDays: trainingDays,
        success: average > target,
        rating: 2,
        ratingDescription: 'good',
        target: target,
        average: average
    }
}

try {
    const {target, arr} = parseArguments(process.argv);
    console.log(calculateExercises(arr, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

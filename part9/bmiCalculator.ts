export const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight / (height * height / 10000)

    if (bmi < 18.5) {
        return "Under weight"
    }
    else if (bmi < 24.9) {
        return "Normal range"
    }
    else {
        return "Over weight"
    }
}

console.log(calculateBmi(180, 74))
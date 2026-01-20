import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello World');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight) {
    return res.status(400).send({ error: "malformatted parameters" })
  }

  const bmi = calculateBmi(height, weight)
  return res.json({weight: weight, height: height, bmi: bmi})
});

app.post('/exercises', (req: Request, res: Response) => {
    const hours = req.body.daily_exercises.map((hour: string) => Number(hour))
    const target = Number(req.body.target)

    if (!hours || !target) {
        return res.status(400).send({error: "parameters missing"})
    }

    return res.json(calculateExercises(hours, target))
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
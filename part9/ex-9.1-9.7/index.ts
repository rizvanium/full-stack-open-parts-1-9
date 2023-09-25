import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight) || height === 0 || weight === 0) {
    res.status(400)
      .json({ error: "malformatted parameters" });
      
  } else {
    const bmi = calculateBmi(height, weight);
    res.status(200)
    .json({
      height,
      weight,
      bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    res.status(400).send({
      error: "malformatted parameters",
    });
    return;
  }

  try {
    const exerciseHours = (daily_exercises as Array<number>).map(element => {
      if (isNaN(Number(element))) {
        throw new Error("malformatter parameters");
      }
      return Number(element);
    });
    
    const result = calculateExercises(Number(target), exerciseHours);
    res.status(200).send(result);
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send({ error: message });
    return;
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
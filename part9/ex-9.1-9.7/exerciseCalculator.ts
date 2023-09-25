import parseArguments from './utils/exerciseArgumentParser';

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface Rating {
  rating: number;
  ratingDescription: string;
}


const getRating = (target: number, average: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: 'you did great, keep up the good work',
    };
  } else if (average > 0 && average < target) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better',
    };
  } else {
    return {
      rating: 1,
      ratingDescription: 'you\'ve failed to find time for exercise',
    };
  }
};

const calculateExercises = (target: number, exerciseHours: number[]): Result => {
  let hourSum = 0; 
  let trainingDays = 0;
  for (const hours of exerciseHours) {
    if (hours > 0) {
      trainingDays++;
    }
    hourSum += hours;
  }
  const average = hourSum / exerciseHours.length;
  const rating = getRating(target, average);

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    ...rating,
    success: average >= target,
    target,
    average
  };
};


if (require.main === module) {
  try {
    const {target, exerciseHours} = parseArguments(process.argv);
    const result = calculateExercises(target, exerciseHours);
    console.log(`{ periodLength: ${result.periodLength},
      trainingDays: ${result.trainingDays},
      success: ${result.success},
      rating: ${result.rating},
      ratingDescription: ${result.ratingDescription},
      target: ${result.target},
      average: ${result.average} }`);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
  }
}
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const getRating = (target: number, average: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: 'you did great, keep up the good work',
    }
  } else if (average > 0 && average < target) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better',
    }
  } else {
    return {
      rating: 1,
      ratingDescription: 'you\'ve failed to find time for exercise',
    }
  }
}

const calculateExercises = (target: number, exerciseHours: number[]): Result => {
  let trainingDays = 0;
  let hourSum = 0; 
  for (let hours of exerciseHours) {
    if (hours > 0) {
      trainingDays++;
    }
    hourSum += hours;
  }
  const average = hourSum / exerciseHours.length
  const rating = getRating(target, average);

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    ...rating,
    success: average >= target,
    target,
    average
  };
}

const result = calculateExercises(2, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]);
console.log(`{ periodLength: ${result.periodLength},
  trainingDays: ${result.trainingDays},
  success: ${result.success},
  rating: ${result.rating},
  ratingDescription: ${result.ratingDescription},
  target: ${result.target},
  average: ${result.average} }`);
interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  if (isNaN(height)) {
    throw new Error('Height is not a number!');
  }

  const weight = Number(args[3]);
  if(isNaN(weight)) {
    throw new Error('Weight is not a number!');
  }

  return {
    height,
    weight,
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100; 
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 24.5) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
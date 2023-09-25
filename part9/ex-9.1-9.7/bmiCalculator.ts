import parseArguments from './utils/bmiArgumentParser';

export const calculateBmi = (height: number, weight: number): string => {
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
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) { 
      errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
  }
}
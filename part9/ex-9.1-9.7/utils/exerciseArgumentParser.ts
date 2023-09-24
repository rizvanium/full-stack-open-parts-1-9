interface ExerciseValues {
  target: number;
  exerciseHours: number[];
}

export default (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Target is not a number!');
  }

  const exerciseHours = args.slice(3).map(elem => {
    const num = Number(elem);
    if (isNaN(num)) {
      throw new Error('Some of the daily training hours are not number');
    }
    return num;
  });

  return {
    target,
    exerciseHours,
  }
}
interface BmiValues {
  height: number;
  weight: number;
}

export default (args: string[]): BmiValues => {
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
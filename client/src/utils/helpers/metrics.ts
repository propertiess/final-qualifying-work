const calculateError = (errors: number[], length: number) => {
  const error =
    errors.reduce((sum, error) => {
      if (Number.isNaN(error)) {
        return sum;
      }

      if (error === Infinity) {
        return sum;
      }

      if (error === -Infinity) {
        return sum;
      }

      return sum + error;
    }, 0) / length;

  return error.toFixed(2);
};

export const calculateMSE = <T>(
  key: keyof T,
  factData: T[],
  predictData: T[]
) => {
  const squaredErrors = factData.map((value, index) => {
    const error = (value[key] as number) - (predictData[index][key] as number);
    return error ** 2;
  });

  return calculateError(squaredErrors, factData.length);
};

export const calculateMAE = <T>(
  key: keyof T,
  factData: T[],
  predictData: T[]
) => {
  const absoluteErrors = factData.map(
    (value, index) =>
      Math.abs(value[key] as number) - (predictData[index][key] as number)
  );

  return calculateError(absoluteErrors, factData.length);
};

export const calculateMAPE = <T>(
  key: keyof T,
  factData: T[],
  predictData: T[]
) => {
  const absolutePercentageErrors = factData.map((value, index) => {
    const error =
      ((value[key] as number) - (predictData[index][key] as number)) /
      (value[key] as number);
    return error;
  });

  const output = +(
    +calculateError(absolutePercentageErrors, factData.length) * 100
  ).toFixed(2);

  return Math.abs(output);
};

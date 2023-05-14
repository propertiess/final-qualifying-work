const calculateError = (errors: number[], length: number, isMAPE = false) => {
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

  if (isMAPE) {
    return Math.abs(parseFloat(error.toString()));
  }

  return Math.abs(+error.toFixed(2));
};

export const calculateMSE = <T>(
  key: keyof T,
  factData: T[],
  predictData: T[]
) => {
  const squaredErrors = factData.map((value, index) => {
    const error = (value[key] as number) - (predictData[index][key] as number);
    return Math.pow(error, 2);
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

  const output = parseFloat(
    String(
      calculateError(absolutePercentageErrors, factData.length, true) * 100
    )
  );

  return Math.abs(+output.toFixed(2)) > 100
    ? 100
    : Math.abs(+output.toFixed(2));
};

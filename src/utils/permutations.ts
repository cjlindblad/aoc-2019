const swap = (array: number[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export const generatePermutations = (input: number[]) => {
  const permutations: number[][] = [];

  // adapted from https://www.topcoder.com/generating-permutations/
  const permutate = (array: number[], n: number) => {
    if (n === 1) {
      permutations.push([...array]);
      return;
    }
    for (let i = 0; i < n; i++) {
      swap(array, i, n - 1);
      permutate(array, n - 1);
      swap(array, i, n - 1);
    }
  };

  permutate([...input], input.length);

  return permutations;
};

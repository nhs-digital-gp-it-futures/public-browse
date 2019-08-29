export const createColumnsForSectionValue = (value) => {
  const newValue = {};
  const column1 = [];
  const column2 = [];

  value.map((v, idx) => {
    const id = idx + 1;
    if (Math.ceil(value.length / 2) >= id) {
      column1.push(v);
    } else {
      column2.push(v);
    }
  });

  newValue.column1 = column1;
  newValue.column2 = column2;

  return newValue;
};


import { createColumnsForSectionValue } from './createColumnsForSectionValue';

describe('createColumnsForSection', () => {
  it('should split the section values evenly into 2 columns when they are 2 values', () => {
    const expectedSectionValue = {
      column1: ['value 1'],
      column2: ['value 2'],
    };

    const initialSectionValue = ['value 1', 'value 2'];

    const sectionValue = createColumnsForSectionValue(initialSectionValue);

    expect(sectionValue).toEqual(expectedSectionValue);
  });

  it('should split the section values with an extra value in the first column when an odd number of values', () => {
    const expectedSectionValue = {
      column1: ['value 1', 'value 2'],
      column2: ['value 3'],
    };

    const initialSectionValue = ['value 1', 'value 2', 'value 3'];

    const sectionValue = createColumnsForSectionValue(initialSectionValue);

    expect(sectionValue).toEqual(expectedSectionValue);
  });
});

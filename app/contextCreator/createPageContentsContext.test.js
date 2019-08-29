import { createPageContentsContext } from './createPageContentsContext';

describe('createPageContentsContext', () => {
  it('should create a list of 1 of page contents objects if the solution has just 1 section', () => {
    const expectedPageContents = [
      {
        href: '#first-section',
        text: 'First Section',
      },
    ];

    const sections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];

    const pageContents = createPageContentsContext(sections);

    expect(pageContents).toEqual(expectedPageContents);
  });

  it('should create a list of 2 page contents objects if the solution has 2 sections', () => {
    const expectedPageContents = [
      {
        href: '#first-section',
        text: 'First Section',
      },
      {
        href: '#second-section',
        text: 'Second Section',
      },
    ];

    const sections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
      {
        id: 'second-section',
        name: 'Second Section',
        value: 'Second Section Value',
      },
    ];

    const pageContents = createPageContentsContext(sections);

    expect(pageContents).toEqual(expectedPageContents);
  });
});

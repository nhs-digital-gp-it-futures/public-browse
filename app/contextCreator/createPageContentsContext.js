export const createPageContentsContext = (sections) => {
  const pageContents = [];

  sections.map((section) => {
    const pageContent = {};
    pageContent.text = section.name;
    pageContent.href = `#${section.id}`;
    pageContents.push(pageContent);
  });

  return pageContents;
};

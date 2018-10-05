const Github = require('./github');
test('Generate the urls that will be used', () => {
  expect('https://api.github.com/repos/braziljs/weekly/issues?labels=campaign&state=all')
    .toBe(Github.generateUrl('?labels=campaign&state=all'));
  
  expect('https://api.github.com/repos/braziljs/weekly/issues?labels=campaign')
    .toBe(Github.generateUrl('?labels=campaign'));
  
  expect('https://api.github.com/repos/braziljs/weekly/issues/:issue')
    .toBe(Github.generateUrl('/:issue'));
  
  expect('https://api.github.com/repos/braziljs/weekly/issues/:issue/comments?per_page=99')
    .toBe(Github.generateUrl('/:issue/comments?per_page=99'));
});

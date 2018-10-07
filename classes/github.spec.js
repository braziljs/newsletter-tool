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


test('if urls doesn\'t empty or null', () => {
  expect(Github.urls.allWeeklyIssues).not.toBeNull();
  expect(Github.urls.issue).not.toBeNull();
  expect(Github.urls.inCampaign).not.toBeNull();
  expect(Github.urls.comments).not.toBeNull();
});
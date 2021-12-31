module.exports = {
	releaseCommitMessageFormat: 'chore: create new release {{currentTag}}',
	tagPrefix: '',
	types: [
    { type: 'feat', section: 'New features' },
    { type: 'feature', section: 'New features' },
    { type: 'fix', section: 'Bug fixes' },
    { type: 'refactor', section: 'Code changes' },
    { type: 'chore', section: 'Other chores' },
    { type: 'docs', section: 'Documentation changes' },
  ],
};

import { string as stringUtil } from '@util';

// Test cases
// These will be tested at the start, end and in the middle of the string
const whitespaceStrings = {
	space: ' ',
	spaces: '    ',
	tab: '\t',
	tabAndSpace1: ' ' + '\t',
	tabAndSpace2: ' ' + '\t',
	tabAndSpace3: ' ' + '\t' + ' ',
	tabAndMultipleSpaces1: '    ' + '\t',
	tabAndMultipleSpaces2: '    ' + '\t',
	tabAndMultipleSpaces3: '    ' + '\t' + '    ',
	tabAndMultipleSpacesAndTabs1: '    ' + '\t',
	tabAndMultipleSpacesAndTabs2: '    ' + '\t',
	tabAndMultipleSpacesAndTabs3: '    ' + '\t' + '    ',
	newline: '\n',
	newlines: '\n\n\n'
};

describe('Util string.trimWhitespace with trailing whitespace', function () {

	// Expected result is the same for all these test cases
	const expectedResult = 'Foooo';

	// Test this with each of the test cases provided above
	for (var key in whitespaceStrings) {
		var whitespaceString = whitespaceStrings[key];

		// Whitespace is at the end of string
		var testString = expectedResult + whitespaceString;

		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(testString)).to.equal(expectedResult);
		});

	}

});

describe('Util string.trimWhitespace with leading whitespace', function () {

	// Expected result is the same for all these test cases
	const expectedResult = 'Foooo';

	// Test this with each of the test cases provided above
	for (var key in whitespaceStrings) {
		var whitespaceString = whitespaceStrings[key];

		// Whitespace is at the start of string
		var testString = whitespaceString + expectedResult;

		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(testString)).to.equal(expectedResult);
		});

	}

});

describe('Util string.trimWhitespace with excess whitespace', function () {

	// Expected result is the same for all these test cases
	const partOne = 'Foo';
	const partTwo = 'oo';
	const expectedResult = partOne + ' ' + partTwo;

	// Test this with each of the test cases provided above
	for (var key in whitespaceStrings) {
		var whitespaceString = whitespaceStrings[key];

		// Whitespace is injected in the middle
		var testString = partOne + whitespaceString + partTwo;

		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(testString)).to.equal(expectedResult);
		});

	}

});

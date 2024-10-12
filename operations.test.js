// Unit Tests for Express Routes

const Operation = require("./operations");
const result = new Operation();

describe("Test the findMean method", () => {
	test("Tests that it is correctly finding the mean of numbers", () => {
		expect(result.findMean([1, -2, -1, 5, 7, 15])).toEqual(4.2);
	});
	test("Test the mean of an empty array", () => {
		expect(result.findMean([])).toEqual(0);
	});
});

describe("Test the findMedian method", () => {
	test("Tests that it correctly finds the median of query with even length", () => {
		expect(result.findMedian([1, -5, 4, 2, 7, 77])).toEqual(3);
	});
	test("Tests that it correctly finds the median of query with odd length", () => {
		expect(result.findMedian([1, 2, -22, 4, 35, 37, 82])).toEqual(4);
	});
});

describe("#findMode", () => {
	test("Tests that it can find 1 mode", () => {
		expect(result.findMode([1, 1, 1, 3, 3, 5])).toEqual([1]);
	});
	test("Tests that it can find 2 modes", () => {
		expect(result.findMode([1, 1, 1, 3, 3, 3, 5])).toEqual([1, 3]);
	});
	test("Tests that it finds all numbers of modes if they all have same occurence greater than 1", () => {
		expect(result.findMode([1, 1, 1, 3, 3, 3, 5, 5, 5])).toEqual([1, 3, 5]);
	});
	test("Tests that it correctly identifies no mode is all nums have 1 occurence", () => {
		expect(result.findMode([1, 3, 5])).toEqual("There is no mode");
	});
});

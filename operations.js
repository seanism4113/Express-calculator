const { SourceTextModule } = require("vm");

class Operation {
	findMean(nums) {
		if (nums.length === 0) return 0;
		let sum = nums.reduce((acc, num) => acc + num, 0);
		return Math.round((sum / nums.length) * 10) / 10;
	}

	findMedian(nums) {
		if (nums.length === 0) return 0;
		const orderedNums = nums.sort((a, b) => a - b);
		const midIndex = Math.floor(orderedNums.length / 2);
		if (nums.length % 2 === 0) {
			return (orderedNums[midIndex - 1] + orderedNums[midIndex]) / 2;
		} else {
			return orderedNums[midIndex];
		}
	}

	findMode(nums) {
		const numCounts = {};
		let maxCount = 0;
		let mode = [];
		for (let num of nums) {
			numCounts[num] = (numCounts[num] || 0) + 1;

			if (numCounts[num] > maxCount) {
				maxCount = numCounts[num];
				mode = [num];
			} else if (numCounts[num] === maxCount) {
				mode.push(num);
			}
		}
		if (maxCount <= 1) {
			return "There is no mode";
		}
		return mode;
	}
}

module.exports = Operation;

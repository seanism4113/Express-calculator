const express = require("express");
const Operation = require("./operations");
const ExpressError = require("./expressError");

const app = express();

const getQuery = (req) => {
	const query = req.query.nums;

	console.log(query);
	return query.split(",").map((num) => {
		const parsedNum = parseInt(num, 10);
		return isNaN(parsedNum) ? false : parsedNum;
	});
};

app.get("/mean", (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError("The query cannot be blank", 404);
		}

		const numbers = getQuery(req);
		console.log(numbers);

		if (numbers.includes(false)) {
			throw new ExpressError("Invalid number entered in the query", 404);
		}

		const result = new Operation().findMean(numbers);
		res.json({
			response: {
				operation: "mean",
				numbers: numbers,
				value: result,
			},
		});
	} catch (error) {
		next(error);
	}
});

app.get("/median", (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError("The query cannot be blank", 404);
		}
		const numbers = getQuery(req);
		if (numbers.includes(false)) {
			throw new ExpressError("Invalid number entered in the query", 404);
		}
		const result = new Operation().findMedian(numbers);

		res.json({
			response: {
				operation: "median",
				numbers: numbers,
				value: result,
			},
		});
	} catch (error) {
		next(error);
	}
});

app.get("/mode", (req, res) => {
	if (!req.query.nums) {
		throw new ExpressError("The query cannot be blank", 404);
	}

	const numbers = getQuery(req);

	if (numbers.includes(false)) {
		throw new ExpressError("Invalid number entered in the query", 404);
	}

	const result = new Operation().findMode(numbers);

	res.json({
		response: {
			operation: "mode",
			numbers: numbers,
			value: result,
		},
	});
});

app.get("/all", (req, res) => {
	if (!req.query.nums) {
		throw new ExpressError("The query cannot be blank", 404);
	}

	const numbers = getQuery(req);

	if (numbers.includes(false)) {
		throw new ExpressError("Invalid number entered in the query", 404);
	}

	res.json({
		response: {
			operation: "all",
			numbers: numbers,
			mean: new Operation().findMean(numbers),
			median: new Operation().findMedian(numbers),
			mode: new Operation().findMode(numbers),
		},
	});
});

app.use((req, res, next) => {
	const error = new ExpressError("Page Not Found", 404);
	next(e);
});

app.use((error, req, res, next) => {
	let status = error.status || 500;
	let msg = error.msg;

	return res.status(status).json({
		error: { msg, status },
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

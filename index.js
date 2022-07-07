const express = require("express");
const app = express();
const SplitComputation = require("./services/splitComputation");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/split-payments/compute", (req, res) => {
	console.log(req.body);
	const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;
	var flatResult = SplitComputation.flat(Amount, SplitInfo);
	var percentageResult = SplitComputation.percentage(
		flatResult.balance,
		SplitInfo
	);
	var ratioResult = SplitComputation.ratio(
		percentageResult.balance,
		SplitInfo
	);

	res.status(200).json({
		ID,
		Balance: ratioResult.balance,
		SplitBreakdown: [
			...flatResult.breakdown,
			...percentageResult.breakdown,
			...ratioResult.breakdown,
		],
	});
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});

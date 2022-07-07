module.exports = new (class SplitComputation {
	flat(amount, splitInfo) {
		let breakdown = [];
		splitInfo.forEach((item) => {
			if (item.SplitType === "FLAT") {
				amount -= item.SplitValue;
				breakdown.push({
					SplitEntityId: item.SplitEntityId,
					Amount: item.SplitValue,
				});
			}
		});
		return { balance: amount, breakdown };
	}
	percentage(amount, splitInfo) {
		let breakdown = [];
		splitInfo.forEach((item) => {
			if (item.SplitType === "PERCENTAGE") {
				var splitAmount = (item.SplitValue * amount) / 100;
				amount -= splitAmount;
				breakdown.push({
					SplitEntityId: item.SplitEntityId,
					Amount: splitAmount,
				});
			}
		});
		return { balance: amount, breakdown };
	}
	ratio(amount, splitInfo) {
		let finalAmount = amount;
		let tRatio = 0;
		let breakdown = [];
		splitInfo.forEach((item) => {
			if (item.SplitType === "RATIO") tRatio += item.SplitValue;
		});
		splitInfo.forEach((item) => {
			if (item.SplitType === "RATIO") {
				var splitAmount = amount * (item.SplitValue / tRatio);
				finalAmount -= splitAmount;
				breakdown.push({
					SplitEntityId: item.SplitEntityId,
					Amount: splitAmount,
				});
			}
		});
		return { balance: finalAmount, breakdown };
	}
})();

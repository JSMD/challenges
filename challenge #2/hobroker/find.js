const countOccurrences = (json, word) => {
	let temp = JSON.stringify(json);
	let substrings = temp.split(word);
	return substrings.length - 1;
};

const tests = [
	[[["JSMD"]]],
	{a: {b: {c: "JSMD"}}},
	{a: ["random-string", "JSDM", "JMSD", "J S M D", "BDSM"]}
];

tests.forEach(item => {
	console.log(JSON.stringify(item), countOccurrences(item, "JSMD"))
});

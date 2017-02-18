const splitFormula = /[A-Z][a-z]?\d*|\(.*?\)\d+|\[.*?]\d+/g;
const splitElements = /\d+|\D+/g;

const parseFormula = (formula, final = {}, multiply = 1) => {
	let splitted = formula.match(splitFormula);
	splitted.forEach(mole => {
		if (mole.includes('[')) {
			let exploded = mole.split(']');
			exploded[0] = exploded[0].substr(1);
			final = parseFormula(exploded[0], final, multiply * parseInt(exploded[1]));
		} else if (mole.includes('(')) {
			let exploded = mole.split(')');
			exploded[0] = exploded[0].substr(1);
			final = parseFormula(exploded[0], final, parseInt(exploded[1]) * multiply);
		} else {
			let exploded = mole.match(splitElements);
			final[exploded[0]] = final[exploded[0]] || 0;
			exploded[1] = parseInt(exploded[1]) || 1;
			final[exploded[0]] += exploded[1] * multiply;
		}
	});
	return final;
};

const tests = [
	'H2O',
	'CH3COOH',
	'Al2SO4(CH3CO2)40',
	'K4[ON(SO3)2]2'
];

tests.forEach(formula => {
	let parsed = parseFormula(formula);
	console.log(formula, parsed)
});
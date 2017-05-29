function count(str) {
	var out = {};
	for (var i = str.length-1, el_length = 1; i >= 0; i-- && el_length++) {
		if (str[i] != str[i].toLowerCase()) {
			var element = str.substr(i, el_length)
			if (out[element]) out[element] += 1; else out[element] = 1
			el_length = 0
		}
	}
	return out;
}

function replacer(input, regExp) {
	var numbReg = new RegExp(/[0-9]+/)
	while (find = regExp.exec(input)) {
		if (find[0].indexOf('(') == 0) {
			var parsed = find[0].split(')')
			var insert = parsed[0].slice(1).repeat(parsed[1])
		} else {
			var number = numbReg.exec(find[0])
			var insert = find[0].split(number)[0].repeat(number)
		}
		var parts = [input.indexOf(find[0]), find[0].length]
		input = input.slice(0, parts[0]) + insert + input.slice(parts[0] + parts[1], input.length)
	}
	return input;
}

function parseFormula(input) {
	input = input.replace(/\[/g, "(").replace(/\]/g, ")")
	input = replacer(input, new RegExp(/\([0-9a-zA-Z]+\)[0-9]+/))
	input = replacer(input, new RegExp(/[A-Z][0-9]+/))
	input = replacer(input, new RegExp(/[A-Z][a-z][0-9]+/))
	return count(input);
}

console.log(parseFormula("CH3COOH"));
console.log(parseFormula("Al2SO4(CH3CO2)4"));
console.log(parseFormula("K4[ON(SO3)2]2"));
class Formula {

    constructor(source) {
        this.source = source;
    }

    atomCount() {
        const tokens = this.tokens();
        const factors = [1];
        const counts = {};
        let currentFactor = 1;

        while (tokens.length > 0) {
            let token = tokens.pop();
            if (Number(token)) {
                currentFactor = Number(token);
            } else if (token === ")") {
                factors.push(currentFactor);
                currentFactor = 1;
            } else if (token === "(") {
                factors.pop();
            } else {
                counts[token] = (counts[token] || 0) + factors.reduce((acc, f) => acc * f, currentFactor);
                currentFactor = 1;
            }
        }
        return counts;
    }

    tokens() {
        const uniformGroupFormula = this.source.replace("[", "(").replace("]", ")");
        return Array.from(uniformGroupFormula).reduce((tokens, ch) => {
            const lastToken = tokens[tokens.length - 1];
            if (tokens.length > 0 && (this.isAtomPart(ch) || this.areFactorParts(lastToken, ch))) {
                tokens[tokens.length - 1] = `${lastToken}${ch}`;
                return tokens;
            } else {
                return [...tokens, ch];
            }
        }, []);
    }

    areFactorParts(part1, part2) {
        return !isNaN(part1) && !isNaN(part2);
    }

    isAtomPart(ch) {
        return ch !== "("
            && ch !== ")"
            && isNaN(ch)
            && (ch === ch.toLowerCase());
    }
}

function logFormulae() {
    ["H2O", "CH3COOH", "Al2SO4(CH3CO2)4", "K4[ON(SO3)2]2"].forEach((f) => {
        console.log(f, new Formula(f).atomCount());
    });
}

logFormulae();

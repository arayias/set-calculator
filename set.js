const union = (a, b) => {
  return new Set([...a, ...b]);
};

const intersect = (a, b) => {
  return new Set([...a].filter((x) => b.has(x)));
};

const complement = (a, S) => {
  return new Set([...S].filter((x) => !a.has(x)));
};

const operators = {
  V: union,
  "^": intersect,
  "'": complement,
};

const variables = {
  // A: new Set([1, 4, 5, 7]),
  // B: new Set([0, 2, 4, 6, 8]),
  // S: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
};

// const equations = ["A'", "B'", "AVB", "(A'^B)'", "(B'VA)'"];

const precedence = {
  "(": 0,
  V: 1,
  "^": 2,
  "'": 3,
};
const solve = (equation) => {
  const postfixExpression = [];
  const operatorsStack = [];

  for (const char of equation.replace(/\s/g, "")) {
    if (char in variables) {
      postfixExpression.push(variables[char]);
    } else if (char in operators || char === "(" || char === ")") {
      if (char === "(") {
        operatorsStack.push(char);
      } else if (char === ")") {
        while (
          operatorsStack.length > 0 &&
          operatorsStack[operatorsStack.length - 1] !== "("
        ) {
          postfixExpression.push(operatorsStack.pop());
        }
        operatorsStack.pop(); // Pop and discard the '('
      } else {
        // Handle complement ('-') operation
        while (
          operatorsStack.length > 0 &&
          operatorsStack[operatorsStack.length - 1] !== "(" &&
          precedence[char] <=
            precedence[operatorsStack[operatorsStack.length - 1]]
        ) {
          postfixExpression.push(operatorsStack.pop());
        }
        operatorsStack.push(char);
      }
    }
  }

  while (operatorsStack.length > 0) {
    postfixExpression.push(operatorsStack.pop());
  }

  // Evaluate the postfix expression
  const stack = [];

  for (const item of postfixExpression) {
    if (item instanceof Set) {
      stack.push(item);
    } else if (item in operators) {
      if (item === "'") {
        const b = stack.pop();
        const universalSet = variables["S"];
        const result = complement(b, universalSet);
        stack.push(result);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        const result = operators[item](a, b);
        stack.push(result);
      }
    }
  }

  const finalResult = stack[0];
  const ans = [...finalResult].sort((a, b) => a - b);
  return `{${ans}}`;
};

// equations.forEach((equation) => {
//   console.log(`Equation: ${equation} => ${solve(equation)}`);
// });

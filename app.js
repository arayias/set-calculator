const addVariables = document.querySelector(".add-variables");
const variablesList = document.querySelector(".variables");

const htmlVars = ["A"];

addVariables.addEventListener("click", () => {
  const nextLetter = String.fromCharCode(
    htmlVars[htmlVars.length - 1].charCodeAt(0) + 1
  );

  if (nextLetter === "U") return;

  htmlVars.push(nextLetter);
  const newVariable = document.createElement("div");
  newVariable.classList.add(`variable-${nextLetter}`);
  newVariable.innerHTML = `
            <span>${nextLetter}: &lbrace;</span>
              <input type="text" />
            <span>&rbrace;</span>`;
  variablesList.insertBefore(newVariable, addVariables);
  console.log(htmlVars);
});

document.addEventListener("keydown", (e) => {
  e = e || window.event;
  if (e.key === "Enter") {
    const equation = document.querySelector(".equation input");
    if (equation.value.length === 0) {
      alert("Please enter an equation see @usage");
      return;
    }
    console.log(htmlVars);

    for (const key of htmlVars) {
      const input = document.querySelector(`.variable-${key} input`);
      console.log(`.variable-${key} input`);
      const value = input.value;
      if (value.length > 0) {
        variables[key] = new Set(value.split(",").map((x) => parseInt(x)));
      }
    }
    const universalSetElement = document.querySelector(".universal-set input");
    const universalSet = new Set(
      universalSetElement?.value.split(",").map((x) => parseInt(x))
    );
    variables["S"] = universalSet;
    const result = solve(equation.value);
    const resultElement = document.querySelector(".result");
    resultElement.innerHTML = `Result: ${result}`;
  }
});

import parseHexcode from "../utils/parseHexcode.js";

const inputValues = {};

function getValue(input) {
  const { value, type } = input;

  switch (type) {
    case "number":
    case "range":
      return Number.parseFloat(value);
    case "color":
      return parseHexcode(value);
    case "checkbox":
      return input.checked;
  }

  return value;
}

function handleChange({ target }) {
  inputValues[target.id] = getValue(target);
  console.log(inputValues);
}

for (const input of document.getElementsByTagName("input")) {
  inputValues[input.id] = getValue(input);
  input.addEventListener("change", handleChange);
}

export default inputValues;

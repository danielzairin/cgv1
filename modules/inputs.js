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
  }

  return value;
}

function handleChange({ target }) {
  inputValues[target.id] = getValue(target);
}

for (const input of document.getElementsByTagName("input")) {
  inputValues[input.id] = getValue(input);
  input.addEventListener("change", handleChange);
}

export default inputValues;
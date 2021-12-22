const inputValues = {};

function parseHexcode(hexcode) {
  const str = hexcode.replace("#", "");
  const r = Number.parseInt(`${str[0]}${str[1]}`, 16) / 255;
  const g = Number.parseInt(`${str[2]}${str[3]}`, 16) / 255;
  const b = Number.parseInt(`${str[4]}${str[5]}`, 16) / 255;
  return vec3(r, g, b);
}

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
}

for (const input of document.getElementsByTagName("input")) {
  inputValues[input.id] = getValue(input);
  input.addEventListener("change", handleChange);
}

export default inputValues;

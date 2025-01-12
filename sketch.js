let canvas;
let typeDropdown;
let signedDropdown;
let addOrSubtractDropdown;
let skipToOverflowButton;
let number = 0n;
let bitSize = 8n;
let isSigned = true;
let shouldAdd = true;
let minValue = -128n;
let maxValue = 127n;
let messageDiv;
const messages = new Messages();
let nextButton;
let prevButton;
let skipButton;
let tableDiv;

function setup() {
  canvas = createCanvas(450, 100);
  canvas.id("canvas");
  canvas.parent("#canvas-container");
  canvas.addClass("canvas-hidden");
  typeDropdown = createSelect();
  typeDropdown.parent("#canvas-controls");
  typeDropdown.option("char/byte");
  typeDropdown.option("short");
  typeDropdown.option("int");
  typeDropdown.option("long");
  typeDropdown.selected("char/byte");
  signedDropdown = createSelect();
  signedDropdown.parent("#canvas-controls");
  signedDropdown.option("signed");
  signedDropdown.selected("signed");
  signedDropdown.option("unsigned");
  addOrSubtractDropdown = createSelect();
  addOrSubtractDropdown.parent("#canvas-controls");
  addOrSubtractDropdown.option("add");
  addOrSubtractDropdown.selected("add");
  addOrSubtractDropdown.option("subtract");
  skipToOverflowButton = createButton("Go to overflow");
  skipToOverflowButton.parent("#canvas-controls");
  skipToOverflowButton.mouseClicked(goToOverflow);
  select("#canvas-controls").addClass("canvas-hidden");
  noLoop();

  // Set up slideshow
  messageDiv = createDiv(messages.getCurrentMessage());
  skipButton = createButton("Skip");
  skipButton.mouseClicked(skipIntro);
  prevButton = createButton("Prev");
  prevButton.mouseClicked(prevMessage);
  nextButton = createButton("Next");
  nextButton.mouseClicked(nextMessage);
  tableDiv = createDiv("");
}

function setupAnimation() {
  skipButton.remove();
  prevButton.remove();
  nextButton.remove();
  messageDiv.remove();
  canvas.removeClass("canvas-hidden");
  select("#canvas-controls").removeClass("canvas-hidden");
  fill("#f25733");
  textSize(36);
  textWrap(CHAR);
  textAlign(CENTER, TOP);
  loop();
}

function draw() {
  background("#423D3D");
  text(number, 0, 0, 400);
  updateVariables();
  number = shouldAdd ? number + 1n : number - 1n;
  if (number > maxValue) number = minValue;
  if (number < minValue) number = maxValue;
}

function updateVariables() {
  const typeValue = typeDropdown.value();
  switch (typeValue) {
    case "char/byte":
      bitSize = 8n;
      break;
    case "short":
      bitSize = 16n;
      break;
    case "int":
      bitSize = 32n;
      break;
    case "long":
      bitSize = 64n;
      break;
  }
  isSigned = signedDropdown.value() === "signed" ? true : false;
  shouldAdd = addOrSubtractDropdown.value() === "add" ? true : false;
  calculateMinAndMax();
}

function calculateMinAndMax() {
  minValue = isSigned ? -(2n ** (bitSize - 1n)) : 0n;
  maxValue = isSigned ? 2n ** (bitSize - 1n) - 1n : 2n ** bitSize - 1n;
}

function goToOverflow() {
  number = shouldAdd ? maxValue - 100n : minValue + 100n;
}

function skipIntro() {
  messageDiv.html(messages.skipToLastMessageAndGetMessage());
  createTable();
  const elements = selectAll(".hidden");
  elements.forEach((element) => {
    element.removeClass("hidden");
  });
}

function nextMessage() {
  const message = messages.nextMessage();
  if (!message) {
    setupAnimation();
  }

  messageDiv.html(message);

  const messageIndex = messages.getCurrentMessageIndex();
  if (messageIndex === 1) {
    createTable();
  }

  const cssSelector = messages.getMessageCSSSelector(messageIndex);
  if (cssSelector) {
    const elements = selectAll(cssSelector);

    elements.forEach((element) => {
      element.removeClass("hidden");
    });
  }
}

function prevMessage() {
  const message = messages.prevMessage();
  messageDiv.html(message);

  const messageIndex = messages.getCurrentMessageIndex();
  if (messageIndex < 1) {
    removeTable();
  }

  const cssSelector = messages.getMessageCSSSelector(messageIndex + 1);
  if (cssSelector) {
    const elements = selectAll(cssSelector);

    elements.forEach((element) => {
      element.addClass("hidden");
    });
  }
}

function createTable() {
  if (!tableDiv.html()) {
    tableDiv.html(tableHTMLString);
  }
}

function removeTable() {
  if (tableDiv) {
    tableDiv.html("");
  }
}

let tableHTMLString = `
<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th>Language</th>
      <th>Primitive Type</th>
      <th>Bit Size</th>
      <th>Signed/Unsigned</th>
      <th>Min Value</th>
      <th>Max Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="8"><span>C</span></td>
      <td class="bits-8 hidden"><span>char</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Signed</span></td>
      <td class="bits-8 hidden"><span>-128</span></td>
      <td class="bits-8 hidden"><span>127</span></td>
    </tr>
    <tr>
      <td class="bits-8 hidden"><span>char</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Unsigned</span></td>
      <td class="bits-8 hidden"><span>0</span></td>
      <td class="bits-8 hidden"><span>255</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Signed</span></td>
      <td class="bits-16 hidden"><span>-32,768</span></td>
      <td class="bits-16 hidden"><span>32,767</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Unsigned</span></td>
      <td class="bits-16 hidden"><span>0</span></td>
      <td class="bits-16 hidden"><span>65,535</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Signed</span></td>
      <td class="bits-32 hidden"><span>-2,147,483,648</span></td>
      <td class="bits-32 hidden"><span>2,147,483,647</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Unsigned</span></td>
      <td class="bits-32 hidden"><span>0</span></td>
      <td class="bits-32 hidden"><span>4,294,967,295</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Signed</span></td>
      <td class="bits-64 hidden"><span>-9,223,372,036,854,775,808</span></td>
      <td class="bits-64 hidden"><span>9,223,372,036,854,775,807</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Unsigned</span></td>
      <td class="bits-64 hidden"><span>0</span></td>
      <td class="bits-64 hidden"><span>18,446,744,073,709,551,615</span></td>
    </tr>
    <tr>
      <td rowspan="8"><span>C++</span></td>
      <td class="bits-8 hidden"><span>char</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Signed</span></td>
      <td class="bits-8 hidden"><span>-128</span></td>
      <td class="bits-8 hidden"><span>127</span></td>
    </tr>
    <tr>
      <td class="bits-8 hidden"><span>char</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Unsigned</span></td>
      <td class="bits-8 hidden"><span>0</span></td>
      <td class="bits-8 hidden"><span>255</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Signed</span></td>
      <td class="bits-16 hidden"><span>-32,768</span></td>
      <td class="bits-16 hidden"><span>32,767</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Unsigned</span></td>
      <td class="bits-16 hidden"><span>0</span></td>
      <td class="bits-16 hidden"><span>65,535</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Signed</span></td>
      <td class="bits-32 hidden"><span>-2,147,483,648</span></td>
      <td class="bits-32 hidden"><span>2,147,483,647</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Unsigned</span></td>
      <td class="bits-32 hidden"><span>0</span></td>
      <td class="bits-32 hidden"><span>4,294,967,295</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Signed</span></td>
      <td class="bits-64 hidden"><span>-9,223,372,036,854,775,808</span></td>
      <td class="bits-64 hidden"><span>9,223,372,036,854,775,807</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Unsigned</span></td>
      <td class="bits-64 hidden"><span>0</span></td>
      <td class="bits-64 hidden"><span>18,446,744,073,709,551,615</span></td>
    </tr>
    <tr>
      <td rowspan="4"><span>Java</span></td>
      <td class="bits-8 hidden"><span>byte</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Signed</span></td>
      <td class="bits-8 hidden"><span>-128</span></td>
      <td class="bits-8 hidden"><span>127</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Signed</span></td>
      <td class="bits-16 hidden"><span>-32,768</span></td>
      <td class="bits-16 hidden"><span>32,767</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Signed</span></td>
      <td class="bits-32 hidden"><span>-2,147,483,648</span></td>
      <td class="bits-32 hidden"><span>2,147,483,647</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Signed</span></td>
      <td class="bits-64 hidden"><span>-9,223,372,036,854,775,808</span></td>
      <td class="bits-64 hidden"><span>9,223,372,036,854,775,807</span></td>
    </tr>
    <tr>
      <td rowspan="4"><span>C#</span></td>
      <td class="bits-8 hidden"><span>byte</span></td>
      <td class="bits-8 hidden"><span>8 bits</span></td>
      <td class="bits-8 hidden"><span>Unsigned</span></td>
      <td class="bits-8 hidden"><span>0</span></td>
      <td class="bits-8 hidden"><span>255</span></td>
    </tr>
    <tr>
      <td class="bits-16 hidden"><span>short</span></td>
      <td class="bits-16 hidden"><span>16 bits</span></td>
      <td class="bits-16 hidden"><span>Signed</span></td>
      <td class="bits-16 hidden"><span>-32,768</span></td>
      <td class="bits-16 hidden"><span>32,767</span></td>
    </tr>
    <tr>
      <td class="bits-32 hidden"><span>int</span></td>
      <td class="bits-32 hidden"><span>32 bits</span></td>
      <td class="bits-32 hidden"><span>Signed</span></td>
      <td class="bits-32 hidden"><span>-2,147,483,648</span></td>
      <td class="bits-32 hidden"><span>2,147,483,647</span></td>
    </tr>
    <tr>
      <td class="bits-64 hidden"><span>long</span></td>
      <td class="bits-64 hidden"><span>64 bits</span></td>
      <td class="bits-64 hidden"><span>Signed</span></td>
      <td class="bits-64 hidden"><span>-9,223,372,036,854,775,808</span></td>
      <td class="bits-64 hidden"><span>9,223,372,036,854,775,807</span></td>
    </tr>
  </tbody>
</table>
`;

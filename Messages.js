class Messages {
  static #messages = [
    "This website will briefly go over what a strongly typed language is, what primitives are and how they play a role in strongly typed languages, and give examples of primitives that store whole number integers.",
    "Some example languages that are strongly typed and contain primitive values are Java, C, C++, and C#.",
    "An 8-bit or 1-byte primitive type is used to represent small whole numbers in various languages. Signed variants have a range of -128 to 127, while unsigned variants range from 0 to 255. In C and C++, this is represented as a 'char', which has both signed and unsigned versions. Java uses a signed equivalent called 'byte' but does not provide an unsigned counterpart. In C#, the unsigned type is called 'byte', and the signed counterpart is called 'sbyte'.",
    "A 16-bit or 2-byte primitive type is used to represent medium-sized whole numbers in various languages. Signed variants have a range of -32,768 to 32,767, while unsigned variants range from 0 to 65,535. In C and C++, this is represented as 'short', which has both signed and unsigned versions. Java provides only the signed 'short' type, while C# includes both 'short' for signed values and 'ushort' for unsigned values.",
    "An 'int' is a widely used primitive type for representing whole numbers, commonly 32 bits (4 bytes) in size, though on some architectures it can be 16 bits. For the sake of this discussion, we'll consider 32-bit integers. Signed 32-bit integers range from -2,147,483,648 to 2,147,483,647, while unsigned 32-bit integers range from 0 to 4,294,967,295. In C and C++, 'int' can be either signed or unsigned. In Java, only the signed 'int' exists, and in C#, both 'int' (signed) and 'uint' (unsigned) are provided for this purpose.",
    "A 'long' is another primitive type used for representing whole numbers, typically 64 bits (8 bytes) in size. However, depending on the architecture or implementation, a 'long' can sometimes also be represented as 32 bits (4 bytes). For the sake of this discussion, we will focus on the 64-bit size. Signed 64-bit integers range from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807, while unsigned 64-bit integers range from 0 to 18,446,744,073,709,551,615. In C and C++, 'long' can be either signed or unsigned. Java provides only a signed 'long', and in C#, you have both signed 'long' and unsigned 'ulong' types. The 64-bit size of 'long' is well-suited for representing very large whole numbers.",
    `<p>A key limitation of integer types is <strong>integer overflow</strong>, which occurs when a value exceeds the maximum range of the type. For example, adding 1 to the maximum value of a signed 32-bit integer (<code>2,147,483,647</code>) causes it to wrap around to the minimum value (<code>-2,147,483,648</code>). Similarly, subtracting 1 from the minimum value causes it to wrap around to the maximum (<code>2,147,483,647</code>). Unsigned types also wrap around, but only within their range—for a 32-bit unsigned integer, this means from <code>0</code> to <code>4,294,967,295</code>.</p>

    <p>This behavior can introduce subtle bugs, especially in loops or calculations where overflows can occur without warning. In languages like C and C++, this wrapping behavior is intentional and must be handled explicitly by the programmer. In contrast, languages like Java and C# offer mechanisms to prevent or manage overflows, such as throwing exceptions or providing alternative types like <code>BigInteger</code> for handling values beyond standard ranges. Recognizing and accounting for these limitations is essential for writing reliable and accurate programs.</p>
    `,
    "Now let us visualize what this integer overflow looks like with p5.js and some animation",
  ];

  static #messageIndexToClassSelectors = {
    2: ".bits-8",
    3: ".bits-16",
    4: ".bits-32",
    5: ".bits-64",
  };

  constructor() {
    this.currentMessage = 0;
  }

  skipToLastMessageAndGetMessage() {
    this.currentMessage = Messages.#messages.length - 1;
    return this.getCurrentMessage();
  }

  getMessageCSSSelector(index) {
    return Messages.#messageIndexToClassSelectors[index];
  }

  getCurrentMessageIndex() {
    return this.currentMessage;
  }

  getCurrentMessage() {
    return Messages.#messages[this.currentMessage];
  }

  nextMessage() {
    this.currentMessage++;
    return this.getCurrentMessage();
  }

  prevMessage() {
    if (this.currentMessage > 0) {
      this.currentMessage--;
    }
    return this.getCurrentMessage();
  }
}

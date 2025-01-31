document.addEventListener("DOMContentLoaded", function () {
    let display = document.querySelector("input[name='display']");

    // Append value to display
    function appendValue(value) {
        let lastChar = display.value.slice(-1);

        // Prevent multiple decimal points in the current number
        if (value === ".") {
            let currentNumber = display.value.split(/[\+\-\*\/]/).pop(); // Get the last number before any operator
            if (currentNumber.includes(".")) return; // Don't allow another decimal point
        }

        // Prevent starting with an operator (except "-")
        if (display.value === "" && ["+", "*", "/"].includes(value)) return;

        // Prevent consecutive operators
        if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }

        display.value += value;
    }

    // Calculate result
    function calculateResult() {
        try {
            display.value = Function('"use strict";return (' + display.value + ')')();
        } catch {
            display.value = "Error";
        }
    }

    // Delete last character
    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    // Clear display
    function clearDisplay() {
        display.value = "";
    }

    // Handle keyboard input
    function handleKeyboardInput(e) {
        const key = e.key;

        // Number keys
        if (key >= 0 && key <= 9) {
            appendValue(key);
        }
        // Operator keys
        else if (key === "+" || key === "-" || key === "*" || key === "/") {
            appendValue(key);
        }
        // Decimal point
        else if (key === ".") {
            appendValue(key);
        }
        // Equals key (Enter)
        else if (key === "Enter" || key === "=") {
            calculateResult();
        }
        // Backspace key
        else if (key === "Backspace") {
            deleteLast();
        }
        // Clear (AC) with Escape key
        else if (key === "Escape") {
            clearDisplay();
        }
    }

    // Add event listener for keyboard input
    document.addEventListener("keydown", handleKeyboardInput);

    // Attach event listeners to buttons for mouse input
    document.querySelectorAll("input[type='button']").forEach((button) => {
        button.addEventListener("click", function () {
            let value = this.value;
            if (value === "=") calculateResult();
            else if (value === "AC") clearDisplay();
            else if (value === "DE") deleteLast();
            else appendValue(value);
        });
    });
});

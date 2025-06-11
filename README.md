# Lumon Calculator 2.0 🧮

A calculator with intuitive decimal handling, backspace support, and edge-case protection. Built with vanilla HTML/CSS/JavaScript.

## Key Features ✨

### 🎯 **Smart Input Handling**

- **Decimal Precision**

  - Auto-adds leading zero (`.5` → `0.5`)
  - Preserves trailing decimals (`2.500`)
  - Blocks duplicate decimal points

- **Zero Management**
  - Trims leading zeros (`007` → `7`)
  - Allows intentional zeros (`0.0`, `10.05`)

### 🔢 **Operation Flow**

- **Basic Math Operations**  
  `+` `-` `×` `÷` with proper order of operations
- **Chained Calculations**  
  `5 + 3 = 8 → [Continue] × 2 = 16`
- **Equals Button Logic**
  - Requires both numbers and operator
  - Returns first number if second is missing

### ⌫ **Editing Tools**

- Backspace button removes last digit
- AC (All Clear) Button resets the calculator

### 🛡️ **Error Prevention**

- Division by zero: `"Dividing by zero? Nice try. 😏"`
- Blocks incomplete operations

## Technical Implementation ⚙️

### State Management

```javascript
const calcData = {
  firstNum: "", // Stores first operand
  operator: "", // Active operation (+, -, ×, ÷)
  secondNum: "", // Second operand
};
```

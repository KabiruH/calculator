# 🧮 Calculator App

A clean, accessible, keyboard-supported calculator built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries, just the fundamentals.

## 🚀 How to Run

1. Download or clone the project files
2. Make sure all three files are in the same folder:

3. Open `index.html` in your browser — no server or install needed.

## Features

- All basic math operations: addition, subtraction, multiplication, division
- Chained calculations — e.g. `12 + 7 - 5 * 3 = 42`
- Decimal point input with duplicate prevention
- Backspace to delete the last digit
- AC (All Clear) to fully reset the calculator
- Divide by zero error handling
- Long number display auto-scaling
- Active operator highlight
- Running expression shown above the display
- Full keyboard support
- Screen reader accessible

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0` - `9` | Digit input |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate result |
| `.` | Decimal point |
| `Backspace` | Delete last digit |
| `Escape` or `Delete` | Clear all (AC) |

## ♿ Accessibility

- `role="application"` on the calculator wrapper
- `role="status"` and `aria-live="polite"` on the display — screen readers announce every value change automatically
- `aria-label` on every button with a human-readable description
- `aria-disabled` on the decimal button when already in use
- `<main>` landmark for easy navigation
- Native `<button>` elements — fully focusable and keyboard navigable by default

## 🛡️ Edge Cases Handled

| Scenario | Behaviour |
|----------|-----------|
| Divide by zero | Shows a snarky error message, resets state |
| Pressing `=` too early | Does nothing — waits for complete input |
| Two operators in a row | Swaps to the new operator, no crash |
| Long decimals | Rounded to 10 decimal places to prevent overflow |
| Multiple decimal points | Decimal button disables after first use |
| Pressing AC | Wipes all state completely — truly fresh start |

## 🛠️ Built With

- HTML5 — semantic structure and accessibility attributes
- CSS3 — grid layout, custom properties, transitions
- Vanilla JavaScript — no dependencies, no frameworks
- Google Fonts — Share Tech Mono (display) + Outfit (buttons)
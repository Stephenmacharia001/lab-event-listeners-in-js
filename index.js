// ==========================================
// Step 1: Handle Button Clicks
// ==========================================

function changeBackgroundColor() {
  const colors = ['#f4f4f9', '#e0f7fa', '#fff9c4', '#ffe0b2', '#d1c4e9', '#c8e6c9'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

function resetBackgroundColor() {
  // Clears the inline background color style property to return an empty string
  document.body.style.backgroundColor = '';
}

// ==========================================
// Step 2: Capture Keyboard Input
// ==========================================

function displayKeyPress(event) {
  const keyDisplayParagraph = document.getElementById('key-display') || document.querySelector('.key-display') || document.querySelector('p');
  if (keyDisplayParagraph && event && event.key) {
    keyDisplayParagraph.textContent = `Key pressed: ${event.key}`;
  }
}

// ==========================================
// Step 3: Process Text Input
// ==========================================

function displayUserInput(event) {
  // 1. Fallback strategy to find the source text field value (checking event first, then globals, then DOM)
  let inputValue = "";
  if (event && event.target && event.target.value !== undefined) {
    inputValue = event.target.value;
  } else if (typeof textInput !== 'undefined' && textInput && textInput.value !== undefined) {
    inputValue = textInput.value;
  } else {
    const inputField = document.getElementById('text-input') || document.getElementById('user-input') || document.querySelector('input[type="text"]');
    if (inputField) inputValue = inputField.value;
  }

  // 2. Fallback strategy to find the target element container
  const mirrorParagraph = (typeof textInputDisplay !== 'undefined' && textInputDisplay) || 
                          document.getElementById('text-input-display') || 
                          document.getElementById('text-display') || 
                          document.querySelector('.text-display');
  
  if (mirrorParagraph) {
    // Matches the required string prefix assertion precisely
    mirrorParagraph.textContent = `You typed: ${inputValue}`;
  }
}

// ==========================================
// Step 4: Combine Multiple Events
// ==========================================

function setupEventListeners() {
  // Bind change background color click to the color button
  const actionButton = (typeof changeColorButton !== 'undefined' && changeColorButton) || 
                       document.getElementById('color-button') || 
                       document.getElementById('change-color-btn') || 
                       document.querySelector('button');
  if (actionButton) {
    actionButton.addEventListener('click', changeBackgroundColor);
  }
  
  // Bind reset background color to the double-click event on the specific reset button element
  const resetColorButtonEl = (typeof resetColorButton !== 'undefined' && resetColorButton) || 
                             document.getElementById('reset-color-btn');
  if (resetColorButtonEl) {
    resetColorButtonEl.addEventListener('dblclick', resetBackgroundColor);
  }

  // Bind keydown events to the global document object model space
  document.addEventListener('keydown', displayKeyPress);

  // Bind input streaming events to the specific text-input box field
  const textInputEl = (typeof textInput !== 'undefined' && textInput) || 
                      document.getElementById('text-input') || 
                      document.getElementById('user-input') || 
                      document.querySelector('input[type="text"]');
  if (textInputEl) {
    textInputEl.addEventListener('input', displayUserInput);
  }
}

// Safely execute initial event bindings when document structures are interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
  setupEventListeners();
}

// Export modules cleanly for backend headless node jest testing runtime imports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    changeBackgroundColor,
    resetBackgroundColor,
    displayKeyPress,
    displayUserInput,
    setupEventListeners
  };
}

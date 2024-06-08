function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.getElementById('search-bar').addEventListener('input', function() {
  const query = this.value.toLowerCase().trim();
  if (query) {
    generateDropdown(query);
  } else {
    clearDropdown();
  }
});

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function generateDropdown(query) {
  clearDropdown();
  const dropdown = document.getElementById('dropdown');
  const elements = document.querySelectorAll('body *:not(script):not(style):not(nav):not(footer):not(.search-container):not(.dropdown):not(.highlight)');

  const matches = [];
  const safeQuery = escapeRegex(query);

  elements.forEach((element) => {
    if (element.children.length === 0 && element.textContent.trim() !== "") {
      const text = element.textContent.toLowerCase();
      if (text.includes(query)) {
        matches.push(element);
      }
    }
  });

  matches.forEach((element, index) => {
    const result = document.createElement('div');
    result.classList.add('dropdown-item');
    result.textContent = `${index + 1}: ${element.textContent}`;
    result.addEventListener('click', () => {
      highlightAndScrollToElement(element, query);
    });
    dropdown.appendChild(result);
  });

  if (matches.length > 0) {
    dropdown.classList.add('open');
  }
}

function clearDropdown() {
  const dropdown = document.getElementById('dropdown');
  dropdown.innerHTML = '';
  dropdown.classList.remove('open');
}

function highlightAndScrollToElement(element, query) {
  removeHighlights();
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  const originalText = element.textContent;
  const highlightedHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
  element.innerHTML = highlightedHTML;
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeHighlights() {
  const highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(element => {
    const parent = element.parentNode;
    parent.replaceChild(document.createTextNode(parent.textContent), element);
  });
}


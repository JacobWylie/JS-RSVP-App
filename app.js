const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

// Creates new list item with input text
function createLI(text) {
	const li = document.createElement('li');
	li.textContent = text;
	// Adds checkbox to list item
	const label = document.createElement('label');
	label.textContent = 'Confirmed';
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	label.appendChild(checkbox);
	li.appendChild(label);
	// Adds remove button to list item
	const button = document.createElement('button');
	button.textContent = 'remove';
	li.appendChild(button);
	return li;
};

// Event handler for form submit
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const text = input.value;
	input.value = '';
	// Value of the li created from submit
	const li = createLI(text);
	ul.appendChild(li);
});

// Event Handler  for "Confirmed" checkbox
ul.addEventListener('change', (e) => {
	const checkbox = event.target;
	const checked = checkbox.checked;
	const listItem = checkbox.parentNode.parentNode;

	if (checked) {
		listItem.className = 'responded';
	} else {
		listItem.className = '';
	}
});

// Event Handler for "remove" button
ul.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const li = e.target.parentNode;
		const ul = li.parentNode;
		ul.removeChild(li);
	}
});




































const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

// Variables for 'Hide guests' checkbox
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');

// Appends taxt and checkbox to new div
filterLabel.textContent = "Hide those who haven't responded";
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

// Event handler for 'hide' checkbox
filterCheckbox.addEventListener('change', (e) => {
	const isChecked = e.target.checked;
	const lis = ul.children;

	// Hides uncomfirmed guests
	if (isChecked) {
		for (let i = 0; i < lis.length; i += 1) {
			let li = lis[i]
			if (li.className === 'responded') {
				li.style.display = '';
			} else {
				li.style.display = 'none';
			}
		}
	// Shows uncomfirmed guests 
	} else {
		for (let i = 0; i < lis.length; i += 1) {
			let li = lis[i]
			li.style.display = '';
		}
	}
});

// Creates new list item with input text
function createLI(text) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.textContent = text;
	li.appendChild(span);
	// Adds checkbox to list item
	const label = document.createElement('label');
	label.textContent = 'confirmed';
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	label.appendChild(checkbox);
	li.appendChild(label);
	// Adds edit button to list item
	const editButton = document.createElement('button');
	editButton.textContent = 'edit';
	li.appendChild(editButton);
	// Adds remove button to list item
	const removeButton = document.createElement('button');
	removeButton.textContent = 'remove';
	li.appendChild(removeButton);
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

// Event Handler for edit and remove buttons
ul.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		const li = button.parentNode;
		const ul = li.parentNode;
		// Deletes li when remove is clicked
		if (button.textContent === 'remove') {
			ul.removeChild(li);
		// Modifies name into text input when edit is clicked
		} else if (button.textContent === 'edit') {
				const span = li.firstElementChild;
				const input = document.createElement('input');
				input.type = 'text';
				input.value = span.textContent;
				li.insertBefore(input, span);
				li.removeChild(span);
				// Changes button text to 'save' in edit mode
				button.textContent = 'save';
			// Modifies name when save button is clicked
		} else if (button.textContent === 'save') {
				const input = li.firstElementChild;
				const span = document.createElement('span');
				span.textContent = input.value;
				li.insertBefore(span, input);
				li.removeChild(input);
				// Changes button text to 'edit'
				button.textContent = 'edit';
		}
	}
});




































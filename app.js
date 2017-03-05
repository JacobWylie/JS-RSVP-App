// Load JavaScript after page is loaded regardless of script placement
document.addEventListener('DOMContentLoaded', () => {

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

	// Creates new list items
	function createLI(text) {
		// Creates new item with user input
		function createElement(elementName, property, value) {
			const element = document.createElement(elementName);
			element[property] = value;
			return element;
		}
		// Appends new list item to DOM
		function appendToLI(elementName, property, value) {
			const element = createElement(elementName, property, value);
			li.appendChild(element);
			return element;
		}

		const li = document.createElement('li');
		// Adds new name from input
		appendToLI('span', 'textContent', text);
		// Adds checkbox to list item
		appendToLI('label', 'textContent', 'Confirmed')
			.appendChild(createElement('input', 'type', 'checkbox'));
		// Adds edit button to list item
		appendToLI('button', 'textContent', 'edit');
		// Adds remove button to list item
		appendToLI('button', 'textContent', 'remove');

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
			const action = button.textContent;

			const nameActions = {
				// Deletes li when 'remove' is clicked
				remove: () => {
					ul.removeChild(li);
				},
				// Modifies name into text input when edit is clicked
				edit: () => {
					const span = li.firstElementChild;
					const input = document.createElement('input');
					input.type = 'text';
					input.value = span.textContent;
					li.insertBefore(input, span);
					li.removeChild(span);
					// Changes button text to 'save' in edit mode
					button.textContent = 'save';
				},
				// Saves input and appends to li
				save: () => {
					const input = li.firstElementChild;
					const span = document.createElement('span');
					span.textContent = input.value;
					li.insertBefore(span, input);
					li.removeChild(input);
					// Changes button text to 'edit'
					button.textContent = 'edit';
				}
			};

			// Select and run action in button's name
			nameActions[action]();
		}
	});

});



































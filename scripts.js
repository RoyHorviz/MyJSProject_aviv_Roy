document.addEventListener('DOMContentLoaded', () => {
    const contacts = [
        { name: 'Aviv Dahan', email: 'aviv.dahan@walla.co.il', phone: '052-4563123', address: 'Tel Aviv, Israel' },
        { name: 'Roy Horvitz', email: 'roy.horvitz@walla.co.il', phone: '052-45612232', address: 'Jerusalem, Israel' },
        { name: 'Eli Gozlan', email: 'eli.gozlan@walla.co.il', phone: '051-4533123', address: 'Haifa, Israel' },
        { name: 'David Levi', email: 'david.levi@walla.co.il', phone: '054-4563123', address: 'Beersheba, Israel' }
    ];

    const contactList = document.getElementById('contacts');
    const popupForm = document.getElementById('popup-form');
    const contactForm = document.getElementById('contact-form');
    const closePopupButton = document.getElementById('close-popup');
    const addContactButton = document.getElementById('add-contact');
    const deleteAllButton = document.getElementById('delete-all'); 
    const popupTitle = document.getElementById('popup-title');
    const searchInput = document.getElementById('search');
    const detailsPopup = document.getElementById('details-popup');
    const closeDetailsButton = document.getElementById('close-details');

    let editingContactIndex = null;

    // Function to render contacts based on a given filter (default is to show all contacts)
    function renderContacts(filter = '') {
        contactList.innerHTML = '';
        const filteredContacts = contacts
            .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name)); // Sorting alphabetically
        
        if (filteredContacts.length === 0) {
            contactList.innerHTML = '<li>No contacts found</li>';
            return;
        }

        filteredContacts.forEach((contact, index) => {
            const contactItem = document.createElement('li');
            contactItem.innerHTML = `
                <span class="contact-info">
                    <h3>${contact.name}</h3>
                    <span class="contact-actions">
                        <span class="details" data-index="${index}">📋</span>
                        <span class="edit" data-index="${index}">✏️</span>
                        <span class="trash" data-index="${index}">🗑️</span>
                    </span>
                </span>
            `;
            contactList.appendChild(contactItem);
        });
    }

    function openPopup(title, contact) {
        popupTitle.textContent = title;
        contactForm.name.value = contact ? contact.name : '';
        contactForm.email.value = contact ? contact.email : '';
        contactForm.phone.value = contact ? contact.phone : '';
        contactForm.address.value = contact ? contact.address : ''; // New field for address
        popupForm.style.display = 'flex';
    }

    function openDetailsPopup(contact) {
        document.getElementById('details-name').textContent = contact.name;
        document.getElementById('details-email').textContent = contact.email;
        document.getElementById('details-phone').textContent = contact.phone;
        document.getElementById('details-address').textContent = contact.address;
        detailsPopup.style.display = 'flex';
    }

    function closePopup() {
        popupForm.style.display = 'none';
        contactForm.reset();
        editingContactIndex = null;
    }

    function closeDetailsPopup() {
        detailsPopup.style.display = 'none';
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newContact = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value,
            address: contactForm.address.value // Include address
        };
        if (editingContactIndex !== null) {
            contacts[editingContactIndex] = newContact;
        } else {
            contacts.push(newContact);
        }
        renderContacts();
        closePopup();
    });

    contactList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('edit')) {
            editingContactIndex = index;
            openPopup('Edit Contact', contacts[editingContactIndex]);
        } else if (event.target.classList.contains('trash')) {
            contacts.splice(index, 1);
            renderContacts();
        } else if (event.target.classList.contains('details')) {
            openDetailsPopup(contacts[index]); // Open the non-editable details popup
        }
    });

    addContactButton.addEventListener('click', () => {
        openPopup('Add Contact');
    });

    closePopupButton.addEventListener('click', closePopup);
    closeDetailsButton.addEventListener('click', closeDetailsPopup);

    deleteAllButton.addEventListener('click', () => {
        contacts.length = 0; 
        renderContacts(); 
    });

    searchInput.addEventListener('input', () => {
        renderContacts(searchInput.value);
    });

    renderContacts();
});

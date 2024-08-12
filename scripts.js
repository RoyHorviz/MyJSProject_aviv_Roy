// script.js

document.addEventListener('DOMContentLoaded', () => {
    const contacts = [
        { name: 'Aviv Dahan', email: 'aviv.dahan@walla.co.il', phone: '(+972) 05356-7890' },
        { name: 'Roy Horvitz', email: 'roy.horvitz@walla.co.il', phone: '(+972) 05267-8901' },
        { name: 'Eli Gozlan', email: 'eli.gozlan@walla.co.il', phone: '(+972) 05078-9012' }
    ];

    const contactList = document.getElementById('contacts');
    const popupForm = document.getElementById('popup-form');
    const contactForm = document.getElementById('contact-form');
    const closePopupButton = document.getElementById('close-popup');
    const addContactButton = document.getElementById('add-contact');
    const popupTitle = document.getElementById('popup-title');

    let editingContactIndex = null;

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('li');
            contactItem.innerHTML = `
                <span class="contact-info">
                    <h3>${contact.name}</h3>
                    <div class="info-wrapper">
                        <p class="email-txt">Email: ${contact.email}</p>
                        <p>Phone: ${contact.phone}</p>
                        <span class="contact-actions">
                            <span class="edit" data-index="${index}">✏️</span>
                            <span class="trash" data-index="${index}">🗑️</span>
                        </span>
                    </div>
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
        popupForm.style.display = 'flex';
    }

    function closePopup() {
        popupForm.style.display = 'none';
        contactForm.reset();
        editingContactIndex = null;
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newContact = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value
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
        if (event.target.classList.contains('edit')) {
            editingContactIndex = event.target.dataset.index;
            openPopup('Edit Contact', contacts[editingContactIndex]);
        } else if (event.target.classList.contains('trash')) {
            const index = event.target.dataset.index;
            contacts.splice(index, 1);
            renderContacts();
        }
    });

    addContactButton.addEventListener('click', () => {
        openPopup('Add Contact');
    });

    closePopupButton.addEventListener('click', closePopup);

    renderContacts();
});

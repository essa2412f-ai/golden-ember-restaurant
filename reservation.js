(() => {
  const form = document.getElementById('homeReservationForm');
  const message = document.getElementById('reservationMessage');
  if (!form || !message) return;

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().split('T')[0];
    dateInput.min = localDate;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const required = [...form.querySelectorAll('[required]')];
    const invalidField = required.find(field => !field.value.trim());

    if (invalidField) {
      message.className = 'form-message error';
      message.textContent = 'Please complete all required fields.';
      invalidField.focus();
      return;
    }

    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPhone = /^[+()\d\s-]{7,}$/.test(phone);

    if (!validEmail) {
      message.className = 'form-message error';
      message.textContent = 'Please enter a valid email address.';
      form.elements.email.focus();
      return;
    }

    if (!validPhone) {
      message.className = 'form-message error';
      message.textContent = 'Please enter a valid phone number.';
      form.elements.phone.focus();
      return;
    }

    message.className = 'form-message success';
    message.textContent = 'Reservation request sent successfully. Our team will contact you shortly.';
    form.reset();
  });
})();
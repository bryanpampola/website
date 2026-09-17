document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbz1EOTaklfBa7q0Vj6TbLlv65W5Xb-GAknMlV76gpOg9-7dbFKUlEJ3v-M5fJIm2uuo/exec';

  if (!form) return;

  const button = form.querySelector('button[type="submit"]');

  const setButtonState = (isSending) => {
    if (!button) return;
    button.disabled = isSending;
    button.textContent = isSending ? 'Sending...' : 'Send Message';
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    setButtonState(true);

    try {
      const formData = new FormData(form);
      const response = await fetch(googleAppsScriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      showToast('Thank you for contacting us!');
    } catch (error) {
      console.error('Form submission failed:', error);
      showToast('There was a problem sending your message.');
    } finally {
      setButtonState(false);
    }
  });
});


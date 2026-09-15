document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbz1EOTaklfBa7q0Vj6TbLlv65W5Xb-GAknMlV76gpOg9-7dbFKUlEJ3v-M5fJIm2uuo/exec';

  if (!form) return;

  htmx.on(form, 'htmx:configRequest', function (event) {
    event.detail.path = googleAppsScriptUrl;
  });

  htmx.on(form, 'htmx:beforeRequest', function () {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }
  });

  htmx.on(form, 'htmx:afterRequest', function (event) {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = false;
      button.textContent = 'Send Message';
    }

    if (event.detail.successful) {
      alert('Thank you for contacting PinoySoftDev! We will get back to you soon.');
      form.reset();
    } else {
      alert('There was a problem sending your message.');
    }
  });
});


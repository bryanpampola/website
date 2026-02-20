// Basic contact form handler
document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.contact form');
	if (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			alert('Thank you for contacting PinoySoftDev! We will get back to you soon.');
			form.reset();
		});
	}
});

(function () {

	/**
	*  Handle dropdowns
	**/
	function activateDropdown(dropdown, dropdownArr) {
		dropdown.addEventListener('click', (e) => {
			let target = e.target;

			dropdownArr.forEach(dropdownEl => {
				if (target.closest('.js-dropdown-open') && dropdownEl !== target.closest('.js-dropdown-open')) {
					dropdownEl.classList.remove('menu-list--open')
				}
			});

			target = target.closest('.dropdown__list-item');

			if (target) {
				if (!target.classList.contains('dropdown__list-item')) {
					dropdown.classList.toggle('menu-list--open');
				}
			} else {
				dropdown.classList.toggle('menu-list--open');
			}
		});
	}

	// Handle all dropdowns on the page
	function handleDropdown() {
		const dropdownArr = document.querySelectorAll('.js-dropdown-open');
		if (dropdownArr.length > 0) {
			dropdownArr.forEach(dropdown => {
				activateDropdown(dropdown, dropdownArr);
			});
		}
	}
	handleDropdown();


	/**
	*  Handle smooth scroll
	**/
	// Scroll to the top of the website
	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('.header').clientHeight;
		let target = document.querySelector(targetEl);
		let targetPosition = target.getBoundingClientRect().top - headerElHeight;
		let startPosition = window.pageYOffset;
		let startTime = null;

		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);

	};

	// Native JS smooth scroll
	const scrollTo = function () {
		const links = document.querySelectorAll('.js-back-to-top');
		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
			});
		});
	};
	scrollTo();


}());

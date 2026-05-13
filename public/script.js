// 1. Исчезновение загрузочного экрана (Preloader)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.remove(); }, 500); 
        }, 800); 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Эффект размытия шапки при скролле
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Выезжающее Бургер-меню для телефонов
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        const menuIcon = menuToggle.querySelector('i');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 4. Логика стрелок карусели услуг
    const serviceCarousel = document.getElementById('service-carousel');
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');
    if (serviceCarousel && slideLeftBtn && slideRightBtn) {
        const scrollAmount = 320; 
        slideLeftBtn.addEventListener('click', () => { serviceCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
        slideRightBtn.addEventListener('click', () => { serviceCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
    }

    // 5. Анимация появления блоков при скролле (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /// 6. Реальная отправка формы на почту kolesnikovdenis707@gmail.com
    const bookingForm = document.getElementById('booking-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const btnExplore = document.getElementById('btn-explore');

    if(bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            const formData = new FormData(bookingForm);
            
            fetch("https://formsubmit.co/ajax/kolesnikovdenis707@gmail.com", {
                method: "POST",
                headers: { 'Accept': 'application/json' },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                submitBtn.style.backgroundColor = '#10b981'; 
                
                setTimeout(() => {
                    // ВМЕСТО ALERT ОТКРЫВАЕМ НАШЕ КРАСИВОЕ ОКНО
                    successModal.classList.add('active');
                    
                    // Возвращаем кнопку формы в исходное состояние
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = ''; 
                    submitBtn.disabled = false;
                    bookingForm.reset(); 
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                alert("Oops! Something went wrong. Please try again.");
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            });
        });
    }

    // Логика закрытия всплывающего окна
    if(successModal) {
        // Закрыть по кнопке "Return to Home"
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        // Закрыть по кнопке "Explore More Services"
        btnExplore.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Закрыть при клике на темный фон вне карточки
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
            
            // Включаем анимацию загрузки
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // Собираем все данные из формы
            const formData = new FormData(bookingForm);
            
            // Отправляем данные
            fetch("https://formsubmit.co/ajax/kolesnikovdenis707@gmail.com", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Если отправка успешна
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                submitBtn.style.backgroundColor = '#10b981'; // Зеленый цвет успеха
                
                setTimeout(() => {
                    alert("Thank you! Your request has been sent. We will contact you shortly.");
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = ''; 
                    submitBtn.disabled = false;
                    bookingForm.reset(); 
                }, 1500);
            })
            .catch(error => {
                // Если произошла ошибка
                console.log(error);
                alert("Oops! Something went wrong. Please try again.");
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            });
        });
    
;
// Отправка формы через Web3Forms без перезагрузки страницы
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Останавливаем переход на другую страницу
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Анимация загрузки
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Собираем данные
            const formData = new FormData(bookingForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Отправляем запрос на сервер Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Успешно отправлено
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                    submitBtn.style.backgroundColor = '#10b981'; // Зеленый цвет кнопки
                    
                    setTimeout(() => {
                        // ПОКАЗЫВАЕМ НАШЕ КРАСИВОЕ ОКНО ВМЕСТО ALERT
                        document.getElementById('success-modal').classList.add('active');
                        
                        // Возвращаем форму в исходное состояние
                        bookingForm.reset(); 
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    }, 1000); // Окно появится через 1 секунду после отправки
                } else {
                    console.log(response);
                    submitBtn.innerHTML = 'Error!';
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.log(error);
                submitBtn.innerHTML = 'Error!';
                submitBtn.disabled = false;
            });
        });
    }

    // ЛОГИКА ЗАКРЫТИЯ ОКНА
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (successModal && closeModalBtn) {
        // Закрыть по кнопке "Awesome, thanks!"
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Закрыть, если кликнуть на темный фон вокруг карточки
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }; // Конец document.addEventListener('DOMContentLoaded', ...)
        ;
// =========================================
    // БЕСКОНЕЧНЫЙ СЛАЙДЕР СО СТРЕЛОЧКАМИ И АВТО-ВЫБОРОМ
    // =========================================
    const serviceCarousel = document.getElementById('service-carousel');
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');

    if (serviceCarousel) {
        // 1. Клонируем карточки для создания "бесконечного" круга
        const originalCards = Array.from(serviceCarousel.children);
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            serviceCarousel.appendChild(clone);
        });

        let isPaused = false;
        let animationId;
        const scrollSpeed = 0.8; // Скорость ползунка

        // 2. Функция непрерывной прокрутки
        const continuousScroll = () => {
            if (!isPaused) {
                serviceCarousel.style.scrollSnapType = 'none';
                serviceCarousel.scrollLeft += scrollSpeed;

                // Как только прокрутили первую половину (оригиналы),
                // незаметно прыгаем в начало (на точно такие же оригиналы).
                if (serviceCarousel.scrollLeft >= serviceCarousel.scrollWidth / 2) {
                    serviceCarousel.scrollLeft = 0;
                }
            } else {
                serviceCarousel.style.scrollSnapType = 'x mandatory';
            }
            animationId = requestAnimationFrame(continuousScroll);
        };

        // Запускаем анимацию
        animationId = requestAnimationFrame(continuousScroll);

        // 3. Пауза при наведении или касании
        serviceCarousel.addEventListener('mouseenter', () => isPaused = true);
        serviceCarousel.addEventListener('mouseleave', () => isPaused = false);
        serviceCarousel.addEventListener('touchstart', () => isPaused = true);
        serviceCarousel.addEventListener('touchend', () => {
            setTimeout(() => isPaused = false, 1500);
        });

        // 4. Логика для СТРЕЛОЧЕК
        if (slideLeftBtn && slideRightBtn) {
            slideLeftBtn.addEventListener('click', () => {
                isPaused = true;
                // Если мы в самом начале, прыгаем на середину, чтобы было куда листать назад
                if (serviceCarousel.scrollLeft <= 0) {
                    serviceCarousel.scrollLeft = serviceCarousel.scrollWidth / 2;
                }
                serviceCarousel.scrollBy({ left: -320, behavior: 'smooth' });
                setTimeout(() => isPaused = false, 2000);
            });

            slideRightBtn.addEventListener('click', () => {
                isPaused = true;
                serviceCarousel.scrollBy({ left: 320, behavior: 'smooth' });
                setTimeout(() => isPaused = false, 2000);
            });
        }

        // 5. Автоматический выбор услуги (теперь работает и для оригиналов, и для клонов)
        const allCards = serviceCarousel.querySelectorAll('.service-card');
        const serviceSelect = document.querySelector('select[name="service"]');

        allCards.forEach(card => {
            const bookBtn = card.querySelector('.btn-outline') || card.querySelector('button'); // Ищет кнопку внутри карточки
            
            if (bookBtn && serviceSelect) {
                bookBtn.addEventListener('click', () => {
                    const serviceName = card.querySelector('h3').innerText;
                    
                    Array.from(serviceSelect.options).forEach(option => {
                        if (option.value.includes(serviceName) || serviceName.includes(option.value)) {
                            option.selected = true;
                        }
                    });
                    
                    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {

    // 1. Анимация при скролле
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // 2. Прелоадер
    window.addEventListener('load', () => {
        const pre = document.getElementById('preloader');
        if (pre) {
            pre.style.opacity = '0';
            setTimeout(() => pre.remove(), 500);
        }
    });

    // 3. ОТПРАВКА ФОРМЫ (Только по нажатию кнопки!)
    const bookingForm = document.getElementById('booking-form');
    const successModal = document.getElementById('success-modal');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // ЭТА СТРОЧКА не дает форме отправиться самой!
            e.preventDefault(); 
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(bookingForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Действие 1: Отправляем в админку (на ваш локальный сервер)
            fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: json
            }).catch(err => console.log('Ошибка сохранения в админку:', err));

            // Действие 2: Отправляем на почту через Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                if (response.status == 200) {
                    successModal.classList.add('active'); // Показываем окно успеха
                    bookingForm.reset(); // Очищаем поля
                } else {
                    alert('Проблема с отправкой на почту. Пожалуйста, позвоните нам.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка соединения. Попробуйте еще раз.');
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // Закрытие окна успеха
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    // 4. БЕСКОНЕЧНЫЙ СЛАЙДЕР И АВТО-ВЫБОР
    const serviceCarousel = document.getElementById('service-carousel');
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');

    if (serviceCarousel) {
        const originalCards = Array.from(serviceCarousel.children);
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            serviceCarousel.appendChild(clone);
        });

        let isPaused = false;
        let animationId;
        const scrollSpeed = 0.8;

        const continuousScroll = () => {
            if (!isPaused) {
                serviceCarousel.style.scrollSnapType = 'none';
                serviceCarousel.scrollLeft += scrollSpeed;
                if (serviceCarousel.scrollLeft >= serviceCarousel.scrollWidth / 2) {
                    serviceCarousel.scrollLeft = 0;
                }
            } else {
                serviceCarousel.style.scrollSnapType = 'x mandatory';
            }
            animationId = requestAnimationFrame(continuousScroll);
        };

        animationId = requestAnimationFrame(continuousScroll);

        serviceCarousel.addEventListener('mouseenter', () => isPaused = true);
        serviceCarousel.addEventListener('mouseleave', () => isPaused = false);
        serviceCarousel.addEventListener('touchstart', () => isPaused = true);
        serviceCarousel.addEventListener('touchend', () => {
            setTimeout(() => isPaused = false, 1500);
        });

        if (slideLeftBtn && slideRightBtn) {
            slideLeftBtn.addEventListener('click', () => {
                isPaused = true;
                if (serviceCarousel.scrollLeft <= 0) {
                    serviceCarousel.scrollLeft = serviceCarousel.scrollWidth / 2;
                }
                serviceCarousel.scrollBy({ left: -320, behavior: 'smooth' });
                setTimeout(() => isPaused = false, 2000);
            });

            slideRightBtn.addEventListener('click', () => {
                isPaused = true;
                serviceCarousel.scrollBy({ left: 320, behavior: 'smooth' });
                setTimeout(() => isPaused = false, 2000);
            });
        }

        const allCards = serviceCarousel.querySelectorAll('.service-card');
        const serviceSelect = document.querySelector('select[name="service"]');

        allCards.forEach(card => {
            const bookBtn = card.querySelector('.btn-outline') || card.querySelector('button');
            if (bookBtn && serviceSelect) {
                bookBtn.addEventListener('click', () => {
                    const serviceName = card.querySelector('h3').innerText;
                    Array.from(serviceSelect.options).forEach(option => {
                        if (option.value.includes(serviceName) || serviceName.includes(option.value)) {
                            option.selected = true;
                        }
                    });
                    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    }

    // 5. ЛОГИКА ДЛЯ ОКОН PRIVACY & TERMS
    const legalModal = document.getElementById('legal-modal');
    const closeLegalBtn = document.getElementById('close-legal-modal');
    const legalTitle = document.getElementById('legal-modal-title');

    window.showLegal = function(documentName) {
        if (legalTitle) legalTitle.innerText = documentName;
        if (legalModal) legalModal.classList.add('active');
    };

    if (closeLegalBtn) {
        closeLegalBtn.addEventListener('click', () => {
            legalModal.classList.remove('active');
        });
    }

    if (legalModal) {
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                legalModal.classList.remove('active');
            }
        });
    }
});
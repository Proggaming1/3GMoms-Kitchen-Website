// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ========== DROPDOWN TOGGLE FOR MOBILE ==========
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // ========== CLOSE DROPDOWN WHEN CLICKING OUTSIDE ==========
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            if (navList) {
                navList.classList.remove('active');
            }
        }
    });
    
    // ========== SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = '#1a252f';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.backgroundColor = '#2c3e50';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
        });
    }
    
    // ========== HIGHLIGHT CURRENT PAGE ==========
    const currentPage = window.location.hash || '#beranda';
    const navLinks = document.querySelectorAll('.nav-item > a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ==================== FUNGSI GLOBAL ====================

// Ambil produk data (simulasi database)
const products = [
    {
        id: 1,
        name: 'Piscok Isi 5 Goreng',
        price: 12500,
        category: 'snack',
        description: 'Piscok Isi 5 Goreng dengan isian pisang dan cokelat yang melimpah',
        image: 'https://ibb.co.com/MDwrMzjc',
        rating: 5.0
    },
    {
        id: 2,
        name: ' Sosis Solo Isi 5 Goreng',
        price: 20000,
        category: 'snack',
        description: 'Sosis solo Isi 5 Goreng dengan isian daging ayam dan bumbu khas',
        image: 'https://ibb.co.com/yKDsX5k',
        rating: 5.0
    },
    {
        id: 3,
        name: 'Picok Isi 10 Goreng',
        price: 25000,
        category: 'snack',
        description: 'Piscok Isi 10 Goreng dengan isian pisang dan cokelat yang melimpah',
        image: 'https://ibb.co.com/MDwrMzjc',
        rating: 5.0
    },
    {
        id: 4,
        name: 'Sosis Solo Isi 10 Goreng',
        price: 45000,
        category: 'snack',
        description: 'Sosis solo Isi 10 Goreng dengan isian daging ayam dan bumbu khas',
        image: 'https://ibb.co.com/yKDsX5k',
        rating: 5.0
    },
    {
        id: 5,
        name: 'Sambal Goreng',
        price: 20000,
        category: 'lauk',
        description: 'Sambel lezat dengan cita rasa pedas dan gurih',
        image: 'https://ibb.co.com/TMvCyrPp',
        rating: 5.0
    },
    {
        id: 6,
        name: 'Ayam Goreng Lengkuas',
        price: 35000,
        category: 'lauk',
        description: 'Ayam goreng dengan bumbu lengkuas yang lezat',
        image: 'https://ibb.co.com/svNM7KQS',
        rating: 5.0
    },
    {
        id: 7,
        name: 'Nasi Goreng',
        price: 15000,
        category: 'lauk',
        description: 'Nasi goreng spesial dengan telur, ayam, dan sayuran pilihan',
        image: 'https://ibb.co.com/CK4wm3Fw',
        rating: 5.0
    },
];

// ==================== CAROUSEL LOGIC ====================
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const container = document.getElementById('carouselContainer');
    const indicators = document.getElementById('carouselIndicators');

    if (!container) return;

    // Buat slides
    container.innerHTML = products.map((product, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
            <img src="${product.image}" alt="${product.name}">
            <div class="carousel-slide-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
        </div>
    `).join('');

    // Buat indicators
    indicators.innerHTML = products.map((_, index) => `
        <div class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>
    `).join('');

    // Auto play
    startCarousel();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    // Wrap around
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    // Update slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    restartCarousel();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    restartCarousel();
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    restartCarousel();
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000); // Ganti slide setiap 5 detik
}

function restartCarousel() {
    clearInterval(carouselInterval);
    startCarousel();
}

// Update cart count di navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Format rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Buat rating stars
function createRatingStars(rating) {
    let stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return `<span class="product-rating">${stars} ${rating}</span>`;
}

// Tambah ke cart
function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Tampilkan notifikasi
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

// Tampilkan notifikasi
function showNotification(message) {
    let notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    updateCartCount();

    // Inisialisasi carousel
    initCarousel();

    // Tampilkan produk featured di home
    const featuredItems = document.getElementById('featured-items');
    if (featuredItems) {
        featuredItems.innerHTML = products.slice(0, 4).map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    ${createRatingStars(product.rating)}
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatRupiah(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="orderWA('${product.name}', ${product.price})">
    📲 Pesan via WA
</button>
                </div>
            </div>
        `).join('');
    }
});

function orderWA(nama, harga) {
    const nomor = "6282338516014"; // GANTI NOMOR KAMU

    const pesan = `Halo, saya mau pesan:

Produk: ${nama}
Harga: Rp${harga}
`;

    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

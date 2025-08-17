let cartCount = 0;
        
// Sample product data
const products = {
    puzzles: [
        { name: "Rainbow Jigsaw Puzzle", price: "$12.99", rating: 5, reviews: 89, category: "puzzles", type: "toy" },
        { name: "Animal Shapes Puzzle", price: "$8.99", rating: 4, reviews: 156, category: "puzzles", type: "toy" },
        { name: "World Map Puzzle", price: "$15.99", rating: 5, reviews: 203, category: "puzzles", type: "toy" },
        { name: "Number Learning Puzzle", price: "$10.99", rating: 4, reviews: 78, category: "puzzles", type: "toy" }
    ],
    vehicles: [
        { name: "Fire Truck Toy", price: "$18.99", rating: 5, reviews: 124, category: "vehicles", type: "toy" },
        { name: "Racing Car Set", price: "$24.99", rating: 4, reviews: 167, category: "vehicles", type: "toy" },
        { name: "Airplane Model", price: "$16.99", rating: 4, reviews: 92, category: "vehicles", type: "toy" },
        { name: "Train Set", price: "$32.99", rating: 5, reviews: 145, category: "vehicles", type: "toy" }
    ],
    electronic: [
        { name: "Learning Tablet", price: "$45.99", rating: 5, reviews: 234, category: "electronic", type: "toy" },
        { name: "Robot Friend", price: "$39.99", rating: 4, reviews: 178, category: "electronic", type: "toy" },
        { name: "Musical Keyboard", price: "$28.99", rating: 4, reviews: 156, category: "electronic", type: "toy" },
        { name: "Interactive Globe", price: "$35.99", rating: 5, reviews: 89, category: "electronic", type: "toy" }
    ],
    educational: [
        { name: "Science Lab Kit", price: "$29.99", rating: 5, reviews: 156, category: "educational", type: "toy" },
        { name: "Math Learning Game", price: "$19.99", rating: 4, reviews: 134, category: "educational", type: "toy" },
        { name: "Alphabet Blocks", price: "$14.99", rating: 5, reviews: 267, category: "educational", type: "toy" },
        { name: "Geography Quiz Game", price: "$22.99", rating: 4, reviews: 98, category: "educational", type: "toy" }
    ],
    clothing: [
        { name: "Unicorn T-Shirt", price: "$14.99", rating: 5, reviews: 98, category: "clothing", type: "clothing" },
        { name: "Dino Hoodie", price: "$24.99", rating: 4, reviews: 76, category: "clothing", type: "clothing" },
        { name: "Adventure Pants", price: "$19.99", rating: 5, reviews: 215, category: "clothing", type: "clothing" },
        { name: "Magic Dress", price: "$29.99", rating: 4, reviews: 142, category: "clothing", type: "clothing" }
    ]
};

// Page navigation functionality
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    
    // Update navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find and activate the corresponding nav tab
    const activeTab = document.querySelector(`[href="#${pageId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.remove('open');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category filtering functionality
function filterProducts(category) {
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Get products to display
    let productsToShow = [];
    if (category === 'all') {
        productsToShow = [...products.puzzles, ...products.vehicles, ...products.electronic, ...products.educational];
    } else if (category === 'clothing') {
        productsToShow = products.clothing;
    } else {
        productsToShow = products[category] || [];
    }
    
    // Update the featured toys section
    updateProductDisplay(productsToShow, category);
    
    // Show home page and scroll to products
    showPage('home');
    setTimeout(() => {
        document.getElementById('featured-toys').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Update product display
function updateProductDisplay(productsToShow, category) {
    const featuredSection = document.getElementById('featured-toys');
    const productGrid = document.getElementById('product-grid');
    
    // Update section title
    const sectionTitle = featuredSection.querySelector('h2');
    const categoryNames = {
        'all': 'All Toys',
        'puzzles': 'Puzzle Toys',
        'vehicles': 'Vehicle Toys', 
        'electronic': 'Electronic Toys',
        'educational': 'Educational Toys',
        'clothing': 'Kids Clothing'
    };
    sectionTitle.textContent = categoryNames[category] || 'Featured Products';
    
    // Clear current products
    productGrid.innerHTML = '';
    
    // Add filtered products
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product, index) {
    const colors = ['indigo', 'blue', 'red', 'green', 'purple', 'pink', 'yellow'];
    const color = colors[index % colors.length];
    
    const card = document.createElement('div');
    card.className = 'card bg-white rounded-xl overflow-hidden shadow-md';
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    card.innerHTML = `
        <div class="h-48 bg-${color}-100 relative overflow-hidden">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="60" fill="#${color === 'indigo' ? '6366f1' : color === 'blue' ? '3b82f6' : color === 'red' ? 'ef4444' : color === 'green' ? '22c55e' : color === 'purple' ? 'a855f7' : color === 'pink' ? 'ec4899' : 'f59e0b'}" />
                <circle cx="85" cy="85" r="8" fill="white" />
                <circle cx="115" cy="85" r="8" fill="white" />
                <path d="M85 115 Q100 125 115 115" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" />
            </svg>
        </div>
        <div class="p-4">
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg text-indigo-800">${product.name}</h3>
                <span class="bg-${color}-100 text-${color}-800 text-xs font-semibold px-2.5 py-0.5 rounded">Popular</span>
            </div>
            <p class="text-gray-600 text-sm mt-1">High quality ${product.category} for kids</p>
            <div class="flex items-center mt-2">
                <div class="flex text-yellow-400">
                    <span class="text-sm">${stars}</span>
                </div>
                <span class="text-gray-500 text-sm ml-1">(${product.reviews})</span>
            </div>
            <div class="flex justify-between items-center mt-3">
                <span class="text-lg font-bold text-indigo-800">${product.price}</span>
                <button class="add-to-cart-btn bg-${product.type === 'clothing' ? 'pink' : 'indigo'}-600 hover:bg-${product.type === 'clothing' ? 'pink' : 'indigo'}-700 text-white rounded-full p-2 transition-colors transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial products
    filterProducts('all');
    
    // Main navigation tabs
    document.querySelectorAll('.nav-tab, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                if (document.getElementById(pageId + '-page')) {
                    showPage(pageId);
                }
            }
        });
    });
    
    // Mobile navigation links
    document.querySelectorAll('#mobile-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                if (document.getElementById(pageId + '-page')) {
                    showPage(pageId);
                }
            }
        });
    });
    
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Add to cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            
            // Add visual feedback
            const button = e.target.closest('.add-to-cart-btn');
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    // Hero button functionality
    document.getElementById('explore-toys-btn').addEventListener('click', () => {
        showPage('toys');
    });
    
    document.getElementById('see-clothing-btn').addEventListener('click', () => {
        showPage('clothing');
    });
});

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'969afd4e8114ac96',t:'MTc1NDI3ODM2Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
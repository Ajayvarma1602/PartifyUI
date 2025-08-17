document.addEventListener('DOMContentLoaded', () => {
    const vehicleModal = document.getElementById('vehicle-modal');
    const selectVehicleBtn = document.getElementById('select-vehicle-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const selectionStatusText = document.getElementById('selection-status-text');
    const garageModalContent = document.getElementById('garage-modal-content');
    const addVehicleModalContent = document.getElementById('add-vehicle-modal-content');
    const addVehicleInGarageBtn = document.getElementById('add-vehicle-in-garage-btn');
    const addVehicleNavLink = document.getElementById('add-vehicle-nav-link');
    const selectedVehicleNav = document.getElementById('selected-vehicle-nav');
    const navbarSelectedCar = document.getElementById('navbar-selected-car');
    const changeVehicleNavBtn = document.getElementById('change-vehicle-nav-btn');
    const addVehicleDetailsBtn = document.getElementById('add-vehicle-details-btn');
    
    const promoModal = document.getElementById('promo-modal');
    const closePromoBtn = document.getElementById('close-promo-btn');
    const promoContentContainer = document.getElementById('promo-content-container');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    const authModal = document.getElementById('auth-modal');
    const loginNavLink = document.getElementById('login-nav-link');
    const closeAuthBtn = document.getElementById('close-auth-btn');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const showRegisterLink = document.getElementById('show-register-link');
    const showLoginLink = document.getElementById('show-login-link');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authMessage = document.getElementById('auth-message');
    const welcomeMessage = document.getElementById('welcome-message');
    const userProfileNav = document.getElementById('user-profile-nav');
    const logoutNavBtn = document.getElementById('logout-nav-btn');
    
    const garageListContainer = document.getElementById('garage-list-container');
    const yearSelect = document.getElementById('year-select');
    const makeSelect = document.getElementById('make-select');
    const modelSelect = document.getElementById('model-select');
    const productTypeSelect = document.getElementById('product-type-select');
    
    const addByDetailsForm = document.getElementById('add-by-details-form');
    const addByLicenseContent = document.getElementById('add-by-license-content');
    const addByVinContent = document.getElementById('add-by-vin-content');
    const addByLicenseTab = document.getElementById('add-by-license-tab');
    const addByVinTab = document.getElementById('add-by-vin-tab');

    // Chatbot element's
    const chatButton = document.getElementById('chat-button');
    const chatModal = document.getElementById('chat-modal');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    // Initializing chat history from localStorage
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    const partsData = [
        { year: "2011", make: "RAM", model: "1500", productType: "Front Bumper" },
        { year: "2012", make: "RAM", model: "1500", productType: "Front Bumper" },
        { year: "2013", make: "RAM", model: "1500", productType: "Front Bumper" },
        { year: "2014", make: "RAM", model: "1500", productType: "Front Bumper" },
        { year: "2015", make: "RAM", model: "1500", productType: "Front Bumper" },
        { year: "2011", make: "RAM", model: "1500", productType: "Rear Bumper" },
        { year: "2012", make: "RAM", model: "1500", productType: "Rear Bumper" },
        { year: "2013", make: "RAM", model: "1500", productType: "Rear Bumper" },
        { year: "2014", make: "RAM", model: "1500", productType: "Rear Bumper" },
        { year: "2015", make: "RAM", model: "1500", productType: "Rear Bumper" },
        { year: "2012", make: "RAM", model: "2500", productType: "Tailgate" },
        { year: "2013", make: "RAM", model: "2500", productType: "Tailgate" },
        { year: "2014", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
        { year: "2015", make: "RAM", model: "2500", productType: "Tailgate" },
        { year: "2016", make: "RAM", model: "2500", productType: "Tailgate" },
        { year: "2013", make: "Toyota", model: "Camry", productType: "Front Bumper" },
        { year: "2014", make: "Toyota", model: "Camry", productType: "Front Bumper" },
        { year: "2015", make: "Toyota", model: "Camry", productType: "Front Bumper" },
        { year: "2016", make: "Toyota", model: "Camry", productType: "Front Bumper" },
        { year: "2017", make: "Toyota", model: "Corolla", productType: "Front Bumper" },
        { year: "2013", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
        { year: "2014", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
        { year: "2015", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
        { year: "2016", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
        { year: "2017", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" }
    ];

    const generateProductUrl = (vehicle) => {
        const year = vehicle.year;
        const make = vehicle.make.toLowerCase().replace(/\s/g, '-');
        const model = vehicle.model.toLowerCase().replace(/\s/g, '-');
        const productType = vehicle.productType;
        
        let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
        if (productType) {
            const encodedProductType = encodeURIComponent(productType);
            url += `?filter.p.product_type=${encodedProductType}`;
        }
        return url;
    };

    const populateDropdowns = () => {
        const getUniqueValues = (data, key) => [...new Set(data.map(item => item[key]))].sort();

        const updateOptions = (selectElement, options, selectedValue = '') => {
            if (selectElement) {
                selectElement.innerHTML = `<option value="">Select ${selectElement.id.split('-')[0]}</option>`;
                options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    if (option === selectedValue) {
                        opt.selected = true;
                    }
                    selectElement.appendChild(opt);
                });
            }
        };

        const updateYear = () => {
            const years = getUniqueValues(partsData, 'year');
            updateOptions(yearSelect, years);
            updateMake();
        };

        const updateMake = () => {
            const selectedYear = yearSelect.value;
            const filteredData = selectedYear ? partsData.filter(item => item.year === selectedYear) : partsData;
            const makes = getUniqueValues(filteredData, 'make');
            updateOptions(makeSelect, makes);
            updateModel();
        };

        const updateModel = () => {
            const selectedYear = yearSelect.value;
            const selectedMake = makeSelect.value;
            const filteredData = partsData.filter(item => (!selectedYear || item.year === selectedYear) && (!selectedMake || item.make === selectedMake));
            const models = getUniqueValues(filteredData, 'model');
            updateOptions(modelSelect, models);
            updateProductType();
        };

        const updateProductType = () => {
            const selectedYear = yearSelect.value;
            const selectedMake = makeSelect.value;
            const selectedModel = modelSelect.value;
            const filteredData = partsData.filter(item => 
                (!selectedYear || item.year === selectedYear) && 
                (!selectedMake || item.make === selectedMake) && 
                (!selectedModel || item.model === selectedModel)
            );
            const productTypes = getUniqueValues(filteredData, 'productType');
            updateOptions(productTypeSelect, productTypes);
        };

        if (yearSelect) yearSelect.addEventListener('change', updateMake);
        if (makeSelect) makeSelect.addEventListener('change', updateModel);
        if (modelSelect) modelSelect.addEventListener('change', updateProductType);

        updateYear();
    };

    const promotions = [
        {
            title: "Exclusive Offer Just For You!",
            text: "Get 15% off your first order when you sign up today.",
            image: "https://placehold.co/400x200/e21c33/ffffff?text=Special+Offer!"
        },
        {
            title: "FREE Shipping on All Orders!",
            text: "For a limited time, enjoy free shipping on any car part, anywhere.",
            image: "https://placehold.co/400x200/2a9d8f/ffffff?text=Free+Shipping"
        },
        {
            title: "25% Off All Paint Products!",
            text: "Revitalize your vehicle's look with a huge discount on all paint and supplies.",
            image: "https://placehold.co/400x200/e9c46a/222222?text=25%25+OFF+Paint"
        },
        {
            title: "Bumper & Grille Special!",
            text: "Upgrade your car's front end and save big on bumpers and grilles this month.",
            image: "https://placehold.co/400x200/51557E/ffffff?text=Bumper+Upgrade"
        },
    ];

    const getRandomPromotion = () => {
        const randomIndex = Math.floor(Math.random() * promotions.length);
        return promotions[randomIndex];
    };
    
    let selectedCar = localStorage.getItem('selectedCar');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const updateNavbar = () => {
        const addVehicleNavLink = document.getElementById('add-vehicle-nav-link');
        const selectedVehicleNav = document.getElementById('selected-vehicle-nav');
        const navbarSelectedCar = document.getElementById('navbar-selected-car');
        const loginNavLink = document.getElementById('login-nav-link');
        const userProfileNav = document.getElementById('user-profile-nav');
        const welcomeMessage = document.getElementById('welcome-message');

        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        const hasVehicles = vehicles.length > 0;

        if (addVehicleNavLink) {
            if (hasVehicles) {
                addVehicleNavLink.classList.add('lg:hidden'); 
            } else {
                addVehicleNavLink.classList.remove('lg:hidden'); 
            }
        }
        
        if (selectedVehicleNav) {
            if (hasVehicles) {
                selectedVehicleNav.classList.remove('hidden');
            } else {
                selectedVehicleNav.classList.add('hidden');
            }
        }

        if (selectedCar) {
            if (navbarSelectedCar) navbarSelectedCar.textContent = `Shopping for: ${selectedCar}`;
        }
        
        if (currentUser) {
            if (loginNavLink) loginNavLink.classList.add('hidden');
            if (userProfileNav) userProfileNav.classList.remove('hidden');
            if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${currentUser.name}`;
        } else {
            if (loginNavLink) loginNavLink.classList.remove('hidden');
            if (userProfileNav) userProfileNav.classList.add('hidden');
        }
    };
    
    const updateSelectionStatus = () => {
        const selectionStatusText = document.getElementById('selection-status-text');
        if (selectionStatusText) {
            if (selectedCar) {
                selectionStatusText.innerHTML = `Shopping for: <span class="font-bold">${selectedCar}</span>`;
            } else {
                selectionStatusText.textContent = "Select a vehicle to find parts that fit.";
            }
        }
    };

    const renderGarage = () => {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        const garageListContainer = document.getElementById('garage-list-container');
        
        if (garageListContainer) {
            garageListContainer.innerHTML = '';
            
            if (vehicles.length === 0) {
                garageListContainer.innerHTML = `<div class="text-center py-8 text-gray-500">
                    <p>Your garage is empty. Add a vehicle to get started!</p>
                </div>`;
            } else {
                vehicles.forEach(vehicle => {
                    const vehicleUrl = generateProductUrl(vehicle);

                    const vehicleElement = document.createElement('div');
                    vehicleElement.className = 'garage-vehicle-card';
                    vehicleElement.innerHTML = `
                        <p class="font-bold text-lg">${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.productType}</p>
                        <div class="flex space-x-2">
                            <a href="${vehicleUrl}" target="_blank" class="select-vehicle-btn text-blue-500 hover:text-blue-700 font-semibold text-sm transition-colors py-1 px-3 rounded-full border border-blue-500 hover:border-blue-700" data-vehicle-data='${JSON.stringify(vehicle)}'>
                                SELECT
                            </a>
                            <button class="delete-vehicle-btn text-gray-500 hover:text-red-500 transition-colors" data-vehicle-data='${JSON.stringify(vehicle)}'>
                                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                </svg>
                            </button>
                        </div>
                    `;
                    garageListContainer.appendChild(vehicleElement);
                });
                
                document.querySelectorAll('.select-vehicle-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const vehicle = JSON.parse(event.target.dataset.vehicleData);
                        selectedCar = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.productType}`;
                        localStorage.setItem('selectedCar', selectedCar);
                        updateSelectionStatus();
                        updateNavbar();
                        vehicleModal.style.display = 'none';
                    });
                });

                document.querySelectorAll('.delete-vehicle-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const vehicleToDelete = JSON.parse(event.currentTarget.dataset.vehicleData);
                        const currentVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
                        const updatedVehicles = currentVehicles.filter(v => 
                            v.year !== vehicleToDelete.year || 
                            v.make !== vehicleToDelete.make || 
                            v.model !== vehicleToDelete.model || 
                            v.productType !== vehicleToDelete.productType
                        );
                        localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
                        
                        if (selectedCar === `${vehicleToDelete.year} ${vehicleToDelete.make} ${vehicleToDelete.model} ${vehicleToDelete.productType}`) {
                            localStorage.removeItem('selectedCar');
                            selectedCar = null;
                        }
                        
                        updateSelectionStatus();
                        updateNavbar();
                        renderGarage();
                    });
                });
            }
        }
    };

    const resetAddVehicleForm = () => {
        if (yearSelect) yearSelect.value = "";
        if (makeSelect) makeSelect.value = "";
        if (modelSelect) modelSelect.value = "";
        if (productTypeSelect) productTypeSelect.value = "";
        populateDropdowns();
    }

    const openVehicleModal = () => {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        if (vehicles.length === 0) {
            if (garageModalContent) garageModalContent.classList.add('hidden');
            if (addVehicleModalContent) addVehicleModalContent.classList.remove('hidden');
            resetAddVehicleForm();
        } else {
            renderGarage();
            if (garageModalContent) garageModalContent.classList.remove('hidden');
            if (addVehicleModalContent) addVehicleModalContent.classList.add('hidden');
        }
        if (vehicleModal) vehicleModal.style.display = 'flex';
    };

    const setupModalEvents = () => {
        const vehicleModal = document.getElementById('vehicle-modal');
        const selectVehicleBtn = document.getElementById('select-vehicle-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const addVehicleInGarageBtn = document.getElementById('add-vehicle-in-garage-btn');
        const addVehicleNavLink = document.getElementById('add-vehicle-nav-link');
        const changeVehicleNavBtn = document.getElementById('change-vehicle-nav-btn');
        const addVehicleDetailsBtn = document.getElementById('add-vehicle-details-btn');
        const loginNavLink = document.getElementById('login-nav-link');
        const authModal = document.getElementById('auth-modal');
        const closeAuthBtn = document.getElementById('close-auth-btn');
        const loginFormContainer = document.getElementById('login-form-container');
        const registerFormContainer = document.getElementById('register-form-container');
        const showRegisterLink = document.getElementById('show-register-link');
        const showLoginLink = document.getElementById('show-login-link');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const authMessage = document.getElementById('auth-message');
        const logoutNavBtn = document.getElementById('logout-nav-btn');
        
        const promoModal = document.getElementById('promo-modal');
        const closePromoBtn = document.getElementById('close-promo-btn');
        const promoContentContainer = document.getElementById('promo-content-container');
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');

        // Tabs for add vehicle modal
        const addByLicenseContent = document.getElementById('add-by-license-content');
        const addByVinContent = document.getElementById('add-by-vin-content');
        const addByLicenseTab = document.getElementById('add-by-license-tab');
        const addByVinTab = document.getElementById('add-by-vin-tab');

        // Function to switch tabs
        const switchTab = (activeTab, activeContent) => {
            const tabs = [addByLicenseTab, addByVinTab];
            const contents = [addByLicenseContent, addByVinContent];

            tabs.forEach(tab => tab?.classList?.remove('active'));
            contents.forEach(content => content?.classList?.add('hidden'));

            activeTab?.classList?.add('active');
            activeContent?.classList?.remove('hidden');
        };

        // Event listeners for tabs
        if (addByLicenseTab) addByLicenseTab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(addByLicenseTab, addByLicenseContent);
        });

        if (addByVinTab) addByVinTab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(addByVinTab, addByVinContent);
        });

        // Modal functionality for the main button
        if (selectVehicleBtn) {
            selectVehicleBtn.addEventListener('click', openVehicleModal);
        }

        // Logic for the "Add Vehicle" button inside the garage modal
        if (addVehicleInGarageBtn) {
            addVehicleInGarageBtn.addEventListener('click', () => {
                if (garageModalContent) garageModalContent.classList.add('hidden');
                if (addVehicleModalContent) addVehicleModalContent.classList.remove('hidden');
                resetAddVehicleForm(); // Reset form when navigating from garage
                if(addByLicenseTab && addByLicenseContent) switchTab(addByLicenseTab, addByLicenseContent);
            });
        }
        
        // Logic for the "Change" button in the navbar
        if (changeVehicleNavBtn) {
            changeVehicleNavBtn.addEventListener('click', openVehicleModal);
        }

        // Logic for the "Add a Vehicle" link in the navbar
        if (addVehicleNavLink) {
            addVehicleNavLink.addEventListener('click', (event) => {
                event.preventDefault();
                openVehicleModal();
            });
        }

        // Logic for the button that adds the car and closes the modal
        if(addVehicleDetailsBtn) {
            addVehicleDetailsBtn.addEventListener('click', () => {
                const year = document.getElementById('year-select')?.value;
                const make = document.getElementById('make-select')?.value;
                const model = document.getElementById('model-select')?.value;
                const productType = document.getElementById('product-type-select')?.value;
                
                // Check if the mandatory fields are filled
                if (!year || !make || !model) {
                    alert('Please select a Year, Make, and Model.');
                    return;
                }

                // Build the redirect URL based on the selections
                const newVehicle = { year, make, model, productType };
                const redirectUrl = generateProductUrl(newVehicle);
                
                // Open the URL in a new tab
                window.open(redirectUrl, '_blank');
                
                // Save the new vehicle to localStorage and update UI
                const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
                vehicles.push(newVehicle);
                localStorage.setItem('vehicles', JSON.stringify(vehicles));
                
                selectedCar = `${year} ${make} ${model} ${productType}`;
                localStorage.setItem('selectedCar', selectedCar);

                updateSelectionStatus();
                updateNavbar();
                
                // Switch back to the garage view to show the new vehicle
                renderGarage();
                if (garageModalContent) garageModalContent.classList.remove('hidden');
                if (addVehicleModalContent) addVehicleModalContent.classList.add('hidden');
                
                // Close the modal after a short delay for a better user experience
                setTimeout(() => {
                   if (vehicleModal) vehicleModal.style.display = 'none';
                }, 500);
            });
        }

        // Logic for the main vehicle modal's close button
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                if (vehicleModal) vehicleModal.style.display = 'none';
            });
        }
        
        // Logic for closing the modal by clicking outside it
        if (vehicleModal) {
            window.addEventListener('click', (event) => {
                if (event.target === vehicleModal) {
                    vehicleModal.style.display = 'none';
                }
            });
        }
        
        // Logic for the promotional modal
        if (promoModal && promoContentContainer) {
            const selectedPromo = getRandomPromotion();
            promoContentContainer.innerHTML = `
                <img src="${selectedPromo.image}" alt="Promotional Offer Image" class="w-full rounded-xl mb-6">
                <h3 class="text-3xl font-extrabold" style="color: var(--text-primary);">${selectedPromo.title}</h3>
                <p class="mb-6" style="color: var(--text-secondary);">${selectedPromo.text}</p>
                <button id="claim-discount-btn" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                    Claim My Discount
                </button>
            `;
            if (promoModal) promoModal.style.display = 'flex';
            
            if (closePromoBtn) {
                closePromoBtn.addEventListener('click', () => {
                    if (promoModal) promoModal.style.display = 'none';
                });
            }
            
            const claimDiscountBtn = document.getElementById('claim-discount-btn');
            if (claimDiscountBtn) {
                claimDiscountBtn.addEventListener('click', () => {
                    if (promoModal) promoModal.style.display = 'none';
                });
            }
        }
        
        // Auth modal functionality
        if (loginNavLink) {
            loginNavLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (authModal) authModal.style.display = 'flex';
                if (loginFormContainer) loginFormContainer.classList.remove('hidden');
                if (registerFormContainer) registerFormContainer.classList.add('hidden');
                if (authMessage) authMessage.classList.add('hidden');
            });
        }

        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (loginFormContainer) loginFormContainer.classList.add('hidden');
                if (registerFormContainer) registerFormContainer.classList.remove('hidden');
                if (authMessage) authMessage.classList.add('hidden');
            });
        }

        if (showLoginLink) {
            showLoginLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (loginFormContainer) loginFormContainer.classList.remove('hidden');
                if (registerFormContainer) registerFormContainer.classList.add('hidden');
                if (authMessage) authMessage.classList.add('hidden');
            });
        }

        if (closeAuthBtn) {
            closeAuthBtn.addEventListener('click', () => {
                if (authModal) authModal.style.display = 'none';
            });
        }
        
        if (authModal) {
            window.addEventListener('click', (event) => {
                if (event.target === authModal) {
                    authModal.style.display = 'none';
                }
            });
        }
        
        // Login and Registration logic
        if(loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    currentUser = user;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    updateNavbar();
                    if (authModal) authModal.style.display = 'none';
                } else {
                    if (authMessage) {
                        authMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800');
                        authMessage.classList.add('bg-red-100', 'text-red-800');
                        authMessage.textContent = 'Invalid email or password.';
                    }
                }
            });
        }

        if(registerForm) {
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                if (!name || !email || !password) {
                    if (authMessage) {
                        authMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800');
                        authMessage.classList.add('bg-red-100', 'text-red-800');
                        authMessage.textContent = 'All fields are required.';
                    }
                    return;
                }
                
                let users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.find(u => u.email === email)) {
                    if (authMessage) {
                        authMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800');
                        authMessage.classList.add('bg-red-100', 'text-red-800');
                        authMessage.textContent = 'An account with this email already exists.';
                    }
                    return;
                }
                
                const newUser = { name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(newUser));

                if (authMessage) {
                    authMessage.classList.remove('hidden', 'bg-red-100', 'text-red-800');
                    authMessage.classList.add('bg-green-100', 'text-green-800');
                    authMessage.textContent = 'Account created successfully! You can now sign in.';
                }
                
                if (loginFormContainer && registerFormContainer) {
                     loginFormContainer.classList.remove('hidden');
                     registerFormContainer.classList.add('hidden');
                }
            });
        }
        
        if (logoutNavBtn) {
            logoutNavBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                currentUser = null;
                updateNavbar();
            });
        }
        
        // Dark/Light Mode Toggle
        const theme = localStorage.getItem('theme');
        if (theme) {
            document.body.classList.add(theme);
        }
        const updateIcons = () => {
            if (document.body.classList.contains('dark-mode')) {
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            } else {
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            }
        };
        updateIcons();
        
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark-mode');
                } else {
                    localStorage.removeItem('theme');
                }
                updateIcons();
            });
        }


        // Hero image slider functionality
        const heroImages = document.querySelectorAll('.hero-image');
        const heroTitle = document.getElementById('hero-title');
        const prevArrow = document.querySelector('.absolute.left-0');
        const nextArrow = document.querySelector('.absolute.right-0');
        const dots = document.querySelectorAll('.bottom-10 span');
        let currentImageIndex = 0;

        const updateHeroContent = (index) => {
            heroImages.forEach((img, i) => {
                img.classList.remove('active');
                if (dots[i]) {
                    dots[i].classList.remove('bg-white');
                    dots[i].classList.add('bg-white', 'opacity-40');
                }
            });
            if (heroImages[index]) {
                heroImages[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('bg-white', 'opacity-100');
                dots[index].classList.remove('opacity-40');
            }
            if (heroTitle && heroImages[index]) {
                heroTitle.innerHTML = heroImages[index].dataset.text;
            }
        };

        const nextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            updateHeroContent(currentImageIndex);
        };

        const prevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + heroImages.length) % heroImages.length;
            updateHeroContent(currentImageIndex);
        };

        if (nextArrow) {
            nextArrow.addEventListener('click', nextImage);
        }
        if (prevArrow) {
            prevArrow.addEventListener('click', prevImage);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentImageIndex = index;
                updateHeroContent(currentImageIndex);
            });
        });

        // Initialize slider and auto-rotate
        if (heroImages.length > 0) {
            updateHeroContent(currentImageIndex);
            setInterval(nextImage, 3000);
        }

        // Chatbot functionality
        if (chatButton) chatButton.addEventListener('click', () => {
            chatModal.classList.add('active');
            renderChatHistory();
            if (chatHistory.length === 0) {
                addMessage("Hello! I'm your Parts Assistant. I'm here to help you with any questions you have about our products or your orders. How can I help you today?", 'bot');
                chatHistory.push({ role: 'model', parts: [{ text: "Hello! I'm your Parts Assistant. I'm here to help you with any questions you have about our products or your orders. How can I help you today?" }]});
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            }
        });

        if (closeChatBtn) closeChatBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });

        window.addEventListener('click', (event) => {
            if (event.target === chatModal) {
                chatModal.classList.remove('active');
            }
        });

        const addMessage = (text, sender) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.innerHTML = marked.parse(text); // Use marked to parse markdown
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
        };

        const renderChatHistory = () => {
            chatMessages.innerHTML = ''; // Clear previous messages
            chatHistory.forEach(message => {
                addMessage(message.parts[0].text, message.role);
            });
        };

        const showTypingIndicator = () => {
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot', 'loading-dots', 'active');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const removeTypingIndicator = () => {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        };

        const sendMessage = async () => {
            const messageText = chatInput.value.trim();
            if (messageText === '') return;

            addMessage(messageText, 'user');
            chatHistory.push({ role: 'user', parts: [{ text: messageText }] });
            chatInput.value = '';
            
            showTypingIndicator();

            try {
                let retryCount = 0;
                const maxRetries = 3;
                let response;
                
                const apiKey = "AIzaSyBE7KkdS35cXG7xChPNihLzX-W0HB5YK2A";
                const payload = {
                    contents: chatHistory
                };
                
                const callApi = async () => {
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }
                };
                
                // Exponential backoff with a maximum of 3 retries.
                for (retryCount = 0; retryCount < maxRetries; retryCount++) {
                    try {
                        await callApi();
                        break;
                    } catch (error) {
                        if (retryCount === maxRetries - 1) {
                            throw error;
                        }
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                    }
                }

                const result = await response.json();
                let botResponse = 'Sorry, I am unable to provide a response at the moment. Please try again later.';
                if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                    botResponse = result.candidates[0].content.parts[0].text;
                }
                
                removeTypingIndicator();
                addMessage(botResponse, 'bot');
                chatHistory.push({ role: 'model', parts: [{ text: botResponse }] });
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

            } catch (error) {
                console.error('Error calling Gemini API:', error);
                removeTypingIndicator();
                const errorMsg = 'An error occurred. Please try again.';
                addMessage(errorMsg, 'bot');
                chatHistory.push({ role: 'model', parts: [{ text: errorMsg }] });
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            }
        };

        if (chatSendBtn) chatSendBtn.addEventListener('click', sendMessage);
        if (chatInput) chatInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });
    };
    
    populateDropdowns(partsData);
    setupModalEvents(partsData);
    updateNavbar();
    updateSelectionStatus();
});

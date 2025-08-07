const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const productTypeSelect = document.getElementById('productType');
const submitButton = document.getElementById('submitButton');
const selectedValues = document.getElementById('selectedValues');
const selectedContent = document.getElementById('selectedContent');
const form = document.getElementById('partsFinderForm');
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const chatToggle = document.getElementById("chatToggle");
const chatMenu = document.getElementById("chatMenu");
const chatIcon = document.getElementById("chatIcon");
const closeIcon = document.getElementById("closeIcon");
const closeChat = document.getElementById("closeChat");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlides(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex = (n + slides.length) % slides.length;
  slides[slideIndex].classList.add("active");
}

function plusSlides(n) {
  showSlides(slideIndex + n);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides(0); // show the first slides on load
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

  function scrollToForm() {
    const formSection = document.getElementById("partsFinderForm");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function revealForm() {
    const formSection = document.getElementById("findPartsSection");
    const recentSection = document.getElementById("recentlyViewedSection");
  
    formSection?.classList.remove("hidden");
    formSection?.scrollIntoView({ behavior: "smooth" });
  
    if (recentSection?.classList.contains("hidden")) {
      recentSection.classList.remove("hidden");
      recentSection.classList.add("visible"); // for fade-in animation
    }
  }
  
// Toggle FAQ questions when FAQ button is clicked
// Show FAQ list when FAQ option clicked
document.querySelector('[data-type="faq"]').addEventListener("click", () => {
    document.getElementById("faqButtons").classList.remove("hidden");
    document.getElementById("faqChatView").classList.add("hidden");
  });
  
  // Handle FAQ button clicks
  document.querySelectorAll(".faq-btn").forEach(button => {
    button.addEventListener("click", () => {
      const question = button.textContent;
      const answer = button.dataset.answer;
  
      document.getElementById("chatUserQuestion").textContent = question;
      document.getElementById("chatBotAnswer").textContent = answer;
  
      document.getElementById("faqButtons").classList.add("hidden");
      document.getElementById("faqChatView").classList.remove("hidden");
    });
  });
  
  // Go back to list
  document.getElementById("backToFaq").addEventListener("click", () => {
    document.getElementById("faqChatView").classList.add("hidden");
    document.getElementById("faqButtons").classList.remove("hidden");
  });
  
  
  function handleFeedback(choice) {
    const feedbackButtons = document.getElementById('feedbackButtons');
    const feedbackResponse = document.getElementById('feedbackResponse');
    const feedbackText = document.getElementById('feedbackText');

    feedbackButtons.classList.add('hidden');

    if (choice === 'yes') {
      feedbackText.textContent = 'Thank you!';
      feedbackResponse.textContent = '😊 Glad it helped!';
    } else {
      feedbackText.textContent = 'Thank you for your feedback!';
      feedbackResponse.textContent = '😔 We’ll try to improve.';
    }

    feedbackResponse.classList.remove('hidden');
  }
  const deals = [
    "🔥 10% OFF bumpers today!",
    "🚗 Free shipping on orders over $50!",
    "🎉 15% OFF headlights – today only!",
    "🧰 Buy 2 tail lights, get 1 free!",
    "⚡ 5% discount on all Toyota parts!"
  ];
  
  function revealDeal() {
    const dealBox = document.getElementById("deal-box");
    const randomDeal = deals[Math.floor(Math.random() * deals.length)];
  
    dealBox.innerText = randomDeal;
    dealBox.classList.remove("hidden");
    dealBox.classList.add("fade-in-deal");
  
    // Optional: Confetti effect
    dealBox.classList.add("confetti-pop");
    setTimeout(() => dealBox.classList.remove("confetti-pop"), 1000);
  }
  
// ---------- Theme Toggle ----------
function setTheme(mode) {
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  setTheme(saved || "dark"); // Always defaults to dark mode
}


themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
});

initTheme();

// ---------- Form Logic ----------
function initializeForm() {
  populateYears();
  yearSelect.addEventListener('change', handleYearChange);
  makeSelect.addEventListener('change', handleMakeChange);
  modelSelect.addEventListener('change', handleModelChange);
  productTypeSelect.addEventListener('change', updateFormState);
  form.addEventListener('submit', handleSubmit);
}
document.getElementById("vinLookupBtn").addEventListener("click", handleVinLookup);

function handleVinLookup() {
    const vin = document.getElementById("vinInput").value.trim().toUpperCase();

    if (vin.length !== 17) {
      alert("Please enter a valid 17-character VIN.");
      return;
    }
  
    // Dummy VIN to vehicle mapping
    const vinMap = {
      "1C6RR7KT9CS123456": { year: "2012", make: "RAM", model: "1500" },
      "4T1BF1FK7FU123456": { year: "2015", make: "Toyota", model: "Camry" },
      "2T1BURHE5HC765432": { year: "2017", make: "Toyota", model: "Corolla" }
    };
  
    const decoded = vinMap[vin];
  
    if (!decoded) {
      alert("VIN not found in demo database.");
      return;
    }
  
    // Auto-fill dropdowns
    yearSelect.value = decoded.year;
    handleYearChange();
    setTimeout(() => {
      makeSelect.value = decoded.make;
      handleMakeChange();
      setTimeout(() => {
        modelSelect.value = decoded.model;
        handleModelChange();
      }, 300);
    }, 300);
  }
  
  function animateOnScroll() {
    const animatedItems = document.querySelectorAll('.fade-in, .slide-up');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    animatedItems.forEach(item => observer.observe(item));
  }
  

function populateYears() {
  const years = [...new Set(partsData.map(item => item.year))];
  yearSelect.innerHTML = '<option value="">Select Year</option>';
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
}

function handleYearChange() {
  const year = yearSelect.value;
  resetSelect(makeSelect, 'Select Make');
  resetSelect(modelSelect, 'Select Model');
  resetSelect(productTypeSelect, 'Select Product Type');
  if (!year) return;
  const makes = [...new Set(partsData.filter(item => item.year === year).map(item => item.make))];
  makes.forEach(make => {
    const option = document.createElement('option');
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
  makeSelect.disabled = false;
  updateFormState();
}

function handleMakeChange() {
  const year = yearSelect.value;
  const make = makeSelect.value;
  resetSelect(modelSelect, 'Select Model');
  resetSelect(productTypeSelect, 'Select Product Type');
  if (!make) return;
  const models = [...new Set(partsData.filter(item => item.year === year && item.make === make).map(item => item.model))];
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
  modelSelect.disabled = false;
  updateFormState();
}

function handleModelChange() {
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;
  resetSelect(productTypeSelect, 'Select Product Type');
  if (!model) return;
  const types = [...new Set(partsData.filter(item => item.year === year && item.make === make && item.model === model).map(item => item.productType))];
  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    productTypeSelect.appendChild(option);
  });
  productTypeSelect.disabled = false;
  updateFormState();
}

function resetSelect(select, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  select.disabled = true;
}
function updateFormState() {
  const filled = yearSelect.value && makeSelect.value && modelSelect.value && productTypeSelect.value;
  submitButton.disabled = !filled;
}

function updateFormState() {
  const filled = yearSelect.value && makeSelect.value && modelSelect.value;
  submitButton.disabled = !filled;
}


function handleSubmit(e) {
  e.preventDefault();

  // Hide modal and enable page scroll
  document.getElementById("findPartsModal").classList.add("hidden");
  document.body.style.overflow = "auto";

  const year = yearSelect.value.trim();
  const make = makeSelect.value.trim();
  const model = modelSelect.value.trim();
  const productType = productTypeSelect.value.trim();

  if (!year || !make || !model) {
    alert("Please select Year, Make, and Model.");
    return;
  }

  const formattedMake = make.toLowerCase().replace(/\s+/g, '-');
  const formattedModel = model.toLowerCase().replace(/\s+/g, '-');
  let url = `https://partifyusa.com/collections/${year}-${formattedMake}-${formattedModel}`;

  if (productType) {
    const encodedProduct = encodeURIComponent(productType);
    url += `?filter.p.product_type=${encodedProduct}`;
  }

  saveToRecentlyViewed({ year, make, model, productType, url });

  //  Open the collection in a new tab
  window.open(url, '_blank');
}

  // ------------------ Recently Viewed ------------------
  function saveToRecentlyViewed(item) {
    const key = "recentlyViewedParts";
    let history = JSON.parse(localStorage.getItem(key)) || [];
  
    history = history.filter(h =>
      !(h.year === item.year && h.make === item.make && h.model === item.model && h.productType === item.productType)
    );
  
    history.unshift(item);
    if (history.length > 5) history.pop();
  
    localStorage.setItem(key, JSON.stringify(history));
    renderRecentlyViewed();
  }
  
  function renderRecentlyViewed() {
    const recentList = document.getElementById("recentList");
    const data = JSON.parse(localStorage.getItem("recentlyViewedParts")) || [];
    recentList.innerHTML = "";
  
    data.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("recent-list-item");
  
      const span = document.createElement("span");
      span.textContent = `${item.year} ${item.make} ${item.model} - ${item.productType}`;
      span.classList.add("recent-text");
      span.setAttribute("data-url", item.url);
  
      // Navigate on span click
      span.addEventListener("click", () => {
        if (item.url) window.open(item.url, "_blank");
  
        // Pre-select dropdowns for UX continuity
        yearSelect.value = item.year;
        handleYearChange();
        setTimeout(() => {
          makeSelect.value = item.make;
          handleMakeChange();
          setTimeout(() => {
            modelSelect.value = item.model;
            handleModelChange();
            setTimeout(() => {
              productTypeSelect.value = item.productType;
              updateFormState();
            }, 300);
          }, 300);
        }, 300);
      });
      document.addEventListener("DOMContentLoaded", () => {
        initializeForm();
        renderRecentlyViewed();
        animateOnScroll(); // 👈 Add this line
      });
      
      // Create delete icon
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="20" height="20">
        <path d="M3 6h18v2H3V6zm2 3h14l-1.5 13H6.5L5 9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2z"/>
      </svg>
    `;
          removeBtn.classList.add("remove-btn");
      removeBtn.title = "Remove";
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from opening URL
        removeRecentlyViewed(index);
      });
  
      li.appendChild(span);
      li.appendChild(removeBtn);
      recentList.appendChild(li);
    });
  }
  function removeRecentlyViewed(index) {
    let history = JSON.parse(localStorage.getItem("recentlyViewedParts")) || [];
    history.splice(index, 1);
    localStorage.setItem("recentlyViewedParts", JSON.stringify(history));
    renderRecentlyViewed();
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
    renderRecentlyViewed();
  });
  
  // ------------------ Chat Widget ------------------
  chatToggle?.addEventListener("click", () => {
    const isOpen = !chatMenu.classList.contains("hidden");
    chatMenu.classList.toggle("hidden");
    chatIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);
  });
  
  closeChat?.addEventListener("click", () => {
    chatMenu.classList.add("hidden");
    chatIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
  
  document.querySelectorAll('.chat-option').forEach((btn) => {
    btn.addEventListener('click', function () {
      const type = btn.dataset.type;
  
      // Hide all sections first
      document.getElementById('faqButtons')?.classList.add('hidden');
      document.getElementById('faqChatView')?.classList.add('hidden');
      document.getElementById('liveChatView')?.classList.add('hidden');
      document.getElementById('agentCallView')?.classList.add('hidden');
  
      // Show based on type
      if (type === 'faq') {
        document.getElementById('faqButtons')?.classList.remove('hidden');
      } else if (type === 'live') {
        document.getElementById('liveChatView')?.classList.remove('hidden');
      } else if (type === 'agent') {
        document.getElementById('agentCallView')?.classList.remove('hidden');
      }
    });
  });
  
// Back button inside chat to return to main menu
document.getElementById("backToChat")?.addEventListener("click", () => {
  document.getElementById("liveChatView")?.classList.add("hidden");
  document.getElementById("faqChatView")?.classList.add("hidden");
  document.getElementById("faqButtons")?.classList.remove("hidden"); // Optional: Show FAQ list
});


  document.addEventListener('DOMContentLoaded', () => {
    const licensePlateBtn = document.getElementById('licensePlateTrigger');
    const modal = document.getElementById('licensePlateModal');
    const closeModalBtn = document.getElementById('closeLicenseModal');
    const stateSelect = document.getElementById('stateSelect');
    const plateInput = document.getElementById('plateInput');
    const addVehicleBtn = document.getElementById('addVehicleBtn');
  
    // Open modal
    licensePlateBtn?.addEventListener('click', () => {
      modal.classList.remove('hidden');
      stateSelect.value = '';
      plateInput.value = '';
      addVehicleBtn.disabled = true;
    });
  
    // Close modal
    closeModalBtn?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Enable button when valid
    [stateSelect, plateInput].forEach(el =>
      el.addEventListener('input', () => {
        addVehicleBtn.disabled = !(stateSelect.value && plateInput.value.trim().length > 2);
      })
    );
  
    // Dummy vehicle action
    addVehicleBtn?.addEventListener('click', () => {
      const state = stateSelect.value;
      const plate = plateInput.value.trim().toUpperCase();
      alert(`Vehicle added for plate: ${state} - ${plate}`);
      modal.classList.add('hidden');
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const vinBtn = document.getElementById('vinTrigger');
    const vinModal = document.getElementById('vinModal');
    const closeVinModal = document.getElementById('closeVinModal');
    const vinInput = document.querySelector('#vinModal #vinInput');
const lookupVinBtn = document.querySelector('#vinModal #lookupVinBtn');
    // const vinInput = document.getElementById('vinInput');
    // const lookupVinBtn = document.getElementById('lookupVinBtn');
  
    // Dummy VIN to vehicle mapping
    const vinMap = {
      "1C6RR7KT9CS123456": { year: "2012", make: "RAM", model: "1500" },
      "4T1BF1FK7FU123456": { year: "2015", make: "Toyota", model: "Camry" },
      "2T1BURHE5HC765432": { year: "2017", make: "Toyota", model: "Corolla" }
    };
  
    // Open VIN modal
    vinBtn?.addEventListener('click', () => {
      vinModal.classList.remove('hidden');
      vinInput.value = '';
      lookupVinBtn.disabled = true;
    });
  
    // Close VIN modal
    closeVinModal?.addEventListener('click', () => {
      vinModal.classList.add('hidden');
    });
  
    // Enable Lookup button only if VIN is valid length
    vinInput?.addEventListener('input', () => {
      lookupVinBtn.disabled = vinInput.value.trim().length !== 17;
    });
  
    // Handle VIN lookup
    lookupVinBtn?.addEventListener('click', () => {
      alert(`Looking up VIN: ${vinInput.value}`);


      const vin = vinInput.value.trim().toUpperCase();

      const decoded = vinMap[vin];
  
      if (!decoded) {
        alert("VIN not found in demo database.");
        return;
      }
  
      // Close modal and reveal form
      vinModal.classList.add('hidden');
      revealForm();
  
      // Fill Year → Make → Model → Product with delays
      yearSelect.value = decoded.year;
      handleYearChange();
  
      setTimeout(() => {
        makeSelect.value = decoded.make;
        handleMakeChange();
  
        setTimeout(() => {
          modelSelect.value = decoded.model;
          handleModelChange();
  
          setTimeout(() => {
            if (productTypeSelect.options.length > 1) {
              productTypeSelect.selectedIndex = 1; // Auto-select first product
            }
            updateFormState(); // Enable submit if valid
          }, 300);
  
        }, 300);
  
      }, 300);
    });
  });
  

document.addEventListener('DOMContentLoaded', () => {
    // --- Logic for the License Plate Form ---
    const stateSelect = document.getElementById('stateSelect');
    const plateInput = document.getElementById('plateInput');
    const addVehicleBtn = document.getElementById('addVehicleBtn');

    [stateSelect, plateInput].forEach(el =>
      el?.addEventListener('input', () => {
        addVehicleBtn.disabled = !(stateSelect.value && plateInput.value.trim().length > 2);
      })
    );
  
    addVehicleBtn?.addEventListener('click', () => {
      const state = stateSelect.value;
      const plate = plateInput.value.trim().toUpperCase();
      alert(`Vehicle added for plate: ${state} - ${plate}`);
    });


    lookupVinBtnMain?.addEventListener('click', () => {

      const vin = vinInputMain.value.trim().toUpperCase();
      alert("Looking up VIN...");

      const vinMap = {
        "1C6RR7KT9CS123456": { year: "2012", make: "RAM", model: "1500" },
        "4T1BF1FK7FU123456": { year: "2015", make: "Toyota", model: "Camry" },
        "2T1BURHE5HC765432": { year: "2017", make: "Toyota", model: "Corolla" }
      };


      const decoded = vinMap[vin];

      if (!decoded) {
        alert("VIN not found in demo database.");
        return;
      }
      
      // Show and pre-fill the main form
      showFinder('findPartsSection');

      yearSelect.value = decoded.year;
      handleYearChange();
  
      setTimeout(() => {
        makeSelect.value = decoded.make;
        handleMakeChange();
  
        setTimeout(() => {
          modelSelect.value = decoded.model;
          handleModelChange();
        }, 300);
      }, 300);
    });
});


// 🔧 Modal: Find Your Parts
const findPartsModal = document.getElementById("findPartsModal");
const closeFindPartsModal = document.getElementById("closeFindPartsModal");
const enterYearMakeModelBtn = document.querySelector(".quick-search-buttons button");

// Show modal when "Enter Year/Make/Model" is clicked
enterYearMakeModelBtn?.addEventListener("click", () => {
  //  Reset dropdowns and values
  yearSelect.innerHTML = '<option value="">Select Year</option>';
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';

  yearSelect.disabled = false;
  makeSelect.disabled = true;
  modelSelect.disabled = true;
  productTypeSelect.disabled = true;

  yearSelect.value = '';
  makeSelect.value = '';
  modelSelect.value = '';
  productTypeSelect.value = '';
  submitButton.disabled = true;

  //  Repopulate year dropdown so user can begin selecting again
  populateYears();

  // Show modal and prevent background scroll
  findPartsModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});



// Close modal on 'X' button click
closeFindPartsModal?.addEventListener("click", () => {
  findPartsModal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// Optional: Close modal when clicking outside the form
window.addEventListener("click", (e) => {
  if (e.target === findPartsModal) {
    findPartsModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const update = () => {
        const increment = target / 60;
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count) + "+";
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + "+";
        }
      };
      update();
    });
  });


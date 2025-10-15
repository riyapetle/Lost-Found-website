// Navigation and utility functions
const Navigation = {
  // Navigate to different pages with animations
  navigateTo(page, withAnimation = true) {
    if (withAnimation) {
      // Add exit animation to current page
      document.body.style.opacity = '0';
      document.body.style.transform = 'scale(0.95)';
      document.body.style.transition = 'all 0.3s ease-out';
      
      // Navigate after animation
      setTimeout(() => {
        this.doNavigation(page);
      }, 300);
    } else {
      this.doNavigation(page);
    }
  },

  doNavigation(page) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    
    switch (page) {
      case 'home':
        window.location.href = baseUrl + 'index.html';
        break;
      case 'lost':
        window.location.href = baseUrl + 'lost-form.html';
        break;
      case 'found':
        window.location.href = baseUrl + 'found-form.html';
        break;
      case 'dashboard':
        window.location.href = baseUrl + 'dashboard.html';
        break;
      default:
        console.warn('Unknown page:', page);
        window.location.href = baseUrl + 'index.html';
    }
  },

  // Add page load animations
  initPageAnimations() {
    const currentPage = this.getCurrentPage();
    
    // Apply appropriate animation class based on page
    switch (currentPage) {
      case 'home':
        document.body.classList.add('page-transition');
        break;
      case 'lost':
      case 'found':
        document.body.classList.add('form-transition');
        break;
      case 'dashboard':
        document.body.classList.add('dashboard-transition');
        break;
    }

    // Ensure page is visible after animation
    document.body.style.opacity = '1';
    document.body.style.transform = 'scale(1)';
  },

  // Get current page name from URL
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    switch (filename) {
      case 'lost-form.html':
        return 'lost';
      case 'found-form.html':
        return 'found';
      case 'dashboard.html':
        return 'dashboard';
      case 'index.html':
      case '':
      default:
        return 'home';
    }
  }
};

// UI Utility functions
const UIUtils = {
  // Show loading state on button
  setButtonLoading(button, isLoading, loadingText = 'Loading...') {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = `
        <svg class="icon animate-spin mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
        </svg>
        ${loadingText}
      `;
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalText || button.innerHTML;
    }
  },

  // Show error message
  showError(container, message) {
    const existingError = container.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  },

  // Hide error message
  hideError(container) {
    const errorDiv = container.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  },

  // Format date for input field (YYYY-MM-DD)
  formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  // Get today's date in YYYY-MM-DD format
  getTodayDateString() {
    return new Date().toISOString().split('T')[0];
  },

  // Truncate text to specified length
  truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Debounce function for search inputs
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Create loading spinner element
  createLoadingSpinner(size = 'md') {
    const sizeClass = size === 'lg' ? 'icon-lg' : size === 'sm' ? 'icon-sm' : 'icon-md';
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <svg class="animate-spin ${sizeClass} text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
      </svg>
    `;
    return spinner;
  },

  // Create "no items" message element
  createNoItemsMessage(message = 'No items found') {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'no-items';
    messageDiv.innerHTML = `
      <p class="text-gray-500 text-lg">${message}</p>
    `;
    return messageDiv;
  },

  // Show success message
  showSuccess(container, message) {
    const existingSuccess = container.querySelector('.success-message');
    if (existingSuccess) {
      existingSuccess.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message slide-up';
    successDiv.textContent = message;
    container.insertBefore(successDiv, container.firstChild);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }
};

// Modal functionality
const Modal = {
  // Create modal overlay
  createModal(title, content, footer) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="Modal.closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
  },

  // Close modal
  closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.remove();
    }
  },

  // Show edit modal
  showEditModal(item, onSave) {
    const isLost = item.status === 'Lost';
    const gradientClass = isLost ? 'bg-gradient-lost' : 'bg-gradient-found';
    const focusClass = isLost ? 'focus-red' : 'focus-green';
    const buttonClass = isLost ? 'submit-button' : 'submit-button submit-button-green';
    
    const content = `
      <form id="editItemForm" class="space-y-6">
        <div class="form-group">
          <label class="form-label">
            Item Name <span class="required">*</span>
          </label>
          <input
            type="text"
            id="edit-name"
            name="name"
            required
            class="form-input ${focusClass}"
            value="${item.name}"
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Description <span class="required">*</span>
          </label>
          <textarea
            id="edit-description"
            name="description"
            required
            rows="4"
            class="form-textarea ${focusClass}"
          >${item.description}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">
            Location ${item.status} <span class="required">*</span>
          </label>
          <input
            type="text"
            id="edit-location"
            name="location"
            required
            class="form-input ${focusClass}"
            value="${item.location}"
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Date ${item.status} <span class="required">*</span>
          </label>
          <input
            type="date"
            id="edit-date"
            name="date"
            required
            class="form-input ${focusClass}"
            value="${item.date}"
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Photo (Optional)
          </label>
          <div class="upload-area" id="editUploadArea">
            <input
              type="file"
              id="edit-photo"
              name="photo"
              accept="image/*"
              class="upload-input"
            />
            <label for="edit-photo" class="cursor-pointer">
              <div id="editUploadContent">
                ${item.photo_url ? 
                  `<img src="${item.photo_url}" alt="Current photo" class="upload-preview" />
                   <p class="text-gray-600">Click to change photo</p>` :
                  `<svg class="icon-lg text-gray-400 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                     <polyline points="7,10 12,5 17,10"/>
                     <line x1="12" y1="5" x2="12" y2="15"/>
                   </svg>
                   <p class="text-gray-600">Click to upload a photo</p>`
                }
              </div>
            </label>
          </div>
        </div>
      </form>
    `;
    
    const footer = `
      <button type="button" class="modal-btn modal-btn-secondary" onclick="Modal.closeModal()">
        Cancel
      </button>
      <button type="button" class="modal-btn modal-btn-primary" onclick="Modal.saveEditedItem('${item.id}', ${JSON.stringify(item).replace(/"/g, '&quot;')})">
        Save Changes
      </button>
    `;
    
    this.createModal(`Edit ${item.status} Item`, content, footer);
    
    // Handle photo upload in modal
    document.getElementById('edit-photo').addEventListener('change', this.handleEditPhotoChange);
  },

  // Handle photo change in edit modal
  handleEditPhotoChange(e) {
    const file = e.target.files[0];
    const uploadContent = document.getElementById('editUploadContent');
    
    if (!file) return;
    
    // Validate file
    const validation = CloudinaryAPI.validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.errors.join(', '));
      return;
    }
    
    // Show preview
    CloudinaryAPI.createPreviewUrl(file).then(previewUrl => {
      uploadContent.innerHTML = `
        <img src="${previewUrl}" alt="Preview" class="upload-preview" />
        <p class="text-gray-600">Click to change photo</p>
      `;
    }).catch(error => {
      console.error('Error creating preview:', error);
    });
  },

  // Save edited item
  async saveEditedItem(itemId, originalItem) {
    try {
      const form = document.getElementById('editItemForm');
      const formData = new FormData(form);
      const photoInput = document.getElementById('edit-photo');
      
      const updatedData = {
        name: formData.get('name').trim(),
        description: formData.get('description').trim(),
        location: formData.get('location').trim(),
        date: formData.get('date'),
        updated_at: new Date().toISOString()
      };
      
      // Upload new photo if provided
      if (photoInput.files[0]) {
        try {
          updatedData.photo_url = await CloudinaryAPI.uploadImage(photoInput.files[0]);
        } catch (error) {
          console.error('Photo upload failed:', error);
          // Continue without updating photo
        }
      }
      
      // Update item in database
      await SupabaseAPI.updateItem(itemId, updatedData);
      
      // Close modal and refresh page
      this.closeModal();
      
      // Show success message and reload dashboard if we're on it
      if (window.location.pathname.includes('dashboard')) {
        window.location.reload();
      } else {
        alert('Item updated successfully!');
      }
      
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save changes: ' + error.message);
    }
  },

  // Show confirmation dialog
  showConfirmDialog(title, message, onConfirm) {
    const content = `
      <p class="text-gray-700 text-lg mb-4">${message}</p>
    `;
    
    const footer = `
      <button type="button" class="modal-btn modal-btn-secondary" onclick="Modal.closeModal()">
        Cancel
      </button>
      <button type="button" class="modal-btn modal-btn-primary" onclick="Modal.confirmAction()">
        Confirm
      </button>
    `;
    
    this.createModal(title, content, footer);
    this.pendingAction = onConfirm;
  },

  // Execute confirmed action
  confirmAction() {
    if (this.pendingAction) {
      this.pendingAction();
      this.pendingAction = null;
    }
    this.closeModal();
  }
};

// Icon utility functions using SVG icons (replacing Lucide React)
const Icons = {
  // Arrow Left icon
  arrowLeft: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12,19 5,12 12,5"/></svg>`,
  
  // Upload icon
  upload: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,5 17,10"/><line x1="12" y1="5" x2="12" y2="15"/></svg>`,
  
  // Map Pin icon
  mapPin: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  
  // Calendar icon
  calendar: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  
  // Frown icon (for lost items)
  frown: `<svg class="icon-xl text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  
  // Smile icon (for found items)
  smile: `<svg class="icon-xl text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  
  // Loading spinner
  spinner: `<svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/></svg>`
};

// Export for global use
window.Navigation = Navigation;
window.UIUtils = UIUtils;
window.Icons = Icons;
window.Modal = Modal;

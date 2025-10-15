// Local image handling - no external service required
const LocalImageAPI = {
  // Convert image file to base64 data URL (stored locally)
  async uploadImage(file) {
    try {
      if (!file) {
        throw new Error('No file provided for upload');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 2MB for base64 storage)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        throw new Error('File size must be less than 2MB for local storage');
      }

      console.log('📸 Converting image to base64...');
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const base64String = e.target.result;
          console.log('✅ Image converted to base64 successfully');
          resolve(base64String);
        };
        
        reader.onerror = function() {
          console.error('❌ Failed to read image file');
          reject(new Error('Failed to read image file'));
        };
        
        reader.readAsDataURL(file);
      });
      
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  },

  // Create preview URL for file (same as upload for local storage)
  createPreviewUrl(file) {
    return this.uploadImage(file);
  },

  // Validate image file
  validateImageFile(file) {
    const errors = [];

    if (!file) {
      errors.push('No file selected');
      return { isValid: false, errors };
    }

    if (!file.type.startsWith('image/')) {
      errors.push('Please select a valid image file');
    }

    const maxSize = 2 * 1024 * 1024; // 2MB for local storage
    if (file.size > maxSize) {
      errors.push('File size must be less than 2MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors.push('Please select a JPEG, PNG, GIF, or WebP image');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },

  // Compress image if too large
  async compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
};

// Export for use in other files
window.LocalImageAPI = LocalImageAPI;
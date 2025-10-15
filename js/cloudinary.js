// Cloudinary image upload utilities
const CloudinaryAPI = {
  // Working demo configurations
  configs: [
    { cloudName: 'demo', uploadPreset: 'docs_upload_example_us_preset' },
    { cloudName: 'demo', uploadPreset: 'upload_example' },
    { cloudName: 'demo', uploadPreset: 'sample_upload' },
    { cloudName: 'dlh7rkwgx', uploadPreset: 'sample' },
  ],

  // Upload image to Cloudinary
  async uploadImage(file) {
    try {
      if (!file) {
        throw new Error('No file provided for upload');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        throw new Error('File size must be less than 10MB');
      }

      // Try multiple working configurations
      for (let i = 0; i < this.configs.length; i++) {
        const config = this.configs[i];
        console.log(`📤 Attempting upload ${i + 1}/${this.configs.length} - ${config.cloudName}/${config.uploadPreset}`);
        
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', config.uploadPreset);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Upload successful with config ${i + 1}:`, data.secure_url);
            return data.secure_url;
          } else {
            const errorText = await response.text();
            console.warn(`❌ Config ${i + 1} failed: HTTP ${response.status} - ${errorText}`);
            if (i === this.configs.length - 1) {
              throw new Error(`All upload configurations failed. Last error: HTTP ${response.status} - ${errorText}`);
            }
          }
        } catch (error) {
          console.warn(`❌ Config ${i + 1} error:`, error.message);
          if (i === this.configs.length - 1) {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  },

  // Create preview URL for file
  createPreviewUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
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

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      errors.push('File size must be less than 10MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors.push('Please select a JPEG, PNG, GIF, or WebP image');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
};

// Export for use in other files
window.CloudinaryAPI = CloudinaryAPI;
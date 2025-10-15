// Supabase client configuration and utilities
// TODO: Replace these with your new Supabase project credentials
const SUPABASE_URL = 'YOUR_NEW_PROJECT_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_NEW_ANON_KEY_HERE';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test database connection and permissions on load
console.log('🔌 Supabase client initialized with URL:', SUPABASE_URL);
console.log('🔑 Using anonymous key ending in:', SUPABASE_ANON_KEY.slice(-10));

// Database utility functions
const SupabaseAPI = {
  // Get all items with optional status filter
  async getItems(statusFilter = 'All') {
    try {
      console.log(`📋 Fetching items from database with filter: ${statusFilter}`);
      
      let query = supabaseClient
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter && statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching items:', error);
        throw new Error(`Failed to fetch items: ${error.message}`);
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} items from database`);
      if (data && data.length > 0) {
        console.log('📝 Item IDs in database:', data.map(item => `${item.id} (${item.name})`));
      }
      
      return data || [];
    } catch (error) {
      console.error('💥 Error in getItems:', error);
      throw error;
    }
  },

  // Create a new item
  async createItem(itemData) {
    try {
      const { data, error } = await supabaseClient
        .from('items')
        .insert([itemData])
        .select()
        .single();

      if (error) {
        console.error('Error creating item:', error);
        throw new Error(`Failed to create item: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in createItem:', error);
      throw error;
    }
  },

  // Update an existing item
  async updateItem(itemId, itemData) {
    try {
      const { data, error } = await supabaseClient
        .from('items')
        .update(itemData)
        .eq('id', itemId)
        .select()
        .single();

      if (error) {
        console.error('Error updating item:', error);
        throw new Error(`Failed to update item: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in updateItem:', error);
      throw error;
    }
  },

  // Delete an item
  async deleteItem(itemId) {
    try {
      console.log(`🗑️ Attempting to delete item with ID: ${itemId}`);
      
      // First, verify the item exists
      const { data: existingItem, error: fetchError } = await supabaseClient
        .from('items')
        .select('*')
        .eq('id', itemId)
        .single();
      
      if (fetchError) {
        console.error('❌ Item not found before deletion:', fetchError);
        throw new Error(`Item not found: ${fetchError.message}`);
      }
      
      console.log('✅ Item found, proceeding with deletion:', existingItem.name);
      
      // Perform the deletion
      const { data, error } = await supabaseClient
        .from('items')
        .delete()
        .eq('id', itemId)
        .select(); // This returns the deleted rows

      if (error) {
        console.error('❌ Database deletion failed:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new Error(`Database deletion failed: ${error.message}`);
      }
      
      console.log('🎯 Deletion response:', data);
      
      // Verify deletion was successful
      if (!data || data.length === 0) {
        console.warn('⚠️ No rows were deleted - item may not exist or permission denied');
        throw new Error('No rows were deleted - check permissions or item existence');
      }
      
      console.log('✅ Item successfully deleted from database:', data[0].name);
      
      // Double-check by trying to fetch the item again
      const { data: verifyData, error: verifyError } = await supabaseClient
        .from('items')
        .select('*')
        .eq('id', itemId)
        .single();
      
      if (!verifyError) {
        console.error('❌ CRITICAL: Item still exists after deletion!', verifyData);
        throw new Error('Item still exists in database after deletion attempt');
      }
      
      // This error is expected - it means the item was successfully deleted
      if (verifyError.code === 'PGRST116') {
        console.log('✅ Deletion verified - item no longer exists in database');
        return true;
      }
      
      console.log('✅ Deletion successful and verified');
      return true;
      
    } catch (error) {
      console.error('💥 Error in deleteItem function:', error);
      throw error;
    }
  },

  // Get a single item by ID
  async getItemById(itemId) {
    try {
      console.log(`🔍 Fetching item with ID: ${itemId}`);
      
      const { data, error } = await supabaseClient
        .from('items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error) {
        console.log(`ℹ️ Item not found (this may be expected): ${error.message}`);
        throw error; // Let the caller handle this
      }

      console.log('✅ Item found:', data.name);
      return data;
    } catch (error) {
      console.log(`ℹ️ getItemById result: ${error.message}`);
      throw error;
    }
  },

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  // Validate item data before submission
  validateItem(itemData) {
    const errors = [];

    if (!itemData.name || itemData.name.trim().length === 0) {
      errors.push('Item name is required');
    }

    if (!itemData.description || itemData.description.trim().length === 0) {
      errors.push('Item description is required');
    }

    if (!itemData.location || itemData.location.trim().length === 0) {
      errors.push('Location is required');
    }

    if (!itemData.date || itemData.date.trim().length === 0) {
      errors.push('Date is required');
    }

    if (!itemData.status || !['Lost', 'Found'].includes(itemData.status)) {
      errors.push('Valid status is required');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
};

// Export for use in other files
window.SupabaseAPI = SupabaseAPI;
// Test Users Setup Script for NBM Portal Development
// This script creates test users for the three portal roles in Supabase

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test users configuration
const TEST_USERS = [
  {
    email: 'editor.test@nbm.gov.in',
    password: 'Editor@123',
    full_name: 'Dr. Rajesh Kumar',
    mobile: '+91-9876543210',
    state_code: 'BR',
    role: 'state_editor',
    is_active: true,
  },
  {
    email: 'reviewer.test@nbm.gov.in',
    password: 'Reviewer@123',
    full_name: 'Prof. Meera Sharma',
    mobile: '+91-9876543211',
    state_code: 'JK',
    role: 'state_reviewer',
    is_active: true,
  },
  {
    email: 'central.admin@nbm.gov.in',
    password: 'Central@123',
    full_name: 'Mr. Sanjay Verma',
    mobile: '+91-9876543212',
    state_code: null,
    role: 'nbm_central',
    is_active: true,
  }
];

async function setupTestUsers() {
  console.log('🔧 Setting up test users for NBM Portal Development\n');

  // 1. Create auth users in Supabase
  console.log('1. Creating auth users...');
  const authUsers = [];

  for (const user of TEST_USERS) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          full_name: user.full_name,
          mobile: user.mobile,
        },
      });

      if (error) {
        console.error(`❌ Failed to create user ${user.email}:`, error.message);
        continue;
      }

      authUsers.push({ ...user, id: data.user.id });
      console.log(`✅ Created user: ${user.email} (ID: ${data.user.id})`);

    } catch (error) {
      console.error(`❌ Error creating user ${user.email}:`, error);
    }
  }

  console.log('\n2. Creating state_users records...');

  // 2. Create state_users records
  for (const user of authUsers) {
    try {
      const { data, error } = await supabase
        .from('state_users')
        .insert({
          user_id: user.id,
          full_name: user.full_name,
          email: user.email,
          mobile: user.mobile,
          state_code: user.state_code,
          role: user.role,
          is_active: user.is_active,
        });

      if (error) {
        console.error(`❌ Failed to create state_user record for ${user.email}:`, error.message);
        continue;
      }

      console.log(`✅ Created state_user record for: ${user.email}`);

    } catch (error) {
      console.error(`❌ Error creating state_user for ${user.email}:`, error);
    }
  }

  console.log('\n3. Setup Summary:');
  console.log('========================');
  console.log('Test users created for development:');
  console.log('');
  TEST_USERS.forEach(user => {
    console.log(`${user.role.toUpperCase()} User:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${user.password}`);
    console.log(`  Name: ${user.full_name}`);
    console.log(`  State: ${user.state_code || 'N/A'}`);
    console.log('');
  });

  console.log('🎉 Test users setup complete!');
  console.log('\nYou can now test the portal with these credentials:');
  console.log('- Login at: http://localhost:8080/login');
  console.log('- Use the credentials above to test each role.');
}

// Run the setup
if (require.main === module) {
  setupTestUsers().catch(console.error);
}

export { setupTestUsers };
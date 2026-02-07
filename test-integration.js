// Test script to verify API integration
import axios from 'axios';

async function testAPIIntegration() {
  const baseURL = 'https://elite-properties-backend-production.up.railway.app';
  
  console.log('Testing API Integration...\n');
  
  try {
    // Test 1: Signup API
    console.log('1. Testing Signup API...');
    const signupResponse = await axios.post(`${baseURL}/api/auth/signup`, {
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNo: '1234567890',
      password: 'password123'
    });
    console.log('✓ Signup API Response:', signupResponse.data.success ? 'SUCCESS' : 'FAILED');
    
    // Test 2: Login API
    console.log('\n2. Testing Login API...');
    const loginResponse = await axios.post(`${baseURL}/api/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✓ Login API Response:', loginResponse.data.success ? 'SUCCESS' : 'FAILED');
    
    if (loginResponse.data.success) {
      const token = loginResponse.data.token;
      
      // Test 3: Get Profile API (with auth token)
      console.log('\n3. Testing Get Profile API...');
      const profileResponse = await axios.get(`${baseURL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✓ Get Profile API Response:', profileResponse.data.success ? 'SUCCESS' : 'FAILED');
      
      // Test 4: Update Profile API (with auth token)
      console.log('\n4. Testing Update Profile API...');
      const updateResponse = await axios.put(`${baseURL}/api/profile`, {
        fullName: 'Updated Test User',
        phoneNo2: '0987654321',
        adharNo: '123456789012',
        panNo: 'ABCDE1234F',
        address: {
          addressLine: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✓ Update Profile API Response:', updateResponse.data.success ? 'SUCCESS' : 'FAILED');
    }
    
    console.log('\n🎉 All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

testAPIIntegration();
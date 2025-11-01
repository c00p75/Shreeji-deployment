const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_KEY = process.env.API_KEY;

class SampleDataCreator {
  constructor() {
    this.strapi = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
      },
    });
  }

  async createSampleCustomers() {
    console.log('👥 Creating sample customers...');
    
    const customers = [
      {
        data: {
          email: 'john.mwamba@email.com',
          firstName: 'John',
          lastName: 'Mwamba',
          phone: '+260977123456',
          dateOfBirth: '1985-03-15',
          gender: 'male',
          isActive: true,
          isVerified: true,
          customerType: 'individual',
          totalOrders: 3,
          totalSpent: 85000,
          loyaltyPoints: 425,
          preferredLanguage: 'en',
          marketingConsent: true
        }
      },
      {
        data: {
          email: 'sarah.chanda@email.com',
          firstName: 'Sarah',
          lastName: 'Chanda',
          phone: '+260977654321',
          dateOfBirth: '1990-07-22',
          gender: 'female',
          isActive: true,
          isVerified: true,
          customerType: 'individual',
          totalOrders: 2,
          totalSpent: 45000,
          loyaltyPoints: 225,
          preferredLanguage: 'en',
          marketingConsent: false
        }
      },
      {
        data: {
          email: 'procurement@techcorp.co.zm',
          firstName: 'Michael',
          lastName: 'Banda',
          phone: '+260977987654',
          isActive: true,
          isVerified: true,
          customerType: 'business',
          companyName: 'TechCorp Zambia Ltd',
          taxId: 'TAX123456789',
          totalOrders: 5,
          totalSpent: 250000,
          loyaltyPoints: 1250,
          preferredLanguage: 'en',
          marketingConsent: true
        }
      }
    ];

    for (const customer of customers) {
      try {
        await this.strapi.post('/customers', customer);
        console.log(`✅ Created customer: ${customer.data.firstName} ${customer.data.lastName}`);
      } catch (error) {
        console.log(`❌ Failed to create customer: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  async createSampleCoupons() {
    console.log('\n🎫 Creating sample coupons...');
    
    const coupons = [
      {
        data: {
          code: 'WELCOME10',
          name: 'Welcome Discount',
          description: '10% off your first order',
          type: 'percentage',
          value: 10,
          minimumOrderAmount: 5000,
          usageLimit: 100,
          usedCount: 15,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          isActive: true
        }
      },
      {
        data: {
          code: 'SAVE50',
          name: 'Fixed Amount Discount',
          description: 'K50 off orders over K20,000',
          type: 'fixed_amount',
          value: 50,
          minimumOrderAmount: 20000,
          maximumDiscountAmount: 50,
          usageLimit: 50,
          usedCount: 8,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
          isActive: true
        }
      },
      {
        data: {
          code: 'FREEDEL',
          name: 'Free Delivery',
          description: 'Free delivery on all orders',
          type: 'free_delivery',
          value: 0,
          minimumOrderAmount: 10000,
          usageLimit: 200,
          usedCount: 25,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
          isActive: true
        }
      }
    ];

    for (const coupon of coupons) {
      try {
        await this.strapi.post('/coupons', coupon);
        console.log(`✅ Created coupon: ${coupon.data.code} - ${coupon.data.name}`);
      } catch (error) {
        console.log(`❌ Failed to create coupon: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  async createSampleReviews() {
    console.log('\n⭐ Creating sample reviews...');
    
    // First, get some products
    try {
      const productsResponse = await this.strapi.get('/products?pagination[limit]=3');
      const products = productsResponse.data.data;
      
      if (products.length === 0) {
        console.log('❌ No products found to create reviews for');
        return;
      }

      const reviews = [
        {
          data: {
            rating: 5,
            title: 'Excellent product!',
            comment: 'This laptop is perfect for my business needs. Fast, reliable, and great value for money. Highly recommended!',
            isVerified: true,
            isApproved: true,
            helpfulVotes: 12,
            product: products[0].id,
            customer: 1 // Assuming customer with ID 1 exists
          }
        },
        {
          data: {
            rating: 4,
            title: 'Good quality',
            comment: 'Solid performance and build quality. The battery life could be better, but overall satisfied with the purchase.',
            isVerified: true,
            isApproved: true,
            helpfulVotes: 8,
            product: products[0].id,
            customer: 2 // Assuming customer with ID 2 exists
          }
        },
        {
          data: {
            rating: 5,
            title: 'Outstanding!',
            comment: 'Exceeded my expectations. Fast delivery, great customer service, and the product works perfectly.',
            isVerified: true,
            isApproved: true,
            helpfulVotes: 15,
            product: products[1]?.id || products[0].id,
            customer: 1
          }
        }
      ];

      for (const review of reviews) {
        try {
          await this.strapi.post('/reviews', review);
          console.log(`✅ Created review: ${review.data.title}`);
        } catch (error) {
          console.log(`❌ Failed to create review: ${error.response?.data?.error?.message || error.message}`);
        }
      }
    } catch (error) {
      console.log(`❌ Failed to fetch products for reviews: ${error.message}`);
    }
  }

  async run() {
    console.log('🎯 CREATING SAMPLE E-COMMERCE DATA');
    console.log('==================================\n');

    await this.createSampleCustomers();
    await this.createSampleCoupons();
    await this.createSampleReviews();

    console.log('\n🎉 Sample data creation completed!');
    console.log('\n📋 What was created:');
    console.log('✅ Sample customers (individual and business)');
    console.log('✅ Sample coupons (percentage, fixed amount, free delivery)');
    console.log('✅ Sample product reviews');
    console.log('\n🚀 You can now:');
    console.log('1. Visit admin dashboard: http://localhost:3002');
    console.log('2. See the sample data in your admin panel');
    console.log('3. Test customer management features');
    console.log('4. Try the coupon system');
    console.log('5. View product reviews');
  }
}

// Run the sample data creation
const creator = new SampleDataCreator();
creator.run();

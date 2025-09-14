# Learnity 🚀

![Next.js](https://img.shields.io/badge/Next.js-15.3-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-green)
![Stripe](https://img.shields.io/badge/Stripe-Integration-purple)
![PayloadCMS](https://img.shields.io/badge/PayloadCMS-3.44-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

Learnity is a modern multi-tenant e-commerce platform built for educational content creators. It enables multiple vendors to create their own storefronts, manage products, and process payments in a unified ecosystem.
![alt text](/docs/images/image1.png)
![alt text](/docs/images/image2.png)
![alt text](/docs/images/image3.png)

## ✨ Features

### Tenants (Sellers) 🏪

- **Custom Storefronts**: Each seller gets their own branded storefront with a unique URL
- **Product Management**: Easy-to-use tools for adding and managing educational products
- **Stripe Integration**: Secure payment processing with individual Stripe accounts
- **Sales Analytics**: Track product performance and sales metrics

### Customers 🛒

- **Unified Shopping Experience**: Browse products from multiple sellers in one platform
- **Shopping Cart**: Add products from different sellers into a single cart
- **Secure Checkout**: Streamlined checkout process with Stripe
- **Reviews System**: Rate and review purchased products
- **Personal Library**: Access purchased digital products in one place

### Platform 🛠️

- **Multi-tenancy**: Complete isolation between different seller accounts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Admin Dashboard**: Comprehensive tools for platform management
- **SEO Friendly**: Optimized for search engines with Next.js

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: PayloadCMS, Node.js
- **Database**: MongoDB
- **Authentication**: PayloadCMS Auth
- **Payment Processing**: Stripe
- **State Management**: Zustand, React Query
- **UI Components**: Radix UI, Shadcn/UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or newer
- MongoDB database
- Stripe account for payment processing

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chelsea0111/multitenant-ecommerce.git
cd multitenant-ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file with the following variables:

```
DATABASE_URI=your_mongodb_connection_string
PAYLOAD_SECRET=your_payload_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Initialize the database:

```bash
npm run db:fresh
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

Default admin credentials:

```
Email: admin@demo.com
Password: admin
```

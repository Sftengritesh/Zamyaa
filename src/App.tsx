import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/common/ScrollToTop'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import CollectionsPage from '@/pages/CollectionsPage'
import ProductPage from '@/pages/ProductPage'
import CheckoutPage from '@/pages/CheckoutPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import CartPage from '@/pages/CartPage'
import WishlistPage from '@/pages/WishlistPage'
import JournalPage from '@/pages/JournalPage'
import JournalArticlePage from '@/pages/JournalArticlePage'
import ReplacementPolicyPage from '@/pages/ReplacementPolicyPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Customer Authentication & Account Pages
import CustomerLoginPage from '@/pages/CustomerLoginPage'
import CustomerRegisterPage from '@/pages/CustomerRegisterPage'
import CustomerAccountPage from '@/pages/CustomerAccountPage'
import CustomerRoute from '@/components/auth/CustomerRoute'
import { useCustomerAuth } from '@/store/customerAuth'

// Admin Components & Pages
import AdminRoute from '@/components/admin/AdminRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminProductsPage from '@/pages/admin/AdminProductsPage'
import AdminProductFormPage from '@/pages/admin/AdminProductFormPage'
import AdminInventoryPage from '@/pages/admin/AdminInventoryPage'
import AdminCollectionsPage from '@/pages/admin/AdminCollectionsPage'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminCustomersPage from '@/pages/admin/AdminCustomersPage'
import AdminDiscountsPage from '@/pages/admin/AdminDiscountsPage'
import AdminHomepageCMSPage from '@/pages/admin/AdminHomepageCMSPage'
import AdminJournalPage from '@/pages/admin/AdminJournalPage'
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

export default function App() {
  const checkAuth = useCustomerAuth((s) => s.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Admin Public Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/new" element={<AdminProductFormPage />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductFormPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/collections" element={<AdminCollectionsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
          <Route path="/admin/discounts" element={<AdminDiscountsPage />} />
          <Route path="/admin/homepage" element={<AdminHomepageCMSPage />} />
          <Route path="/admin/journal" element={<AdminJournalPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Public Storefront Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionsPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/replacement-policy" element={<ReplacementPolicyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:slug" element={<JournalArticlePage />} />

        {/* Customer Authentication & Protected Account Routes */}
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/register" element={<CustomerRegisterPage />} />
        <Route element={<CustomerRoute />}>
          <Route path="/account" element={<CustomerAccountPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </>
  )
}

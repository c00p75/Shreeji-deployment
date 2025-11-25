"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PencilIcon } from '@heroicons/react/24/outline';
import EditProductModal from '@/app/components/admin/EditProductModal';
import ProductDetails from '@/components/products/product details';
import api from '@/app/lib/admin/api';
import adminAuth from '@/app/lib/admin/auth';

interface ProductDetailsWithEditProps {
  product: any;
  breadcrumbs?: string[];
  className?: string;
}

export default function ProductDetailsWithEdit({
  product,
  breadcrumbs = [],
  className = "",
}: ProductDetailsWithEditProps) {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Check admin authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = adminAuth.isAuthenticated();
      setIsAuthenticated(authenticated);
      setAuthLoading(false);
    };

    // Check immediately
    checkAuth();

    // Listen for storage changes (e.g., when admin logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_jwt' || e.key === 'admin_user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case of same-tab login/logout
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSaveProduct = async (updatedProduct: any) => {
    try {
      setSaving(true);
      
      if (!updatedProduct.documentId) {
        console.error('No documentId found for product');
        throw new Error('Product ID is missing. Cannot save product.');
      }

      // Prepare the data for NestJS backend - only include fields that have values
      // Convert price strings to numbers (remove currency symbols and commas)
      const priceValue = typeof updatedProduct.price === 'string' 
        ? parseFloat(updatedProduct.price.replace(/[^0-9.]/g, '')) || 0
        : updatedProduct.price || 0;
      
      const discountedPriceValue = updatedProduct.discountedPrice
        ? (typeof updatedProduct.discountedPrice === 'string'
          ? parseFloat(updatedProduct.discountedPrice.replace(/[^0-9.]/g, '')) || null
          : updatedProduct.discountedPrice)
        : null;

      let normalizedSubcategory: string | number | null =
        updatedProduct.subcategory === undefined ? null : (updatedProduct.subcategory as string | number | null);
      if (typeof normalizedSubcategory === 'string') {
        normalizedSubcategory = normalizedSubcategory.trim() || null;
      }

      const productData = {
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        category: updatedProduct.category,
        subcategory: normalizedSubcategory,
        brand: updatedProduct.brand,
        price: priceValue,
        discountedPrice: discountedPriceValue,
        tagline: updatedProduct.tagline || null,
        description: updatedProduct.description || null,
        specs: updatedProduct.specs || null,
        images: updatedProduct.images || null,
        isActive: updatedProduct.isActive,
        // Provide default values for required fields
        sku: updatedProduct.SKU || `SKU-${Date.now()}`,
        stockQuantity: updatedProduct.stockQuantity || 0,
        ...(updatedProduct.minStockLevel !== undefined && updatedProduct.minStockLevel !== null && { minStockLevel: updatedProduct.minStockLevel }),
        ...(updatedProduct.maxStockLevel !== undefined && updatedProduct.maxStockLevel !== null && { maxStockLevel: updatedProduct.maxStockLevel }),
        ...(updatedProduct.stockStatus && { stockStatus: updatedProduct.stockStatus }),
        ...(updatedProduct.costPrice !== undefined && updatedProduct.costPrice !== null && { costPrice: updatedProduct.costPrice }),
        ...(updatedProduct.weight !== undefined && updatedProduct.weight !== null && { weight: updatedProduct.weight }),
        ...(updatedProduct.Dimensions && { dimensions: updatedProduct.Dimensions }),
      };

      console.log('Updating product with data:', productData);
      console.log('Product ID:', updatedProduct.documentId);
      
      const response = await api.updateProduct(updatedProduct.documentId, productData);
      console.log('Update response:', response);
      
      // Close modal first
      setShowEditModal(false);
      
      // Refresh the page to show updated product data
      router.refresh();
      
      console.log('Product updated successfully');
    } catch (error: any) {
      console.error('Error updating product:', error);
      
      // Provide more specific error messages
      if (error.response?.status === 404) {
        throw new Error('Product not found. It may have been deleted.');
      } else if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please check your API permissions.');
      } else if (error.response?.status === 403) {
        throw new Error('Forbidden. You do not have permission to update this product.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      } else {
        throw error; // Re-throw so the modal can handle the error
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  // Show product showcase immediately, edit button will appear when auth is confirmed

  return (
    <div className="relative">
      {/* Edit Button - Only show when admin is authenticated */}
      {isAuthenticated && (
        <button
          onClick={handleOpenEditModal}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:bottom-8 md:right-8"
          title="Edit Product"
        >
          <PencilIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Edit Product</span>
        </button>
      )}

      {/* Product Details - Original Design */}
      <ProductDetails product={product} />

      {/* Edit Modal */}
      {showEditModal && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          product={product}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}


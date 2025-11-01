"use client";

import { useState, useEffect } from 'react';
import { 
  XMarkIcon,
  PhotoIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { processProductImages } from '@/app/lib/admin/image-mapping';

interface Product {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  brand: string;
  price: string;
  discountedPrice?: string;
  tagline?: string;
  description?: string;
  specs?: any;
  images: Array<{ url: string; alt: string; isMain?: boolean }>;
  isActive: boolean;
  SKU?: string;
  stockQuantity?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  stockStatus?: string;
  costPrice?: number;
  weight?: number;
  Dimensions?: any;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    slug: '',
    category: '',
    subcategory: '',
    brand: '',
    price: '',
    discountedPrice: '',
    tagline: '',
    description: '',
    specs: {},
    images: [],
    isActive: true,
    SKU: '',
    stockQuantity: 0,
    minStockLevel: 5,
    maxStockLevel: 100,
    stockStatus: 'in-stock',
    costPrice: 0,
    weight: 0,
    Dimensions: { length: 0, width: 0, height: 0, unit: 'cm' }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Categories and brands for dropdowns
  const categories = [
    'Computers', 'Power Solutions', 'Monitors', 'Interactive Displays',
    'Components', 'Networking', 'Accessories'
  ];

  const subcategories = {
    'Computers': ['All in One', 'Desktops', 'Laptops'],
    'Power Solutions': ['UPS'],
    'Monitors': [''],
    'Interactive Displays': [''],
    'Components': ['Cases', 'Processors', 'Graphics Cards', 'Server Hard Drives', 'Consumer Storage'],
    'Networking': ['Switches', 'Routers', 'Access Points'],
    'Accessories': ['']
  };

  const brands = [
    'HP', 'Lenovo', 'Dell', 'Asus', 'LG', 'Huawei', 'ADATA', 'AMD', 'Seagate', 'TP-Link', 'APC'
  ];

  const stockStatuses = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'discontinued', label: 'Discontinued' }
  ];

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        ...product,
        specs: product.specs || {},
        Dimensions: product.Dimensions || { length: 0, width: 0, height: 0, unit: 'cm' },
        SKU: product.SKU || `SKU-${Date.now()}`,
        stockQuantity: product.stockQuantity || 0
      });
      setErrors({});
    }
  }, [product, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSpecsChange = (specKey: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [specKey]: value
      }
    }));
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [
        ...prev.images,
        { url: '', alt: prev.name || 'Product image', isMain: prev.images.length === 0 }
      ]
    }));
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    // If we removed the main image, make the first remaining image the main one
    if (updatedImages.length > 0 && formData.images[index].isMain) {
      updatedImages[0].isMain = true;
    }
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const setMainImage = (index: number) => {
    const updatedImages = formData.images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.brand) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    if (formData.stockQuantity !== undefined && formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }

    if (formData.minStockLevel !== undefined && formData.maxStockLevel !== undefined) {
      if (formData.minStockLevel >= formData.maxStockLevel) {
        newErrors.minStockLevel = 'Min stock level must be less than max stock level';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({}); // Clear previous errors
    
    try {
      // Update slug based on name
      const updatedProduct = {
        ...formData,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-')
      };

      console.log('Saving product:', updatedProduct);
      await onSave(updatedProduct);
      onClose();
    } catch (error: any) {
      console.error('Error saving product:', error);
      
      // Show more detailed error message
      let errorMessage = 'Failed to save product. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.response?.status) {
        errorMessage = `Server error (${error.response.status}). Please check your connection.`;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Edit Product</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="">Select subcategory</option>
                      {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map(subcategory => (
                        <option key={subcategory} value={subcategory}>{subcategory || 'None'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Brand *</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.brand ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select brand</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price *</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
                      placeholder="e.g., K30,000"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
                    <input
                      type="text"
                      value={formData.discountedPrice || ''}
                      onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="e.g., K25,000"
                    />
                  </div>
                </div>

                {/* Inventory Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2">Inventory & Specifications</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                      type="text"
                      value={formData.SKU || ''}
                      onChange={(e) => handleInputChange('SKU', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Product SKU"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                      <input
                        type="number"
                        value={formData.stockQuantity || ''}
                        onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.stockQuantity ? 'border-red-500' : ''}`}
                        min="0"
                      />
                      {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                      <select
                        value={formData.stockStatus || 'in-stock'}
                        onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        {stockStatuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Min Stock Level</label>
                      <input
                        type="number"
                        value={formData.minStockLevel || ''}
                        onChange={(e) => handleInputChange('minStockLevel', parseInt(e.target.value) || 0)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${errors.minStockLevel ? 'border-red-500' : ''}`}
                        min="0"
                      />
                      {errors.minStockLevel && <p className="mt-1 text-sm text-red-600">{errors.minStockLevel}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Stock Level</label>
                      <input
                        type="number"
                        value={formData.maxStockLevel || ''}
                        onChange={(e) => handleInputChange('maxStockLevel', parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost Price</label>
                    <input
                      type="number"
                      value={formData.costPrice || ''}
                      onChange={(e) => handleInputChange('costPrice', parseFloat(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-6 space-y-4">
                <h4 className="text-md font-medium text-gray-900 border-b pb-2">Product Details</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Short product tagline"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Product description"
                  />
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specifications</label>
                  <div className="mt-2 space-y-2">
                    {Object.entries(formData.specs || {}).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            const newSpecs = { ...formData.specs };
                            delete newSpecs[key];
                            newSpecs[e.target.value] = value;
                            setFormData(prev => ({ ...prev, specs: newSpecs }));
                          }}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Spec name"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleSpecsChange(key, e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Spec value"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleSpecsChange('', '')}
                      className="flex items-center text-sm text-primary-600 hover:text-primary-500"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Specification
                    </button>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Product Images</h4>
                
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        {image.url ? (
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <PhotoIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Alt text"
                        />
                      </div>
                      
                      <div className="flex-shrink-0 space-y-2">
                        {!image.isMain && (
                          <button
                            type="button"
                            onClick={() => setMainImage(index)}
                            className="block w-full text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded hover:bg-primary-200"
                          >
                            Set Main
                          </button>
                        )}
                        {image.isMain && (
                          <span className="block w-full text-xs bg-green-100 text-green-700 px-2 py-1 rounded text-center">
                            Main Image
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="block w-full text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                        >
                          <TrashIcon className="h-3 w-3 mx-auto" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addImage}
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Add Image</span>
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Product is active
                  </label>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 flex items-center text-red-600">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{errors.submit}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

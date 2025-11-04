"use client";

import { useState, useEffect } from 'react';
import { 
  XMarkIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string | null;
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
  Dimensions?: { length: number; width: number; height: number; unit: string };
}

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit?: (product: Product) => void;
}

export default function ViewProductModal({ isOpen, onClose, product, onEdit }: ViewProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get all images - must be before conditional return
  const allImages = product?.images && product.images.length > 0 ? product.images : [];
  
  // Reset selected image when product changes - must be before conditional return
  useEffect(() => {
    if (!product) return;
    
    const images = product.images && product.images.length > 0 ? product.images : [];
    if (images.length > 0) {
      const mainIndex = images.findIndex(img => img.isMain);
      setSelectedImageIndex(mainIndex >= 0 ? mainIndex : 0);
    } else {
      setSelectedImageIndex(0);
    }
  }, [product?.id, product?.images]);

  // Early return after all hooks
  if (!isOpen || !product) return null;

  // Get main image (for initial display)
  const mainImage = allImages.length > 0 
    ? (allImages.find(img => img.isMain) || allImages[0])
    : null;

  // Get currently selected image
  const selectedImage = allImages[selectedImageIndex] || mainImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <div className="flex space-x-2">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEdit(product);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Images */}
              <div className="space-y-4">
                {/* Main/Selected Image */}
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.alt || product.name}
                      className="w-full h-96 object-contain bg-gray-100 rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                      }}
                    />
                    {selectedImage.isMain && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Main Image
                      </span>
                    )}
                    {/* Navigation arrows for multiple images */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => prev > 0 ? prev - 1 : allImages.length - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-opacity"
                          aria-label="Previous image"
                        >
                          <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => prev < allImages.length - 1 ? prev + 1 : 0)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-opacity"
                          aria-label="Next image"
                        >
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                        {/* Image counter */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
                          {selectedImageIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}

                {/* Image Thumbnails - Show all images */}
                {allImages.length > 1 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      All Images ({allImages.length})
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative rounded-lg border-2 overflow-hidden transition-all ${
                            index === selectedImageIndex 
                              ? 'border-primary-500 ring-2 ring-primary-200' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt || `${product.name} ${index + 1}`}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Error';
                            }}
                          />
                          {image.isMain && (
                            <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                              Main
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Product Information */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Basic Information</h4>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">SKU</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.SKU || 'Not set'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Category</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.category}</dd>
                    </div>
                    {product.subcategory && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Subcategory</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.subcategory}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Brand</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.brand}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Pricing */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Pricing</h4>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Price</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{product.price}</dd>
                    </div>
                    {product.discountedPrice && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Discounted Price</dt>
                        <dd className="mt-1 text-lg font-semibold text-primary-600">{product.discountedPrice}</dd>
                      </div>
                    )}
                    {product.costPrice !== undefined && product.costPrice !== null && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Cost Price</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.costPrice}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Inventory */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Inventory</h4>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Stock Quantity</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.stockQuantity ?? 0}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Stock Status</dt>
                      <dd className="mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.stockStatus === 'in-stock' ? 'bg-green-100 text-green-800' :
                          product.stockStatus === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                          product.stockStatus === 'out-of-stock' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.stockStatus ? product.stockStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
                        </span>
                      </dd>
                    </div>
                    {product.minStockLevel !== undefined && product.minStockLevel !== null && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Min Stock Level</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.minStockLevel}</dd>
                      </div>
                    )}
                    {product.maxStockLevel !== undefined && product.maxStockLevel !== null && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Max Stock Level</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.maxStockLevel}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Product Details */}
                {product.tagline && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Tagline</h4>
                    <p className="text-sm text-gray-900">{product.tagline}</p>
                  </div>
                )}

                {product.description && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Description</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{product.description}</p>
                  </div>
                )}

                {/* Specifications */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Specifications</h4>
                    <dl className="grid grid-cols-1 gap-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-sm font-medium text-gray-500">{key}</dt>
                          <dd className="text-sm text-gray-900 text-right">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Physical Attributes */}
                {(product.weight !== undefined || product.Dimensions) && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Physical Attributes</h4>
                    <dl className="grid grid-cols-1 gap-4">
                      {product.weight !== undefined && product.weight !== null && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Weight</dt>
                          <dd className="mt-1 text-sm text-gray-900">{product.weight} kg</dd>
                        </div>
                      )}
                      {product.Dimensions && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {product.Dimensions.length} × {product.Dimensions.width} × {product.Dimensions.height} {product.Dimensions.unit || 'cm'}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


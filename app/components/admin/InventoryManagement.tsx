"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import { processProductImages } from '@/app/lib/admin/image-mapping';
import Layout from './Layout'
import EditInventoryModal from './EditInventoryModal'
import InventoryTransferModal from './InventoryTransferModal'
import { TableSkeleton, StatsSkeleton } from '@/app/components/ui/Skeletons'

interface ProductVariant {
  id: number;
  sku: string;
  attributes?: Record<string, string>;
  specs?: Record<string, string>;
  price?: number;
  discountedPrice?: number;
  stockQuantity: number;
  stockStatus: string;
  minStockLevel?: number;
  maxStockLevel?: number;
  images?: Array<{ url: string; alt?: string }>;
  isActive: boolean;
}

interface Product {
  id: number;
  documentId?: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  price: string | number;
  images: Array<{ url: string; alt: string; isMain?: boolean }>;
  SKU?: string | null;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  stockStatus: string;
  basePrice: number;
  weight: number;
  Dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  subcategory?: string | null;
  variants?: ProductVariant[];
}

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transferringProduct, setTransferringProduct] = useState<Product | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [warehouseInventory, setWarehouseInventory] = useState<Record<number, { quantity: number }>>({});
  const [warehouseVariantInventory, setWarehouseVariantInventory] = useState<Record<string, { quantity: number }>>({});
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    totalCost: 0
  });
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (selectedWarehouse) {
      fetchWarehouseInventory(selectedWarehouse);
    } else {
      setWarehouseInventory({});
      setWarehouseVariantInventory({});
    }
  }, [selectedWarehouse]);

  const fetchWarehouses = async () => {
    try {
      const response = await api.getWarehouses({ isActive: true }) as { data?: any[] };
      setWarehouses(response.data || []);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchWarehouseInventory = async (warehouseId: number) => {
    try {
      const response = await api.getWarehouseInventory(warehouseId) as { data?: Array<{ productId: number; variantId?: number; quantity: number }> };
      const inventoryMap: Record<number, { quantity: number }> = {};
      const variantInventoryMap: Record<string, { quantity: number }> = {};
      
      (response.data || []).forEach((item: any) => {
        if (item.variantId) {
          // Track variant inventory by "productId-variantId" key
          const key = `${item.productId}-${item.variantId}`;
          variantInventoryMap[key] = { quantity: item.quantity || 0 };
        } else {
          // Track product inventory
          inventoryMap[item.productId] = { quantity: item.quantity || 0 };
        }
      });
      
      setWarehouseInventory(inventoryMap);
      setWarehouseVariantInventory(variantInventoryMap);
    } catch (error) {
      console.error('Error fetching warehouse inventory:', error);
      setWarehouseInventory({});
      setWarehouseVariantInventory({});
    }
  };

  useEffect(() => {
    filterProducts();
    calculateStats();
  }, [products, searchTerm, selectedCategory, selectedSubcategory, selectedBrand, filterStatus, selectedWarehouse, warehouseInventory, warehouseVariantInventory]);

  const parsePrice = (rawPrice: string | number | undefined | null): number => {
    if (rawPrice == null) return 0;
    if (typeof rawPrice === 'number') return rawPrice;
    const cleaned = rawPrice.toString().replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const computeStockStatus = (quantity: number, minLevel: number, existingStatus?: string | null): string => {
    if (existingStatus) return existingStatus;
    if (quantity <= 0) return 'out-of-stock';
    if (minLevel > 0 && quantity <= minLevel) return 'low-stock';
    return 'in-stock';
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch products from backend API
      const response = await api.getProducts({ pagination: { page: 1, pageSize: 100 } });
      
      // Transform backend data to match our interface
      const transformedProducts: Product[] = await Promise.all((response.data || []).map(async (product: any) => {
        const productData = product;

        // Use enhanced image processing that prioritizes local images
        const images = processProductImages(productData);

        // Extract brand name (handle both string and object)
        const brand =
          typeof productData.brand === 'object' && productData.brand !== null
            ? (productData.brand.name || String(productData.brand))
            : productData.brand || null;

        // Extract category name (handle both string and object)
        const category =
          typeof productData.category === 'object' && productData.category !== null
            ? (productData.category.name || String(productData.category))
            : productData.category || null;

        // Extract subcategory name (handle both string and object)
        const subcategory =
          typeof productData.subcategory === 'object' && productData.subcategory !== null
            ? (productData.subcategory.name || String(productData.subcategory))
            : productData.subcategory || null;

        const rawPrice: string | number | undefined =
          (productData as any).price ?? (productData as any).sellingPrice;

        const stockQuantity = productData.stockQuantity ?? 0;
        const minStockLevel = productData.minStockLevel ?? 0;
        const maxStockLevel = productData.maxStockLevel ?? Math.max(stockQuantity, minStockLevel, 1);

        const stockStatus = computeStockStatus(
          stockQuantity,
          minStockLevel,
          productData.stockStatus || null
        );

        const productId = typeof product.id === 'number'
          ? product.id
          : typeof product.id === 'string'
            ? parseInt(product.id, 10)
            : typeof productData.id === 'number'
              ? productData.id
              : parseInt(productData.id || '0', 10);

        // Fetch variants for this product
        let variants: ProductVariant[] = [];
        try {
          const variantsResponse = await api.getProductVariants(productId);
          variants = (variantsResponse.data || []).map((variant: any) => ({
            id: variant.id,
            sku: variant.sku || variant.SKU || '',
            attributes: variant.attributes || variant.specs || {},
            specs: variant.specs || variant.attributes || {},
            price: variant.price,
            discountedPrice: variant.discountedPrice,
            stockQuantity: variant.stockQuantity || 0,
            stockStatus: variant.stockStatus || 'in-stock',
            minStockLevel: variant.minStockLevel,
            maxStockLevel: variant.maxStockLevel,
            images: variant.images || [],
            isActive: variant.isActive !== false,
          }));
        } catch (error) {
          // Variants are optional, silently fail
          console.debug(`No variants found for product ${productId}`);
        }

        return {
          id: productId,
          documentId: product.documentId || productData.documentId,
          name: productData.name || '',
          brand,
          category,
          price: rawPrice ?? 0,
          images,
          SKU: productData.SKU || productData.sku || null,
          stockQuantity,
          minStockLevel,
          maxStockLevel,
          stockStatus,
          basePrice: parsePrice(productData.basePrice ?? 0),
          weight: parsePrice(productData.weight ?? 0),
          Dimensions:
            productData.Dimensions ||
            productData.dimensions || {
              length: 0,
              width: 0,
              height: 0,
              unit: 'cm',
            },
          subcategory,
          variants: variants.length > 0 ? variants : undefined,
        };
      }));

      const filteredProducts = transformedProducts.filter((p: Product) => p.name); // Filter out products without a name

      setProducts(filteredProducts);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      const message =
        err?.message ||
        'Failed to load inventory. Please check your connection or try again later.';
      setError(message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.SKU?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (filterStatus) {
      filtered = filtered.filter(product => product.stockStatus === filterStatus);
    }

    setFilteredProducts(filtered);
  };

  const calculateStats = () => {
    const totalProducts = products.length;
    
    const getProductQuantity = (product: Product): number => {
      // If product has variants, sum variant quantities
      if (product.variants && product.variants.length > 0) {
        return product.variants.reduce((sum, variant) => {
          if (selectedWarehouse) {
            const key = `${product.id}-${variant.id}`;
            const variantQty = warehouseVariantInventory[key]?.quantity;
            if (variantQty !== undefined) {
              return sum + variantQty;
            }
          }
          return sum + (variant.stockQuantity || 0);
        }, 0);
      }
      
      // Otherwise use product stock
      if (selectedWarehouse && warehouseInventory[product.id]) {
        return warehouseInventory[product.id].quantity;
      }
      return product.stockQuantity;
    };

    const getVariantQuantity = (product: Product, variant: ProductVariant): number => {
      if (selectedWarehouse) {
        const key = `${product.id}-${variant.id}`;
        const variantQty = warehouseVariantInventory[key]?.quantity;
        if (variantQty !== undefined) {
          return variantQty;
        }
      }
      return variant.stockQuantity || 0;
    };

    const lowStock = products.filter(p => {
      if (p.variants && p.variants.length > 0) {
        // Check if any variant is low stock
        return p.variants.some(variant => {
          const quantity = getVariantQuantity(p, variant);
          const minLevel = variant.minStockLevel || p.minStockLevel;
          return computeStockStatus(quantity, minLevel) === 'low-stock';
        });
      }
      const quantity = getProductQuantity(p);
      return computeStockStatus(quantity, p.minStockLevel) === 'low-stock';
    }).length;
    
    const outOfStock = products.filter(p => {
      if (p.variants && p.variants.length > 0) {
        // Check if all variants are out of stock
        return p.variants.every(variant => {
          const quantity = getVariantQuantity(p, variant);
          const minLevel = variant.minStockLevel || p.minStockLevel;
          return computeStockStatus(quantity, minLevel) === 'out-of-stock';
        });
      }
      const quantity = getProductQuantity(p);
      return computeStockStatus(quantity, p.minStockLevel) === 'out-of-stock';
    }).length;
    
    const totalValue = products.reduce((sum, product) => {
      if (product.variants && product.variants.length > 0) {
        // Sum variant values
        return sum + product.variants.reduce((variantSum, variant) => {
          const price = parsePrice(variant.price || product.price);
          const quantity = getVariantQuantity(product, variant);
          return variantSum + price * quantity;
        }, 0);
      }
      const price = parsePrice(product.price);
      const quantity = getProductQuantity(product);
      return sum + price * quantity;
    }, 0);
    
    const totalCost = products.reduce((sum, product) => {
      if (product.variants && product.variants.length > 0) {
        // Sum variant costs (use variant price or product basePrice)
        return sum + product.variants.reduce((variantSum, variant) => {
          const costPrice = parsePrice(variant.price || product.basePrice);
          const quantity = getVariantQuantity(product, variant);
          return variantSum + costPrice * quantity;
        }, 0);
      }
      const quantity = getProductQuantity(product);
      return sum + (product.basePrice * quantity);
    }, 0);

    setStats({
      totalProducts,
      lowStock,
      outOfStock,
      totalValue,
      totalCost
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'low-stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'out-of-stock':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CubeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleProductExpansion = (productId: number) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const formatVariantAttributes = (variant: ProductVariant): string => {
    const attrs = variant.attributes || variant.specs || {};
    return Object.entries(attrs)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ') || 'No attributes';
  };

  if (loading) {
    return (
      <Layout currentPage="Inventory">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <StatsSkeleton />
          <TableSkeleton rows={10} columns={6} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="Inventory" pageTitle="Inventory Management">
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There was a problem loading inventory data.
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mt-1 text-sm text-gray-500">
            Monitor stock levels and inventory value ({filteredProducts.length} products)
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <Link
            href="/admin/inventory/warehouses"
            className="btn-secondary flex items-center"
          >
            <BuildingOfficeIcon className="w-5 h-5 mr-2" />
            Manage Warehouses
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center">
            <CubeIcon className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Inventory Value</p>
              <p className="text-2xl font-semibold text-green-600">K{stats.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          {/* Search */}
          <div className="md:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, SKU, brand, category..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSelectedSubcategory('') // Reset subcategory when category changes
              }}
            >
              <option value="">All Categories</option>
              {Array.from(
                new Set(
                  products
                    .map(p => p.category)
                    .filter((category): category is string => typeof category === 'string' && category.trim().length > 0)
                )
              ).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              className="input-field"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">All Subcategories</option>
              {Array.from(
                new Set(
                  products
                    .map(p => p.subcategory)
                    .filter((sub): sub is string => typeof sub === 'string' && sub.trim().length > 0)
                )
              )
                .filter(sub =>
                  !selectedCategory ||
                  products.some(p => p.category === selectedCategory && p.subcategory === sub)
                )
                .map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
            </select>
          </div>

          {/* More Filters Button */}
          <div className="md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 select-none absolute">
              More Filters
            </label>
            <div className="relative group">
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="btn-secondary w-full md:w-[42px] h-[42px] flex items-center justify-center p-0"
              >
                <FunnelIcon className="w-5 h-5" />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                More Filters
              </span>
            </div>
          </div>

          {/* Export Button */}
          <div className="md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 select-none">
              Export
            </label>
            <div className="relative group">
              <button 
                className="btn-secondary w-full md:w-[42px] h-[42px] flex items-center justify-center p-0"
              >
                <ChartBarIcon className="w-5 h-5" />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Export Report
              </span>
            </div>
          </div>
        </div>

        {/* More Filters Section */}
        {showMoreFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              {/* Brand Filter */}
              <div className="md:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  className="input-field"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {Array.from(
                    new Set(
                      products
                        .map(p => p.brand)
                        .filter((brand): brand is string => typeof brand === 'string' && brand.trim().length > 0)
                    )
                  ).map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Warehouse Filter */}
              <div className="md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warehouse
                </label>
                <select
                  className="input-field"
                  value={selectedWarehouse || ''}
                  onChange={(e) => setSelectedWarehouse(e.target.value ? parseInt(e.target.value, 10) : null)}
                >
                  <option value="">All Warehouses</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <select
                  className="input-field"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Stock Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Product</th>
                <th className="table-header">SKU</th>
                <th className="table-header">Stock Level</th>
                <th className="table-header">Status</th>
                <th className="table-header">Base Price</th>
                <th className="table-header">Inventory Value</th>
                <th className="table-header">Weight</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const hasVariants = product.variants && product.variants.length > 0;
                const isExpanded = expandedProducts.has(product.id);
                
                // Calculate product quantity (sum of variants if has variants)
                let quantity: number;
                if (hasVariants) {
                  quantity = product.variants!.reduce((sum, variant) => {
                    if (selectedWarehouse) {
                      const key = `${product.id}-${variant.id}`;
                      const variantQty = warehouseVariantInventory[key]?.quantity;
                      if (variantQty !== undefined) {
                        return sum + variantQty;
                      }
                    }
                    return sum + (variant.stockQuantity || 0);
                  }, 0);
                } else {
                  quantity = selectedWarehouse && warehouseInventory[product.id] 
                    ? warehouseInventory[product.id].quantity 
                    : product.stockQuantity;
                }
                
                const stockStatus = computeStockStatus(quantity, product.minStockLevel, product.stockStatus);
                
                return (
                  <React.Fragment key={product.id}>
                    {/* Main Product Row */}
                    <tr
                      className="hover:bg-gray-50"
                    >
                      <td className="table-cell max-w-xs">
                        <div className="flex items-center">
                          {hasVariants && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProductExpansion(product.id);
                              }}
                              className="mr-2 p-1 hover:bg-gray-200 rounded"
                            >
                              {isExpanded ? (
                                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                              ) : (
                                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                              )}
                            </button>
                          )}
                          <img
                            src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/40x40?text=No+Image'}
                            alt={product.images && product.images.length > 0 ? product.images[0].alt : product.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/40x40?text=Error';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate" title={product.name}>
                              {product.name}
                              {hasVariants && (
                                <span className="ml-2 text-xs text-gray-500 font-normal">
                                  ({product.variants!.length} variant{product.variants!.length !== 1 ? 's' : ''})
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 truncate">{product.brand} • {product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell font-mono text-sm">
                        {product.SKU || 'N/A'}
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className={`h-2 rounded-full ${
                                stockStatus === 'out-of-stock' ? 'bg-red-500' :
                                stockStatus === 'low-stock' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{
                                width: `${Math.min(100, (quantity / product.maxStockLevel) * 100)}%`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quantity}/{product.maxStockLevel}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          {getStatusIcon(stockStatus)}
                          <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(stockStatus)}`}>
                            {stockStatus.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">K{product.basePrice.toLocaleString()}</td>
                      <td className="table-cell">
                        {hasVariants ? (
                          <span className="text-sm text-gray-500">
                            K{product.variants!.reduce((sum, variant) => {
                              const variantQty = selectedWarehouse 
                                ? warehouseVariantInventory[`${product.id}-${variant.id}`]?.quantity ?? variant.stockQuantity
                                : variant.stockQuantity;
                              const price = parsePrice(variant.price || product.basePrice);
                              return sum + (price * variantQty);
                            }, 0).toLocaleString()}
                          </span>
                        ) : (
                          `K${(product.basePrice * quantity).toLocaleString()}`
                        )}
                      </td>
                      <td className="table-cell">{product.weight > 0 ? `${product.weight} kg` : '-'}</td>
                      <td className="table-cell">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                            setIsEditModalOpen(true);
                          }}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    
                    {/* Variant Rows */}
                    {hasVariants && isExpanded && product.variants!.map((variant) => {
                      const variantQuantity = selectedWarehouse 
                        ? warehouseVariantInventory[`${product.id}-${variant.id}`]?.quantity ?? variant.stockQuantity
                        : variant.stockQuantity;
                      const variantMinLevel = variant.minStockLevel || product.minStockLevel;
                      const variantMaxLevel = variant.maxStockLevel || product.maxStockLevel;
                      const variantStockStatus = computeStockStatus(variantQuantity, variantMinLevel, variant.stockStatus);
                      const variantPrice = parsePrice(variant.price || product.basePrice);
                      
                      return (
                        <tr
                          key={`${product.id}-${variant.id}`}
                          className="hover:bg-gray-50 bg-gray-25"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Create a temporary product object for variant editing
                            const variantProduct: Product = {
                              id: product.id,
                              documentId: product.documentId,
                              name: product.name,
                              brand: product.brand,
                              category: product.category,
                              price: variant.price || product.price,
                              images: (variant.images || product.images).map(img => ({
                                url: img.url,
                                alt: img.alt || product.name,
                                isMain: (img as any).isMain,
                              })),
                              SKU: variant.sku,
                              stockQuantity: variantQuantity,
                              minStockLevel: variantMinLevel,
                              maxStockLevel: variantMaxLevel,
                              stockStatus: variantStockStatus,
                              basePrice: variantPrice,
                              weight: product.weight,
                              Dimensions: product.Dimensions,
                              subcategory: product.subcategory,
                            };
                            setEditingProduct(variantProduct);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <td className="table-cell pl-12">
                            <div className="flex items-center">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                  {formatVariantAttributes(variant)}
                                </p>
                                <p className="text-xs text-gray-500">Variant</p>
                              </div>
                            </div>
                          </td>
                          <td className="table-cell font-mono text-sm">{variant.sku || 'N/A'}</td>
                          <td className="table-cell">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                <div 
                                  className={`h-2 rounded-full ${
                                    variantStockStatus === 'out-of-stock' ? 'bg-red-500' :
                                    variantStockStatus === 'low-stock' ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`}
                                  style={{
                                    width: `${Math.min(100, (variantQuantity / variantMaxLevel) * 100)}%`
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {variantQuantity}/{variantMaxLevel}
                              </span>
                            </div>
                          </td>
                          <td className="table-cell">
                            <div className="flex items-center">
                              {getStatusIcon(variantStockStatus)}
                              <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(variantStockStatus)}`}>
                                {variantStockStatus.replace('-', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="table-cell">K{variantPrice.toLocaleString()}</td>
                          <td className="table-cell">
                            K{(variantPrice * variantQuantity).toLocaleString()}
                          </td>
                          <td className="table-cell">-</td>
                          <td className="table-cell">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const variantProduct: Product = {
                                  id: product.id,
                                  documentId: product.documentId,
                                  name: product.name,
                                  brand: product.brand,
                                  category: product.category,
                                  price: variant.price || product.price,
                                  images: (variant.images || product.images).map(img => ({
                                    url: img.url,
                                    alt: img.alt || product.name,
                                    isMain: (img as any).isMain,
                                  })),
                                  SKU: variant.sku,
                                  stockQuantity: variantQuantity,
                                  minStockLevel: variantMinLevel,
                                  maxStockLevel: variantMaxLevel,
                                  stockStatus: variantStockStatus,
                                  basePrice: variantPrice,
                                  weight: product.weight,
                                  Dimensions: product.Dimensions,
                                  subcategory: product.subcategory,
                                };
                                setEditingProduct(variantProduct);
                                setIsEditModalOpen(true);
                              }}
                              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus ? 'Try adjusting your search or filter criteria.' : 'No inventory data available.'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Inventory Modal */}
      <EditInventoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        warehouseId={selectedWarehouse}
        warehouses={warehouses}
        onTransfer={(product) => {
          if (product && editingProduct) {
            // Ensure we pass the full product with all fields
            const fullProduct: Product = {
              ...editingProduct,
              ...product,
            };
            setTransferringProduct(fullProduct);
            setIsTransferModalOpen(true);
          }
        }}
        onSave={() => {
          fetchProducts();
        }}
      />

      {/* Stock Transfer Modal */}
      <InventoryTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          setTransferringProduct(null);
        }}
        product={transferringProduct}
        onSuccess={() => {
          fetchProducts();
        }}
      />
    </div>
    </Layout>
  );
}
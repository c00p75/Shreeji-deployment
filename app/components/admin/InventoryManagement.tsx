"use client";

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import { processProductImages } from '@/app/lib/admin/image-mapping';
import Layout from './Layout'

interface Product {
  id: number;
  documentId?: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  price: string;
  images: Array<{ url: string; alt: string; isMain?: boolean }>;
  SKU?: string | null;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  stockStatus: string;
  costPrice: number;
  weight: number;
  Dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  subcategory?: string | null;
}

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    totalCost: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
    calculateStats();
  }, [products, searchTerm, selectedCategory, selectedSubcategory, filterStatus]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch products from backend API
      const response = await api.getProducts({ pagination: { page: 1, pageSize: 100 } });
      
      // Transform backend data to match our interface
      const transformedProducts: Product[] = (response.data || []).map((product: any) => {
        // Handle backend structure - products are returned directly
        const productData = product;
        
        // Use enhanced image processing that prioritizes local images
        const images = processProductImages(productData);

        return {
          id: product.id || productData.id,
          documentId: product.documentId || productData.documentId,
          name: productData.name || '',
          brand: productData.brand || null,
          category: productData.category || null,
          price: productData.price || '',
          images: images,
          SKU: productData.SKU || productData.sku || null,
          stockQuantity: productData.stockQuantity || 0,
          minStockLevel: productData.minStockLevel || 0,
          maxStockLevel: productData.maxStockLevel || 0,
          stockStatus: productData.stockStatus || 'in-stock',
          costPrice: productData.costPrice || 0,
          weight: productData.weight || 0,
          Dimensions: productData.Dimensions || productData.dimensions || { length: 0, width: 0, height: 0, unit: 'cm' },
          subcategory: productData.subcategory || null
        };
      }).filter((p: Product) => p.name); // Filter out products without a name
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data
      const mockProducts: Product[] = [
        {
          id: 2,
          documentId: "qrvoxut4vvgb4y7ly5n7hk2n",
          name: "HP Envy MOVE",
          brand: "HP",
          category: "Computers",
          price: "K30,000",
          SKU: "HP-HPENVY-665",
          stockQuantity: 40,
          minStockLevel: 12,
          maxStockLevel: 80,
          stockStatus: "in-stock",
          costPrice: 21000,
          weight: 15.5,
          Dimensions: { length: 60, width: 40, height: 15, unit: "cm" }
        }
      ];
      setProducts(mockProducts);
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

    if (filterStatus) {
      filtered = filtered.filter(product => product.stockStatus === filterStatus);
    }

    setFilteredProducts(filtered);
  };

  const calculateStats = () => {
    const totalProducts = products.length;
    const lowStock = products.filter(p => p.stockStatus === 'low-stock').length;
    const outOfStock = products.filter(p => p.stockStatus === 'out-of-stock').length;
    
    const totalValue = products.reduce((sum, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + (price * product.stockQuantity);
    }, 0);
    
    const totalCost = products.reduce((sum, product) => {
      return sum + (product.costPrice * product.stockQuantity);
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

  if (loading) {
    return (
      <Layout currentPage="Inventory">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="Inventory">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor stock levels and inventory value ({filteredProducts.length} products)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center">
            <CubeIcon className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5">
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
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

          {/* Category Filter */}
          <select
            className="input-field"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedSubcategory('') // Reset subcategory when category changes
            }}
          >
            <option value="">All Categories</option>
            {Array.from(new Set(products.map(p => p.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Subcategory Filter */}
          <select
            className="input-field"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">All Subcategories</option>
            {Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)))
              .filter(sub => !selectedCategory || products.some(p => p.category === selectedCategory && p.subcategory === sub))
              .map(subcategory => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
          </select>

          {/* Status Filter */}
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

          {/* Export Button */}
          <button className="btn-secondary">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
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
                <th className="table-header">Cost Price</th>
                <th className="table-header">Inventory Value</th>
                <th className="table-header">Weight</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/40x40?text=No+Image'}
                        alt={product.images && product.images.length > 0 ? product.images[0].alt : product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/40x40?text=Error';
                        }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell font-mono text-sm">{product.SKU || 'N/A'}</td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${
                            product.stockStatus === 'out-of-stock' ? 'bg-red-500' :
                            product.stockStatus === 'low-stock' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{
                            width: `${Math.min(100, (product.stockQuantity / product.maxStockLevel) * 100)}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {product.stockQuantity}/{product.maxStockLevel}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      {getStatusIcon(product.stockStatus)}
                      <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(product.stockStatus)}`}>
                        {product.stockStatus.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">K{product.costPrice.toLocaleString()}</td>
                  <td className="table-cell">
                    K{(product.costPrice * product.stockQuantity).toLocaleString()}
                  </td>
                  <td className="table-cell">{product.weight} kg</td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 text-sm">
                        Adjust Stock
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
    </div>
    </Layout>
  );
}
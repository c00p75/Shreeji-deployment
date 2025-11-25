"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  XMarkIcon,
  PhotoIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { processProductImages } from '@/app/lib/admin/image-mapping';
import api from '@/app/lib/admin/api';
import ModernProductShowcase from '../products/ModernProductShowcase';

interface Product {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  category: string | number; // Can be category ID (number) or legacy string
  subcategory: string | number; // Can be subcategory ID (number) or legacy string
  brand: string | number; // Can be brand ID (number) or legacy string
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

// Component to handle spec input without losing focus
function SpecInput({ 
  specKey, 
  specValue, 
  onKeyChange, 
  onValueChange 
}: { 
  specKey: string; 
  specValue: any; 
  onKeyChange: (oldKey: string, newKey: string) => void;
  onValueChange: (key: string, value: string) => void;
}) {
  const [localKey, setLocalKey] = useState(specKey);
  const keyInputRef = useRef<HTMLInputElement>(null);

  // Update local key when specKey prop changes (e.g., when specs are reordered)
  useEffect(() => {
    if (keyInputRef.current !== document.activeElement) {
      setLocalKey(specKey);
    }
  }, [specKey]);

  const handleKeyBlur = () => {
    const newKey = localKey.trim();
    if (newKey !== specKey) {
      onKeyChange(specKey, newKey);
    } else if (!newKey) {
      // Remove if empty
      onKeyChange(specKey, '');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        ref={keyInputRef}
        type="text"
        value={localKey}
        onChange={(e) => setLocalKey(e.target.value)}
        onBlur={handleKeyBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="Spec name"
      />
      <input
        type="text"
        value={String(specValue || '')}
        onChange={(e) => onValueChange(specKey, e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="Spec value"
      />
    </div>
  );
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  
  // Modal states for adding/editing category/brand/subcategory
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [newBrandName, setNewBrandName] = useState('');

  // Category and Subcategory interfaces
  interface Category {
    id: number | string;
    documentId?: string;
    name: string;
    slug?: string;
  }

  interface Subcategory {
    id: number | string;
    documentId?: string;
    name: string;
    slug?: string;
    category: number | Category | string;
  }

  // Brands fetched from API with logo support
  interface Brand {
    id: number | string;
    documentId?: string;
    name: string;
    logo?: { url: string; id: number } | null;
    logoUrl?: string | null;
  }

  // Categories and subcategories fetched from API
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

  const stockStatuses = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'discontinued', label: 'Discontinued' }
  ];

  const generateSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  useEffect(() => {
    if (product && isOpen) {
      // Handle brand - if it's an object (relation), extract the ID
      let brandValue: string | number = product.brand;
      if (product.brand && typeof product.brand === 'object') {
        // Brand is a relation object, extract ID
        brandValue = (product.brand as any).id || (product.brand as any).data?.id || '';
      } else if (typeof product.brand === 'number') {
        // Brand is already an ID
        brandValue = product.brand;
      }

      // Handle category - if it's an object (relation), extract the ID
      let categoryValue: string | number = product.category;
      if (product.category && typeof product.category === 'object') {
        // Category is a relation object, extract ID
        categoryValue = (product.category as any).id || (product.category as any).data?.id || '';
      } else if (typeof product.category === 'number') {
        // Category is already an ID
        categoryValue = product.category;
      }

      // Handle subcategory - if it's an object (relation), extract the ID
      let subcategoryValue: string | number | undefined = product.subcategory;
      if (product.subcategory && typeof product.subcategory === 'object') {
        // Subcategory is a relation object, extract ID
        subcategoryValue = (product.subcategory as any).id || (product.subcategory as any).data?.id || '';
      } else if (typeof product.subcategory === 'number') {
        // Subcategory is already an ID
        subcategoryValue = product.subcategory;
      }

      setFormData({
        ...product,
        brand: brandValue,
        category: categoryValue,
        subcategory: subcategoryValue,
        specs: product.specs || {},
        Dimensions: product.Dimensions || { length: 0, width: 0, height: 0, unit: 'cm' },
        SKU: product.SKU || `SKU-${Date.now()}`,
        stockQuantity: product.stockQuantity || 0
      });
      setErrors({});
      // Find the main image index or default to 0
      const mainIndex = product.images?.findIndex(img => img.isMain) ?? 0;
      setMainImageIndex(mainIndex >= 0 ? mainIndex : 0);
    }
  }, [product, isOpen]);

  // Fetch brands from API on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true);
      try {
        const response = await api.getBrands({ populate: ['logo'] });
        const brandsData = response.data.map((brand: any) => {
          const brandData = brand.attributes || brand;
          return {
            id: brand.id || brand.documentId,
            documentId: brand.documentId,
            name: brandData.name || '',
            logo: brandData.logo?.data
              ? {
                  url: brandData.logo.data.attributes?.url || brandData.logo.data.url,
                  id: brandData.logo.data.id,
                }
              : null,
            logoUrl: brandData.logoUrl || null,
          };
        });
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
        // Fallback to empty array
        setBrands([]);
      } finally {
        setLoadingBrands(false);
      }
    };

    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  // When brands are loaded, map any existing brand names to their IDs so the select can prefill
  useEffect(() => {
    if (!isOpen || !product || brands.length === 0) {
      return;
    }

    setFormData((prev) => {
      if (!prev.brand) {
        return prev;
      }

      const currentValue =
        typeof prev.brand === 'number' ? prev.brand.toString() : prev.brand;
      if (!currentValue.trim()) {
        return prev;
      }

      const alreadyMatches = brands.some(
        (brand) =>
          brand.id?.toString() === currentValue ||
          brand.documentId?.toString() === currentValue,
      );
      if (alreadyMatches) {
        return prev;
      }

      const matchedBrand = brands.find(
        (brand) => brand.name?.toLowerCase() === currentValue.toLowerCase(),
      );

      if (!matchedBrand) {
        return prev;
      }

      const normalizedValue =
        matchedBrand.id?.toString() ??
        matchedBrand.documentId?.toString() ??
        currentValue;

      if (!normalizedValue || normalizedValue === currentValue) {
        return prev;
      }

      return { ...prev, brand: normalizedValue };
    });
  }, [brands, isOpen, product]);

  // Fetch categories by extracting unique categories from existing products
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        // Fetch products to extract unique categories
        const response = await api.getProducts({
          pagination: { page: 1, pageSize: 1000 },
        });

        const uniqueCategories = new Set<string>();
        const productsArray = response.data || [];

        productsArray.forEach((product: any) => {
          const productData = product.attributes || product;
          const category = productData.category;
          if (category && typeof category === 'string' && category.trim()) {
            uniqueCategories.add(category.trim());
          }
        });

        const categoriesData = Array.from(uniqueCategories).map((categoryName) => ({
          id: categoryName,
          documentId: categoryName,
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Fetch subcategories when category changes
  // Since subcategories aren't directly linked to categories, we extract them from products
  useEffect(() => {
    const fetchSubcategories = async () => {
      const categoryName = formData.category;

      if (!categoryName || typeof categoryName !== 'string') {
        setSubcategories([]);
        return;
      }

      setLoadingSubcategories(true);
      try {
        // Fetch all subcategories
        const subcategoriesResponse = await api.getSubcategories();
        const allSubcategories = subcategoriesResponse.data || [];

        // Fetch products with the selected category to find used subcategories
        const productsResponse = await api.getProducts({
          pagination: { page: 1, pageSize: 1000 },
          filters: { category: categoryName },
        });

        const productsArray = productsResponse.data || [];
        const usedSubcategoryIds = new Set<number>();

        productsArray.forEach((product: any) => {
          const productData = product.attributes || product;
          if (productData.subcategory) {
            if (typeof productData.subcategory === 'object' && productData.subcategory.id) {
              usedSubcategoryIds.add(productData.subcategory.id);
            } else if (typeof productData.subcategory === 'number') {
              usedSubcategoryIds.add(productData.subcategory);
            } else if (typeof productData.subcategoryId === 'number') {
              usedSubcategoryIds.add(productData.subcategoryId);
            }
          } else if (productData.subcategoryId) {
            usedSubcategoryIds.add(productData.subcategoryId);
          }
        });

        const filteredSubcategories = allSubcategories
          .filter((subcategory: any) => {
            const subcategoryId = subcategory.id || subcategory.documentId;
            return usedSubcategoryIds.size === 0 || usedSubcategoryIds.has(subcategoryId);
          })
          .map((subcategory: any) => ({
            id: subcategory.id,
            documentId: subcategory.id?.toString(),
            name: subcategory.name || '',
            slug: subcategory.urlPath || subcategory.slug || null,
            category: categoryName,
          }));

        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubcategories([]);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    if (isOpen && formData.category) {
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [isOpen, formData.category]);

  useEffect(() => {
    if (!isOpen || subcategories.length === 0) {
      return;
    }

    setFormData((prev) => {
      if (!prev.subcategory) {
        return prev;
      }

      const currentValue =
        typeof prev.subcategory === 'number'
          ? prev.subcategory.toString()
          : prev.subcategory;
      if (!currentValue.trim()) {
        return prev;
      }

      const alreadyMatches = subcategories.some(
        (subcategory) =>
          subcategory.id?.toString() === currentValue ||
          subcategory.documentId?.toString() === currentValue,
      );
      if (alreadyMatches) {
        return prev;
      }

      const matchedSubcategory = subcategories.find(
        (subcategory) => subcategory.name?.toLowerCase() === currentValue.toLowerCase(),
      );

      if (!matchedSubcategory) {
        return prev;
      }

      const normalizedValue =
        matchedSubcategory.id?.toString() ??
        matchedSubcategory.documentId?.toString() ??
        currentValue;

      if (!normalizedValue || normalizedValue === currentValue) {
        return prev;
      }

      return { ...prev, subcategory: normalizedValue };
    });
  }, [subcategories, isOpen]);

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
    // Adjust mainImageIndex if needed
    if (updatedImages.length > 0) {
      if (index === mainImageIndex) {
        // If we removed the main image, set the first image as main
        setMainImageIndex(0);
      updatedImages[0].isMain = true;
      } else if (index < mainImageIndex) {
        // If we removed an image before the main image, adjust the index
        setMainImageIndex(mainImageIndex - 1);
      }
    } else {
      // No images left
      setMainImageIndex(0);
    }
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const setMainImage = (index: number) => {
    setMainImageIndex(index);
    const updatedImages = formData.images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  // Handle category selection - check if "Add new" or "Edit" was selected
  const handleCategoryChange = (value: string) => {
    if (value === '__add_new__') {
      setShowAddCategoryModal(true);
    } else if (value.startsWith('__edit__')) {
      const categoryId = value.replace('__edit__', '');
      const category = categories.find(c => c.id.toString() === categoryId);
      if (category) {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setShowEditCategoryModal(true);
      }
    } else {
      // Convert to number if it's a numeric string (category ID)
      const categoryId = value && !isNaN(Number(value)) ? Number(value) : value;
      handleInputChange('category', categoryId);
      // Clear subcategory when category changes
      handleInputChange('subcategory', '');
    }
  };

  // Add new category
  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name is required' }));
      return;
    }
    
    if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newCategory: 'Category already exists' }));
      return;
    }

    const newCategory: Category = {
      id: trimmedName,
      documentId: trimmedName,
      name: trimmedName,
      slug: generateSlug(trimmedName),
    };

    setCategories(prev => [...prev, newCategory]);
    handleInputChange('category', trimmedName);
    
    setNewCategoryName('');
    setShowAddCategoryModal(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newCategory;
      return newErrors;
    });
  };

  // Update category
  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    const trimmedName = newCategoryName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name is required' }));
      return;
    }
    
    if (categories.some(cat => cat.id !== editingCategory.id && cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name already exists' }));
      return;
    }

    const updated: Category = {
      ...editingCategory,
      id: trimmedName,
      documentId: trimmedName,
      name: trimmedName,
      slug: generateSlug(trimmedName),
    };

    setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? updated : cat));
    
    if (formData.category === editingCategory.id || formData.category === editingCategory.id.toString()) {
      handleInputChange('category', trimmedName);
    }
    
    setNewCategoryName('');
    setEditingCategory(null);
    setShowEditCategoryModal(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newCategory;
      return newErrors;
    });
  };

  // Delete category
  const handleDeleteCategory = (categoryId: number | string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    
    if (formData.category === categoryId || formData.category === categoryId.toString()) {
      handleInputChange('category', '');
      handleInputChange('subcategory', '');
    }
    
    if (editingCategory && editingCategory.id === categoryId) {
      setShowEditCategoryModal(false);
      setEditingCategory(null);
      setNewCategoryName('');
    }
  };

  // Handle subcategory selection
  const handleSubcategoryChange = (value: string) => {
    if (value === '__add_new__') {
      if (!formData.category) {
        setErrors(prev => ({ ...prev, subcategory: 'Please select a category first' }));
        return;
      }
      setShowAddSubcategoryModal(true);
    } else if (value.startsWith('__edit__')) {
      const subcategoryId = value.replace('__edit__', '');
      const subcategory = subcategories.find(s => s.id.toString() === subcategoryId);
      if (subcategory) {
        setEditingSubcategory(subcategory);
        setNewSubcategoryName(subcategory.name);
        setShowEditSubcategoryModal(true);
      }
    } else {
      const subcategoryId = value && !isNaN(Number(value)) ? Number(value) : value;
      handleInputChange('subcategory', subcategoryId);
    }
  };

  // Add new subcategory
  const handleAddSubcategory = async () => {
    const trimmedName = newSubcategoryName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory name is required' }));
      return;
    }

    const categoryId = formData.category;
    if (!categoryId) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Please select a category first' }));
      return;
    }

    const categoryIdNum = typeof categoryId === 'string' && !isNaN(Number(categoryId))
      ? Number(categoryId)
      : categoryId;

    if (typeof categoryIdNum !== 'number') {
      setErrors(prev => ({ ...prev, newSubcategory: 'Invalid category selected' }));
      return;
    }

    if (subcategories.some(sub => 
      sub.name.toLowerCase() === trimmedName.toLowerCase() && 
      (typeof sub.category === 'number' ? sub.category : (sub.category as Category).id) === categoryIdNum
    )) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory already exists in this category' }));
      return;
    }

    try {
      const response = await api.createSubcategory({ 
        name: trimmedName,
        category: categoryIdNum
      }) as { data: any };
      const createdSubcategory = response.data;
      const subcategoryDataAttr = createdSubcategory.attributes || createdSubcategory;

      const newSubcategory: Subcategory = {
        id: createdSubcategory.id || createdSubcategory.documentId,
        documentId: createdSubcategory.documentId,
        name: subcategoryDataAttr.name || trimmedName,
        slug: subcategoryDataAttr.slug || null,
        category: categoryIdNum
      };

      setSubcategories(prev => [...prev, newSubcategory]);
      handleInputChange('subcategory', newSubcategory.id.toString());
      
      setNewSubcategoryName('');
      setShowAddSubcategoryModal(false);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.newSubcategory;
        return newErrors;
      });
    } catch (error: any) {
      console.error('Error creating subcategory:', error);
      setErrors(prev => ({ 
        ...prev, 
        newSubcategory: error.message || 'Failed to create subcategory. Please try again.' 
      }));
    }
  };

  // Update subcategory
  const handleUpdateSubcategory = async () => {
    if (!editingSubcategory) return;
    
    const trimmedName = newSubcategoryName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory name is required' }));
      return;
    }

    const categoryId = formData.category;
    const categoryIdNum = typeof categoryId === 'string' && !isNaN(Number(categoryId))
      ? Number(categoryId)
      : categoryId;

    if (typeof categoryIdNum !== 'number') {
      setErrors(prev => ({ ...prev, newSubcategory: 'Invalid category selected' }));
      return;
    }

    if (subcategories.some(sub => 
      sub.id !== editingSubcategory.id &&
      sub.name.toLowerCase() === trimmedName.toLowerCase() &&
      (typeof sub.category === 'number' ? sub.category : (sub.category as Category).id) === categoryIdNum
    )) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory name already exists in this category' }));
      return;
    }

    try {
      const response = await api.updateSubcategory(editingSubcategory.id, { 
        name: trimmedName,
        category: categoryIdNum
      }) as { data: any };
      const updatedSubcategory = response.data;
      const subcategoryDataAttr = updatedSubcategory.attributes || updatedSubcategory;

      const updated: Subcategory = {
        id: updatedSubcategory.id || updatedSubcategory.documentId,
        documentId: updatedSubcategory.documentId,
        name: subcategoryDataAttr.name || trimmedName,
        slug: subcategoryDataAttr.slug || null,
        category: categoryIdNum
      };

      setSubcategories(prev => prev.map(sub => sub.id === editingSubcategory.id ? updated : sub));
      
      if (formData.subcategory === editingSubcategory.id || formData.subcategory === editingSubcategory.id.toString()) {
        handleInputChange('subcategory', updated.id.toString());
      }
      
      setNewSubcategoryName('');
      setEditingSubcategory(null);
      setShowEditSubcategoryModal(false);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.newSubcategory;
        return newErrors;
      });
    } catch (error: any) {
      console.error('Error updating subcategory:', error);
      setErrors(prev => ({ 
        ...prev, 
        newSubcategory: error.message || 'Failed to update subcategory. Please try again.' 
      }));
    }
  };

  // Delete subcategory
  const handleDeleteSubcategory = async (subcategoryId: number | string) => {
    if (!confirm('Are you sure you want to delete this subcategory? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteSubcategory(subcategoryId);
      setSubcategories(prev => prev.filter(sub => sub.id !== subcategoryId));
      
      if (formData.subcategory === subcategoryId || formData.subcategory === subcategoryId.toString()) {
        handleInputChange('subcategory', '');
      }
      
      if (editingSubcategory && editingSubcategory.id === subcategoryId) {
        setShowEditSubcategoryModal(false);
        setEditingSubcategory(null);
        setNewSubcategoryName('');
      }
    } catch (error: any) {
      console.error('Error deleting subcategory:', error);
      alert(error.message || 'Failed to delete subcategory. It may be in use by products.');
    }
  };

  // Handle brand selection - check if "Add new" was selected
  const handleBrandChange = (value: string) => {
    if (value === '__add_new__') {
      setShowAddBrandModal(true);
    } else {
      // Convert to number if it's a numeric string (brand ID)
      const brandId = value && !isNaN(Number(value)) ? Number(value) : value;
      handleInputChange('brand', brandId);
    }
  };

  // Add new brand
  const handleAddBrand = async () => {
    const trimmedName = newBrandName.trim();
    
    // Validation
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newBrand: 'Brand name is required' }));
      return;
    }
    
    // Check for duplicates (case-insensitive)
    if (brands.some(brand => brand.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newBrand: 'Brand already exists' }));
      return;
    }

    // Logo is optional - check if provided
    const brandLogoFile = (document.getElementById('brand-logo-file') as HTMLInputElement)?.files?.[0];
    const brandLogoUrl = (document.getElementById('brand-logo-url') as HTMLInputElement)?.value?.trim();

    try {
      let logoId: number | undefined;
      let logoUrl: string | undefined;

      // Upload logo file if provided
      if (brandLogoFile) {
        const uploadResponse = await api.uploadImage(brandLogoFile);
        logoId = uploadResponse.id;
      } else if (brandLogoUrl) {
        logoUrl = brandLogoUrl;
      }

      // Create brand in backend
      const brandData: any = {
        name: trimmedName,
      };
      
      if (logoId) {
        brandData.logo = logoId;
      } else if (logoUrl) {
        brandData.logoUrl = logoUrl;
      }

      const response = await api.createBrand(brandData) as { data: any };
      const createdBrand = response.data;
      const brandDataAttr = createdBrand.attributes || createdBrand;

      // Add to brands array
      const newBrand: Brand = {
        id: createdBrand.id || createdBrand.documentId,
        documentId: createdBrand.documentId,
        name: brandDataAttr.name || trimmedName,
        logo: brandDataAttr.logo?.data ? {
          url: brandDataAttr.logo.data.attributes?.url || brandDataAttr.logo.data.url,
          id: brandDataAttr.logo.data.id
        } : null,
        logoUrl: brandDataAttr.logoUrl || logoUrl || null
      };

      setBrands(prev => [...prev, newBrand]);
      
      // Select the new brand (use ID)
      handleInputChange('brand', newBrand.id.toString());
      
      // Reset and close modal
      setNewBrandName('');
      setShowAddBrandModal(false);
      (document.getElementById('brand-logo-file') as HTMLInputElement).value = '';
      (document.getElementById('brand-logo-url') as HTMLInputElement).value = '';
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.newBrand;
        return newErrors;
      });
    } catch (error: any) {
      console.error('Error creating brand:', error);
      
      let errorMessage = 'Failed to create brand. Please try again.';
      
      if (error.status === 401 || error.status === 403) {
        errorMessage = 'Authentication failed. Please ensure you are logged in and have permission to create brands.';
      } else if (error.status === 404 || error.message?.includes('Method Not Allowed')) {
        errorMessage = 'Brands endpoint not found. Please ensure the backend is running and the brands API is available.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors(prev => ({ 
        ...prev, 
        newBrand: errorMessage
      }));
    }
  };

  // Get the main image URL for display
  const mainImageUrl = formData.images[mainImageIndex]?.url || (formData.images.length > 0 ? formData.images[0]?.url : null);
  const displayImages = formData.images.slice(0, 4); // Show max 4 thumbnails

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

    const priceString = (formData.price ?? '').toString();
    if (!priceString.trim()) {
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
      // Ensure documentId is preserved from the original product
      if (!formData.documentId && product?.documentId) {
        console.warn('documentId missing from formData, using product.documentId');
      }

      // Update slug based on name
      const updatedProduct = {
        ...formData,
        documentId: formData.documentId || product?.documentId,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
      };

      console.log('Saving product:', updatedProduct);
      console.log('Product documentId:', updatedProduct.documentId);
      
      if (!updatedProduct.documentId) {
        throw new Error('Product ID (documentId) is missing. Cannot save product.');
      }

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full max-h-[95vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="relative">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              </div>

          <div className="bg-white px-6 pt-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Sticky */}
                <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                  {/* Upload Img Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Upload Img</h4>
                    
                    {/* Main Product Image */}
                    <div className="mb-4">
                      {mainImageUrl ? (
                        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                          <img
                            src={mainImageUrl}
                            alt={formData.images[mainImageIndex]?.alt || "Main product image"}
                            className="w-full h-full object-contain"
                          />
                          {/* Delete button on hover */}
                          <button
                            type="button"
                            onClick={() => removeImage(mainImageIndex)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                            title="Delete image"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">No image selected</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    <div className="grid grid-cols-4 gap-2">
                      {displayImages.map((image, index) => (
                        <div
                          key={index}
                          onClick={() => setMainImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            index === mainImageIndex
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {image.url ? (
                            <img
                              src={image.url}
                              alt={image.alt || `Thumbnail ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <PhotoIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Add More Image Button */}
                      {displayImages.length < 4 && (
                        <div
                          onClick={addImage}
                          className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          <PlusIcon className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* General Information Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">General Information</h4>
                    
                    <div className="space-y-5">
                      
                      {/* Name Product */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name Product *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                      {/* Description Product */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description Product</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          placeholder="Product description"
                        />
                      </div>

                      {/* Product Category */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Category *</label>
                    {loadingCategories ? (
                      <div className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500">
                        Loading categories...
                      </div>
                    ) : (
                    <select
                      value={formData.category ? (typeof formData.category === 'number' ? formData.category.toString() : formData.category) : ''}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22><path fill=%22%23666%22 d=%22M2 0L0 2h4zm0 5L0 3h4z%22/></svg>')] bg-no-repeat bg-right bg-[length:12px] pr-10 ${errors.category ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id.toString()}>{category.name}</option>
                      ))}
                      <option value="__add_new__" className="text-primary-600 font-medium">+ Add new category</option>
                      {categories.length > 0 && (
                        <>
                          <option disabled>──────────</option>
                          {categories.map(category => (
                            <option key={`edit-${category.id}`} value={`__edit__${category.id}`} className="text-gray-600">✏️ Edit: {category.name}</option>
                          ))}
                        </>
                      )}
                    </select>
                    )}
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                    {errors.newCategory && <p className="mt-1 text-sm text-red-600">{errors.newCategory}</p>}
                  </div>

                      {/* Subcategory */}
                      {formData.category && (
                  <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                    {loadingSubcategories ? (
                      <div className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500">
                        Loading subcategories...
                      </div>
                    ) : (
                    <select
                      value={formData.subcategory ? (typeof formData.subcategory === 'number' ? formData.subcategory.toString() : formData.subcategory) : ''}
                      onChange={(e) => handleSubcategoryChange(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22><path fill=%22%23666%22 d=%22M2 0L0 2h4zm0 5L0 3h4z%22/></svg>')] bg-no-repeat bg-right bg-[length:12px] pr-10 ${errors.subcategory ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select subcategory</option>
                      {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id.toString()}>{subcategory.name}</option>
                      ))}
                      <option value="__add_new__" className="text-primary-600 font-medium">+ Add new subcategory</option>
                      {subcategories.length > 0 && (
                        <>
                          <option disabled>──────────</option>
                          {subcategories.map(subcategory => (
                            <option key={`edit-${subcategory.id}`} value={`__edit__${subcategory.id}`} className="text-gray-600">✏️ Edit: {subcategory.name}</option>
                          ))}
                        </>
                      )}
                    </select>
                    )}
                    {errors.subcategory && <p className="mt-1 text-sm text-red-600">{errors.subcategory}</p>}
                    {errors.newSubcategory && <p className="mt-1 text-sm text-red-600">{errors.newSubcategory}</p>}
                  </div>
                      )}

                      {/* Brand */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                        {loadingBrands ? (
                          <div className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500">
                            Loading brands...
                          </div>
                        ) : (
                    <select
                            value={typeof formData.brand === 'number' ? formData.brand.toString() : formData.brand || ''}
                            onChange={(e) => handleBrandChange(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22><path fill=%22%23666%22 d=%22M2 0L0 2h4zm0 5L0 3h4z%22/></svg>')] bg-no-repeat bg-right bg-[length:12px] pr-10 ${errors.brand ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select brand</option>
                      {brands.map(brand => (
                              <option key={brand.id} value={brand.id.toString()}>{brand.name}</option>
                      ))}
                            <option value="__add_new__" className="text-primary-600 font-medium">+ Add new brand</option>
                    </select>
                        )}
                    {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                        {errors.newBrand && <p className="mt-1 text-sm text-red-600">{errors.newBrand}</p>}
                  </div>

                      {/* Tagline */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                        <input
                          type="text"
                          value={formData.tagline || ''}
                          onChange={(e) => handleInputChange('tagline', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Short product tagline"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing And Stock Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Pricing And Stock</h4>
                    
                    <div className="space-y-5">
                      {/* Base Pricing */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Base Pricing *</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.price ? 'border-red-500' : ''}`}
                          placeholder="e.g., K30,000 or 30000"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                      {/* Discounted Price */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                    <input
                      type="text"
                      value={formData.discountedPrice || ''}
                      onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., K25,000 or 25000"
                    />
                  </div>

                      {/* Cost Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                        <input
                          type="number"
                          value={formData.costPrice || ''}
                          onChange={(e) => handleInputChange('costPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                </div>

                      {/* SKU */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      value={formData.SKU || ''}
                      onChange={(e) => handleInputChange('SKU', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Product SKU"
                    />
                  </div>

                      {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                      <input
                        type="number"
                        value={formData.stockQuantity || ''}
                        onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.stockQuantity ? 'border-red-500' : ''}`}
                          placeholder="0"
                        min="0"
                      />
                      {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
                    </div>

                      {/* Stock Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                      <select
                        value={formData.stockStatus || 'in-stock'}
                        onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22><path fill=%22%23666%22 d=%22M2 0L0 2h4zm0 5L0 3h4z%22/></svg>')] bg-no-repeat bg-right bg-[length:12px] pr-10"
                      >
                        {stockStatuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                  </div>

                      {/* Min Stock Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Stock Level</label>
                      <input
                        type="number"
                        value={formData.minStockLevel || ''}
                        onChange={(e) => handleInputChange('minStockLevel', parseInt(e.target.value) || 0)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.minStockLevel ? 'border-red-500' : ''}`}
                          placeholder="5"
                        min="0"
                      />
                      {errors.minStockLevel && <p className="mt-1 text-sm text-red-600">{errors.minStockLevel}</p>}
                    </div>

                      {/* Max Stock Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Stock Level</label>
                      <input
                        type="number"
                        value={formData.maxStockLevel || ''}
                        onChange={(e) => handleInputChange('maxStockLevel', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="100"
                        min="0"
                      />
                  </div>

                      {/* Weight */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="0"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

                  {/* Specifications Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Specifications</h4>
                    
                    <div className="space-y-2">
                    {Object.entries(formData.specs || {}).map(([key, value], index) => {
                      // Use index as stable key to prevent remounting when key changes
                      return (
                        <SpecInput
                          key={`spec-${index}`}
                          specKey={key}
                          specValue={value}
                          onKeyChange={(oldKey, newKey) => {
                            const newSpecs = { ...formData.specs };
                            if (newKey && newKey.trim() !== '') {
                              delete newSpecs[oldKey];
                              newSpecs[newKey.trim()] = value;
                            } else {
                              delete newSpecs[oldKey];
                            }
                            setFormData(prev => ({ ...prev, specs: newSpecs }));
                          }}
                          onValueChange={(specKey, newValue) => {
                            handleSpecsChange(specKey, newValue);
                          }}
                        />
                      );
                    })}
                    <button
                      type="button"
                        onClick={() => {
                          const newKey = `spec_${Date.now()}`;
                          handleSpecsChange(newKey, '');
                        }}
                        className="flex items-center text-sm text-primary-600 hover:text-primary-500 mt-2"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Specification
                    </button>
                </div>
                </div>

              {/* Status */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Product is active
                  </label>
                          </div>
                      </div>
                </div>
                </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="mt-4 px-6 flex items-center text-red-600">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{errors.submit}</span>
                </div>
              )}

              <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
                <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl p-3">
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="inline-flex items-center rounded-xl border border-primary-200 bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
                  >
                    Preview
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/40 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckIcon className="mr-2 h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
                      </div>
          </form>
        </div>
      </div>

      {isPreviewOpen && (
        <ProductPreviewOverlay
          product={formData}
          breadcrumbs={[
            typeof formData.category === 'string' ? formData.category : '',
            typeof formData.subcategory === 'string' ? formData.subcategory : '',
            formData.name,
          ].filter(Boolean)}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}

      {/* Add New Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowAddCategoryModal(false);
            setNewCategoryName('');
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.newCategory;
              return newErrors;
            });
          }}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Add New Category</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategoryModal(false);
                      setNewCategoryName('');
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.newCategory;
                        return newErrors;
                      });
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                        <input
                          type="text"
                    value={newCategoryName}
                          onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      if (errors.newCategory) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.newCategory;
                          return newErrors;
                        });
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newCategory ? 'border-red-500' : ''}`}
                    placeholder="Enter category name"
                    autoFocus
                  />
                  {errors.newCategory && <p className="mt-1 text-sm text-red-600">{errors.newCategory}</p>}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategoryModal(false);
                    setNewCategoryName('');
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newCategory;
                      return newErrors;
                    });
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditCategoryModal && editingCategory && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowEditCategoryModal(false);
            setEditingCategory(null);
            setNewCategoryName('');
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.newCategory;
              return newErrors;
            });
          }}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Edit Category</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditCategoryModal(false);
                      setEditingCategory(null);
                      setNewCategoryName('');
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.newCategory;
                        return newErrors;
                      });
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                        <input
                          type="text"
                    value={newCategoryName}
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      if (errors.newCategory) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.newCategory;
                          return newErrors;
                        });
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleUpdateCategory();
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newCategory ? 'border-red-500' : ''}`}
                    placeholder="Enter category name"
                    autoFocus
                  />
                  {errors.newCategory && <p className="mt-1 text-sm text-red-600">{errors.newCategory}</p>}
                      </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex gap-2">
                    <button
                      type="button"
                    onClick={() => handleDeleteCategory(editingCategory.id)}
                    className="inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-50 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateCategory}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  >
                    Update
                    </button>
                  </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCategoryModal(false);
                    setEditingCategory(null);
                    setNewCategoryName('');
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newCategory;
                      return newErrors;
                    });
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Add New Subcategory Modal */}
      {showAddSubcategoryModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowAddSubcategoryModal(false);
            setNewSubcategoryName('');
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.newSubcategory;
              return newErrors;
            });
          }}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Add New Subcategory</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddSubcategoryModal(false);
                      setNewSubcategoryName('');
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.newSubcategory;
                        return newErrors;
                      });
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category || ''}
                      disabled
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                    >
                      <option value="">
                        {categories.find(c => c.id.toString() === formData.category?.toString())?.name || 'No category selected'}
                      </option>
                    </select>
                    {!formData.category && (
                      <p className="mt-1 text-sm text-red-600">Please select a category first</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name *</label>
                    <input
                      type="text"
                      value={newSubcategoryName}
                      onChange={(e) => {
                        setNewSubcategoryName(e.target.value);
                        if (errors.newSubcategory) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.newSubcategory;
                            return newErrors;
                          });
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSubcategory();
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newSubcategory ? 'border-red-500' : ''}`}
                      placeholder="Enter subcategory name"
                      autoFocus
                      disabled={!formData.category}
                    />
                    {errors.newSubcategory && <p className="mt-1 text-sm text-red-600">{errors.newSubcategory}</p>}
                          </div>
                      </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddSubcategory}
                  disabled={!formData.category}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Subcategory
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSubcategoryModal(false);
                    setNewSubcategoryName('');
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newSubcategory;
                      return newErrors;
                    });
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subcategory Modal */}
      {showEditSubcategoryModal && editingSubcategory && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowEditSubcategoryModal(false);
            setEditingSubcategory(null);
            setNewSubcategoryName('');
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.newSubcategory;
              return newErrors;
            });
          }}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Edit Subcategory</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditSubcategoryModal(false);
                      setEditingSubcategory(null);
                      setNewSubcategoryName('');
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.newSubcategory;
                        return newErrors;
                      });
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category || ''}
                      disabled
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                    >
                      <option value="">
                        {categories.find(c => c.id.toString() === formData.category?.toString())?.name || 'No category selected'}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name *</label>
                        <input
                          type="text"
                      value={newSubcategoryName}
                      onChange={(e) => {
                        setNewSubcategoryName(e.target.value);
                        if (errors.newSubcategory) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.newSubcategory;
                            return newErrors;
                          });
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUpdateSubcategory();
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newSubcategory ? 'border-red-500' : ''}`}
                      placeholder="Enter subcategory name"
                      autoFocus
                    />
                    {errors.newSubcategory && <p className="mt-1 text-sm text-red-600">{errors.newSubcategory}</p>}
                      </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex gap-2">
                          <button
                            type="button"
                    onClick={() => handleDeleteSubcategory(editingSubcategory.id)}
                    className="inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-50 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                          >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                          </button>
                        <button
                          type="button"
                    onClick={handleUpdateSubcategory}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                        >
                    Update
                        </button>
                      </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditSubcategoryModal(false);
                    setEditingSubcategory(null);
                    setNewSubcategoryName('');
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newSubcategory;
                      return newErrors;
                    });
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                    </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Brand Modal */}
      {showAddBrandModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowAddBrandModal(false);
            setNewBrandName('');
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.newBrand;
              return newErrors;
            });
          }}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Add New Brand</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBrandModal(false);
                      setNewBrandName('');
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.newBrand;
                        return newErrors;
                      });
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                    <input
                      type="text"
                      value={newBrandName}
                      onChange={(e) => {
                        setNewBrandName(e.target.value);
                        if (errors.newBrand) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.newBrand;
                            return newErrors;
                          });
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddBrand();
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newBrand ? 'border-red-500' : ''}`}
                      placeholder="Enter brand name"
                      autoFocus
                    />
                    {errors.newBrand && <p className="mt-1 text-sm text-red-600">{errors.newBrand}</p>}
              </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Upload File) <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                      id="brand-logo-file"
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">Upload a logo image file (optional)</p>
              </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
            </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (URL) <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                      id="brand-logo-url"
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png or /logos/brand.png"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter a URL to an existing logo image (optional)</p>
                  </div>
                </div>
              </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                  type="button"
                  onClick={handleAddBrand}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Brand
              </button>
              <button
                type="button"
                  onClick={() => {
                    setShowAddBrandModal(false);
                    setNewBrandName('');
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newBrand;
                      return newErrors;
                    });
                  }}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}

function ProductPreviewOverlay({
  product,
  breadcrumbs,
  onClose,
}: {
  product: Product;
  breadcrumbs: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="relative w-full max-w-5xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow hover:bg-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <ModernProductShowcase product={product} breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
}
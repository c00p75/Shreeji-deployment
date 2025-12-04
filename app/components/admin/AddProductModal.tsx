"use client";

import { useState, useRef, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { 
  XMarkIcon,
  PhotoIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckIcon,
  PencilIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';

interface Product {
  id?: number;
  documentId?: string;
  name: string;
  slug: string;
  category: string | number; // Can be category ID (number) or legacy string
  subcategory?: string | number; // Can be subcategory ID (number) or legacy string
  brand?: string | number; // Can be brand ID (number) or legacy string
  price: string;
  discountedPrice?: string;
  costPrice?: number;
  taxRate?: number;
  discountPercent?: number;
  tagline?: string;
  description?: string;
  specs?: any;
  specialFeature?: any;
  images: Array<{ url: string; alt: string; isMain?: boolean }>;
  isActive: boolean;
  isDigital?: boolean;
  sku: string;
  stockQuantity: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  stockStatus?: string;
  weight?: number;
  dimensions?: any;
  dateAdded?: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Product>({
    name: '',
    slug: '',
    category: '',
    subcategory: '',
    brand: '',
    price: '',
    discountedPrice: '0',
    costPrice: 0,
    taxRate: 16, // Default VAT 16%
    discountPercent: 0,
    tagline: '',
    description: '',
    specs: {},
    specialFeature: {},
    images: [],
    isActive: true,
    isDigital: false,
    sku: '',
    stockQuantity: 0,
    minStockLevel: 5,
    maxStockLevel: 100,
    stockStatus: 'in-stock',
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0, unit: 'cm' }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number; fileName: string } | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  
  // Modal states for adding/editing category/brand/subcategory
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showEditBrandModal, setShowEditBrandModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

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
    category: number | Category | string; // Can be category name (string) or ID (number) or Category object
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Add to existing files
    setImageFiles(prev => [...prev, ...imageFiles]);

    // Create previews
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const setMainImage = (index: number) => {
    setMainImageIndex(index);
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
  };

  // Handle category selection - check if "Add new" or "Edit" was selected
  const handleCategoryChange = (value: string) => {
    if (value === '__add_new__') {
      setShowAddCategoryModal(true);
    } else if (value.startsWith('__edit__')) {
      const categoryName = value.replace('__edit__', '');
      const category = categories.find(c => c.name === categoryName || c.id === categoryName);
      if (category) {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setShowEditCategoryModal(true);
      }
    } else {
      // Categories are strings, so just use the value directly
      handleInputChange('category', value);
      // Clear subcategory when category changes
      handleInputChange('subcategory', '');
    }
  };

  // Handle brand selection - check if "Add new" was selected
  const handleBrandChange = (value: string) => {
    if (value === '__add_new__') {
      setShowAddBrandModal(true);
    } else {
      handleInputChange('brand', value);
    }
  };

  // Add new category (categories are just strings, not separate entities)
  const handleAddCategory = async () => {
    const trimmedName = newCategoryName.trim();
    
    // Validation
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name is required' }));
      return;
    }
    
    // Check for duplicates (case-insensitive)
    if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newCategory: 'Category already exists' }));
      return;
    }

    // Categories are just strings, so we don't need to create them via API
    // Just add to the local list and select it
    const newCategory: Category = {
      id: trimmedName, // Use name as ID since categories are strings
      documentId: trimmedName,
      name: trimmedName,
      slug: trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    setCategories(prev => [...prev, newCategory]);
    
    // Select the new category (use name as value)
    handleInputChange('category', trimmedName);
    
    // Reset and close modal
    setNewCategoryName('');
    setShowAddCategoryModal(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newCategory;
      return newErrors;
    });
  };

  // Update category (categories are just strings, so we update products using this category)
  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    
    const trimmedName = newCategoryName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name is required' }));
      return;
    }
    
    // Check for duplicates (excluding current category)
    if (categories.some(cat => cat.id !== editingCategory.id && cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newCategory: 'Category name already exists' }));
      return;
    }

    // Categories are just strings, so we just update the local list
    // Note: This won't update existing products - they would need to be updated individually
    const updated: Category = {
      id: trimmedName,
      documentId: trimmedName,
      name: trimmedName,
      slug: trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? updated : cat));
    
    // Update formData if this category is selected
    if (formData.category === editingCategory.id || formData.category === editingCategory.id.toString() || formData.category === editingCategory.name) {
      handleInputChange('category', trimmedName);
    }
    
    // Reset and close modal
    setNewCategoryName('');
    setEditingCategory(null);
    setShowEditCategoryModal(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newCategory;
      return newErrors;
    });
  };

  // Delete category (categories are just strings, so we just remove from local list)
  const handleDeleteCategory = async (categoryId: number | string) => {
    if (!confirm('Are you sure you want to remove this category from the list? This will not delete products using this category.')) {
      return;
    }

    // Categories are just strings, so we just remove from the local list
    setCategories(prev => prev.filter(cat => cat.id !== categoryId && cat.name !== categoryId));
    
    // Clear category selection if deleted category was selected
    if (formData.category === categoryId || formData.category === categoryId.toString()) {
      handleInputChange('category', '');
      handleInputChange('subcategory', '');
    }
    
    // Close modal if editing
    if (editingCategory && (editingCategory.id === categoryId || editingCategory.name === categoryId)) {
      setShowEditCategoryModal(false);
      setEditingCategory(null);
      setNewCategoryName('');
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

    // Check if logo file or URL is provided
    const brandLogoFile = (document.getElementById('brand-logo-file') as HTMLInputElement)?.files?.[0];
    const brandLogoUrl = (document.getElementById('brand-logo-url') as HTMLInputElement)?.value?.trim();
    
    if (!brandLogoFile && !brandLogoUrl) {
      setErrors(prev => ({ ...prev, newBrand: 'Please provide either a logo file or logo URL' }));
      return;
    }

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
      setErrors(prev => ({ 
        ...prev, 
        newBrand: error.message || 'Failed to create brand. Please try again.' 
      }));
    }
  };

  // Update brand
  const handleUpdateBrand = async () => {
    if (!editingBrand) return;
    
    const trimmedName = newBrandName.trim();
    
    if (!trimmedName) {
      setErrors(prev => ({ ...prev, newBrand: 'Brand name is required' }));
      return;
    }
    
    // Check for duplicates (excluding current brand)
    if (brands.some(b => b.id !== editingBrand.id && b.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrors(prev => ({ ...prev, newBrand: 'Brand name already exists' }));
      return;
    }

    // Logo is optional - check if provided
    const brandLogoFile = (document.getElementById('edit-brand-logo-file') as HTMLInputElement)?.files?.[0];
    const brandLogoUrl = (document.getElementById('edit-brand-logo-url') as HTMLInputElement)?.value?.trim();

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

      // Update brand in backend
      const brandData: any = {
        name: trimmedName,
      };
      
      if (logoId) {
        brandData.logo = logoId;
      } else if (logoUrl) {
        brandData.logoUrl = logoUrl;
      }

      const response = await api.updateBrand(editingBrand.id.toString(), brandData) as { data: any };
      const updatedBrand = response.data;
      const brandDataAttr = updatedBrand.attributes || updatedBrand;

      const updated: Brand = {
        id: updatedBrand.id || updatedBrand.documentId,
        documentId: updatedBrand.documentId,
        name: brandDataAttr.name || trimmedName,
        logo: brandDataAttr.logo?.data ? {
          url: brandDataAttr.logo.data.attributes?.url || brandDataAttr.logo.data.url,
          id: brandDataAttr.logo.data.id
        } : null,
        logoUrl: brandDataAttr.logoUrl || logoUrl || null
      };

      setBrands(prev => prev.map(b => b.id === editingBrand.id ? updated : b));
      
      // Update formData if this brand is selected
      if (formData.brand === editingBrand.id || formData.brand === editingBrand.id.toString()) {
        handleInputChange('brand', updated.id.toString());
      }
      
      // Reset and close modal
      setNewBrandName('');
      setEditingBrand(null);
      setShowEditBrandModal(false);
      (document.getElementById('edit-brand-logo-file') as HTMLInputElement).value = '';
      (document.getElementById('edit-brand-logo-url') as HTMLInputElement).value = '';
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.newBrand;
        return newErrors;
      });
    } catch (error: any) {
      console.error('Error updating brand:', error);
      setErrors(prev => ({ 
        ...prev, 
        newBrand: error.message || 'Failed to update brand. Please try again.' 
      }));
    }
  };

  // Delete brand
  const handleDeleteBrand = async (brandId: number | string) => {
    if (!confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteBrand(brandId);
      setBrands(prev => prev.filter(b => b.id !== brandId));
      
      // Clear brand selection if deleted brand was selected
      if (formData.brand === brandId || formData.brand === brandId.toString()) {
        handleInputChange('brand', '');
      }
      
      // Close modal if editing
      if (editingBrand && editingBrand.id === brandId) {
        setShowEditBrandModal(false);
        setEditingBrand(null);
        setNewBrandName('');
      }
    } catch (error: any) {
      console.error('Error deleting brand:', error);
      alert(error.message || 'Failed to delete brand. It may be in use by products.');
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
      // Convert to number if it's a numeric string (subcategory ID)
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

    const categoryName = formData.category;
    if (!categoryName) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Please select a category first' }));
      return;
    }

    // Check for duplicates (case-insensitive)
    if (subcategories.some(sub => 
      sub.name.toLowerCase() === trimmedName.toLowerCase()
    )) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory already exists' }));
      return;
    }

    try {
      // Backend doesn't require category - subcategories are standalone entities
      const response = await api.createSubcategory({ 
        name: trimmedName
      }) as { data: any };
      const createdSubcategory = response.data;

      const newSubcategory: Subcategory = {
        id: createdSubcategory.id,
        documentId: createdSubcategory.id?.toString(),
        name: createdSubcategory.name || trimmedName,
        slug: createdSubcategory.urlPath || createdSubcategory.slug || null,
        category: categoryName // Store category name for reference (not used by backend)
      };

      setSubcategories(prev => [...prev, newSubcategory]);
      
      // Select the new subcategory (use ID)
      handleInputChange('subcategory', newSubcategory.id.toString());
      
      // Reset and close modal
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

    const categoryName = formData.category;

    // Check for duplicates (excluding current subcategory)
    if (subcategories.some(sub => 
      sub.id !== editingSubcategory.id &&
      sub.name.toLowerCase() === trimmedName.toLowerCase()
    )) {
      setErrors(prev => ({ ...prev, newSubcategory: 'Subcategory name already exists' }));
      return;
    }

    try {
      // Backend doesn't require category - subcategories are standalone entities
      const response = await api.updateSubcategory(editingSubcategory.id, { 
        name: trimmedName
      }) as { data: any };
      const updatedSubcategory = response.data;

      const updated: Subcategory = {
        id: updatedSubcategory.id,
        documentId: updatedSubcategory.id?.toString(),
        name: updatedSubcategory.name || trimmedName,
        slug: updatedSubcategory.urlPath || updatedSubcategory.slug || null,
        category: categoryName || editingSubcategory.category // Keep category name for reference
      };

      setSubcategories(prev => prev.map(sub => sub.id === editingSubcategory.id ? updated : sub));
      
      // Update formData if this subcategory is selected
      if (formData.subcategory === editingSubcategory.id || formData.subcategory === editingSubcategory.id.toString()) {
        handleInputChange('subcategory', updated.id.toString());
      }
      
      // Reset and close modal
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
      
      // Clear subcategory selection if deleted subcategory was selected
      if (formData.subcategory === subcategoryId || formData.subcategory === subcategoryId.toString()) {
        handleInputChange('subcategory', '');
      }
      
      // Close modal if editing
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

  const handleSaveDraft = async () => {
    // Save as draft (isActive: false)
    setSavingDraft(true);
    try {
      // Similar to handleSubmit but mark as draft
      if (!validateForm()) {
        return;
      }

      let uploadedImages = formData.images;
      if (imageFiles.length > 0) {
        uploadedImages = await uploadImages();
      }

      // Prepare product data matching backend schema
      // Convert brand to ID if it's a string (shouldn't happen with new implementation, but for safety)
      let brandId: number | null = null;
      if (formData.brand) {
        if (typeof formData.brand === 'number') {
          brandId = formData.brand;
        } else if (typeof formData.brand === 'string' && formData.brand.match(/^\d+$/)) {
          brandId = parseInt(formData.brand);
        } else if (typeof formData.brand === 'string') {
          // If it's a string that's not a number, try to find matching brand
          const brandNameToMatch = formData.brand.toLowerCase();
          const matchingBrand = brands.find(b => b.name.toLowerCase() === brandNameToMatch);
          if (matchingBrand) {
            brandId = typeof matchingBrand.id === 'number' ? matchingBrand.id : parseInt(matchingBrand.id.toString());
          }
        }
      }

      const productData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
        category: formData.category,
        subcategory: formData.subcategory || null,
        brand: brandId,
        price: (() => {
          const basePrice = formData.costPrice || 0;
          const vatPercent = formData.taxRate || 16;
          return basePrice * (1 + vatPercent / 100);
        })(),
        discountedPrice: (() => {
          const basePrice = formData.costPrice || 0;
          const vatPercent = formData.taxRate || 16;
          const sellingPrice = basePrice * (1 + vatPercent / 100);
          const discountPercent = formData.discountPercent || 0;
          return discountPercent > 0 ? sellingPrice * (1 - discountPercent / 100) : 0;
        })(),
        costPrice: formData.costPrice || null,
        taxRate: formData.taxRate || 16,
        tagline: formData.tagline || null,
        description: formData.description || null,
        specs: formData.specs || null,
        specialFeature: formData.specialFeature || null,
        images: uploadedImages,
        isActive: false, // Draft
        isDigital: formData.isDigital || false,
        sku: formData.sku || `SKU-${Date.now()}`,
        stockQuantity: formData.stockQuantity || 0,
        minStockLevel: formData.minStockLevel || 5,
        maxStockLevel: formData.maxStockLevel || 100,
        stockStatus: formData.stockStatus || 'in-stock',
        weight: formData.weight || null,
        dimensions: formData.dimensions || null,
        dateAdded: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
      };

      await api.createProduct(productData);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setErrors({ submit: 'Failed to save draft. Please try again.' });
    } finally {
      setSavingDraft(false);
    }
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

    if (!formData.costPrice || formData.costPrice <= 0) {
      newErrors.costPrice = 'Base Price is required and must be greater than 0';
    }

    if (!formData.sku?.trim()) {
      newErrors.sku = 'SKU is required';
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

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    setUploadingImages(true);
    try {
      // Create a wrapper to track progress during sequential uploads
      const uploadedImages: Array<{ id: number; url: string; name: string }> = [];
      
      // Track progress by intercepting individual uploads
      // Upload sequentially to show progress
      for (let i = 0; i < imageFiles.length; i++) {
        setUploadProgress({ 
          current: i + 1, 
          total: imageFiles.length, 
          fileName: imageFiles[i].name 
        });
        
        // Upload one at a time to show progress
        const result = await api.uploadImage(imageFiles[i]);
        uploadedImages.push(result);
      }
      
      setUploadProgress(null);
      
      // Format images for product
      const formattedImages = uploadedImages.map((uploaded, index) => ({
        url: uploaded.url, // Use url from upload response
        alt: formData.name || `Product image ${index + 1}`,
        isMain: index === 0 // First image is main
      }));

      return formattedImages;
    } catch (error: any) {
      setUploadProgress(null);
      console.error('Error uploading images to Imghippo:', error);
      throw new Error(`Failed to upload images: ${error.message || 'Unknown error'}`);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Upload images first
      let uploadedImages = formData.images;
      if (imageFiles.length > 0) {
        uploadedImages = await uploadImages();
      }

      // Calculate prices
      const basePrice = formData.costPrice || 0;
      const vatPercent = formData.taxRate || 16;
      const sellingPrice = basePrice * (1 + vatPercent / 100);
      const discountPercent = formData.discountPercent || 0;
      const discountPrice = discountPercent > 0 ? sellingPrice * (1 - discountPercent / 100) : 0;

      // Prepare product data matching backend schema
      const productData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
        category: formData.category,
        subcategory: formData.subcategory || null,
        brand: formData.brand || null,
        price: sellingPrice, // Selling price = Base Price + VAT
        discountedPrice: discountPrice > 0 ? discountPrice : null,
        costPrice: basePrice, // Base price (formerly cost price)
        taxRate: vatPercent,
        tagline: formData.tagline || null,
        description: formData.description || null,
        specs: formData.specs || null,
        specialFeature: formData.specialFeature || null,
        images: uploadedImages,
        isActive: true, // Published
        isDigital: formData.isDigital || false,
        sku: formData.sku || `SKU-${Date.now()}`,
        stockQuantity: formData.stockQuantity || 0,
        minStockLevel: formData.minStockLevel || 5,
        maxStockLevel: formData.maxStockLevel || 100,
        stockStatus: formData.stockStatus || 'in-stock',
        weight: formData.weight || null,
        dimensions: formData.dimensions || null,
        dateAdded: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
      };

      console.log('Creating product with data:', productData);
      
      await api.createProduct(productData);
      
      // Reset form
      setFormData({
        name: '',
        slug: '',
        category: '',
        subcategory: '',
        brand: '',
        price: '',
        discountedPrice: '0',
        costPrice: 0,
        taxRate: 16, // Default VAT 16%
        discountPercent: 0,
        tagline: '',
        description: '',
        specs: {},
        specialFeature: {},
        images: [],
        isActive: true,
        isDigital: false,
        sku: '',
        stockQuantity: 0,
        minStockLevel: 5,
        maxStockLevel: 100,
        stockStatus: 'in-stock',
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0, unit: 'cm' }
      });
      setImageFiles([]);
      setImagePreviews([]);
      setMainImageIndex(0);
      setErrors({});

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error creating product:', error);
      
      let errorMessage = 'Failed to create product. Please try again.';
      
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    setImageFiles(prev => [...prev, ...imageFiles]);
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

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
            logo: brandData.logo?.data ? {
              url: brandData.logo.data.attributes?.url || brandData.logo.data.url,
              id: brandData.logo.data.id
            } : null,
            logoUrl: brandData.logoUrl || null
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

  // Fetch categories by extracting unique categories from existing products
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        // Fetch products to extract unique categories
        const response = await api.getProducts({ 
          pagination: { page: 1, pageSize: 1000 } // Get enough products to extract all categories
        });
        
        // Extract unique categories from products
        const uniqueCategories = new Set<string>();
        const productsArray = response.data || [];
        
        productsArray.forEach((product: any) => {
          const productData = product.attributes || product;
          const category = productData.category;
          if (category && typeof category === 'string' && category.trim()) {
            uniqueCategories.add(category.trim());
          }
        });
        
        // Convert Set to array of Category objects
        const categoriesData = Array.from(uniqueCategories).map((categoryName, index) => ({
          id: categoryName, // Use category name as ID since categories are strings
          documentId: categoryName,
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
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
      
      // If category is empty or not a string, don't fetch
      if (!categoryName || typeof categoryName !== 'string') {
        setSubcategories([]);
        return;
      }

      setLoadingSubcategories(true);
      try {
        // Fetch all subcategories from backend
        const subcategoriesResponse = await api.getSubcategories();
        const allSubcategories = subcategoriesResponse.data || [];
        
        // Fetch products with the selected category to find which subcategories are used
        const productsResponse = await api.getProducts({
          pagination: { page: 1, pageSize: 1000 },
          filters: { category: categoryName }
        });
        
        const productsArray = productsResponse.data || [];
        
        // Extract unique subcategory IDs used by products in this category
        const usedSubcategoryIds = new Set<number>();
        productsArray.forEach((product: any) => {
          const productData = product.attributes || product;
          // Handle both object and ID formats
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
        
        // Filter subcategories to only those used by products in this category
        // Also include all subcategories if no filtering is needed (for flexibility)
        const filteredSubcategories = allSubcategories
          .filter((subcategory: any) => {
            const subcategoryId = subcategory.id || subcategory.documentId;
            // If we have products with subcategories, only show those
            // Otherwise show all subcategories
            return usedSubcategoryIds.size === 0 || usedSubcategoryIds.has(subcategoryId);
          })
          .map((subcategory: any) => {
            return {
              id: subcategory.id,
              documentId: subcategory.id?.toString(),
              name: subcategory.name || '',
              slug: subcategory.urlPath || subcategory.slug || null,
              category: categoryName // Store the category name for reference
            };
          });
        
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

  // Update main image index when images change
  // This must be before any early returns to follow Rules of Hooks
  useEffect(() => {
    if (imagePreviews.length > 0 && mainImageIndex >= imagePreviews.length) {
      setMainImageIndex(0);
    }
  }, [imagePreviews.length, mainImageIndex]);

  if (!isOpen) return null;

  const mainImageUrl = imagePreviews[mainImageIndex] || (imagePreviews.length > 0 ? imagePreviews[0] : null);
  const displayPreviews = [...imagePreviews].slice(0, 4); // Show max 4 thumbnails

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full max-h-[95vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="relative">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={loading || savingDraft || uploadingImages}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Save Draft
                  </button>
                <button
                  type="button"
                  onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 ml-2"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                </div>
              </div>
              </div>

            <div className="bg-white px-6 pt-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column - Sticky */}
                <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                  {/* Upload Img Card */}
                  <div className="rounded-lg shadow-sm border p-6">
                    <h4 className="text-lg font-bold text-white mb-6">Upload Img</h4>
                    
                    {/* Main Product Image */}
                    <div className="mb-4">
                      {mainImageUrl ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="relative w-full aspect-square rounded-lg overflow-hidden border cursor-pointer group hover:border-primary-500 transition-colors"
                        >
                          <img
                            src={mainImageUrl}
                            alt="Main product image"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                            <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className="w-full aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                        >
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
                            <p className="mt-1 text-xs text-gray-400">or drag and drop</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    <div className="grid grid-cols-4 gap-2">
                      {displayPreviews.map((preview, index) => (
                        <div
                          key={index}
                          onClick={() => setMainImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            index === mainImageIndex
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={preview}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      
                      {/* Add More Image Button */}
                      {displayPreviews.length < 4 && (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          <PlusIcon className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                    </div>

                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                    />

                    {/* Upload Progress */}
                    {uploadProgress && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-900 mb-2">
                          Uploading {uploadProgress.current}/{uploadProgress.total}: {uploadProgress.fileName}
                        </p>
                        <div className="w-full bg-blue-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
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
                    <Listbox
                      value={formData.category ? (typeof formData.category === 'number' ? formData.category.toString() : formData.category) : ''}
                      onChange={(value) => {
                        if (value !== '__add_new__') {
                          handleCategoryChange(value);
                        } else {
                          setShowAddCategoryModal(true);
                        }
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button
                          className={`relative w-full cursor-default rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.category ? 'border-red-500' : ''
                          }`}
                        >
                          <span className="block truncate">
                            {formData.category
                              ? categories.find(c => c.name === formData.category || c.id === formData.category)?.name || 'Select category'
                              : 'Select category'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as="div"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Listbox.Options className="max-h-60 overflow-auto rounded-lg py-1 text-base">
                      {categories.map((category, index) => (
                              <Listbox.Option
                                key={`category-${category.id}-${index}`}
                                value={category.name}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {category.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingCategory(category);
                                        setNewCategoryName(category.name);
                                        setShowEditCategoryModal(true);
                                      }}
                                      className="flex-shrink-0 p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
                                      title="Edit category"
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                            <Listbox.Option
                              value="__add_new__"
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                  active ? 'bg-primary-100 text-primary-900' : 'text-primary-600 font-medium'
                                }`
                              }
                            >
                              <span className="block truncate">+ Add new category</span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
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
                    <Listbox
                      value={formData.subcategory ? (typeof formData.subcategory === 'number' ? formData.subcategory.toString() : formData.subcategory.toString()) : ''}
                      onChange={(value) => {
                        if (value !== '__add_new__') {
                          handleSubcategoryChange(value);
                        } else {
                          if (!formData.category) {
                            setErrors(prev => ({ ...prev, subcategory: 'Please select a category first' }));
                            return;
                          }
                          setShowAddSubcategoryModal(true);
                        }
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button
                          className={`relative w-full cursor-default rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.subcategory ? 'border-red-500' : ''
                          }`}
                        >
                          <span className="block truncate">
                            {formData.subcategory
                              ? subcategories.find(s => s.id.toString() === formData.subcategory?.toString() || s.id === formData.subcategory)?.name || 'Select subcategory'
                              : 'Select subcategory'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as="div"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Listbox.Options className="max-h-60 overflow-auto rounded-lg py-1 text-base">
                      {subcategories.map((subcategory, index) => (
                              <Listbox.Option
                                key={`subcategory-${subcategory.id}-${index}`}
                                value={subcategory.id.toString()}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {subcategory.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingSubcategory(subcategory);
                                        setNewSubcategoryName(subcategory.name);
                                        setShowEditSubcategoryModal(true);
                                      }}
                                      className="flex-shrink-0 p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
                                      title="Edit subcategory"
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                            <Listbox.Option
                              value="__add_new__"
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                  active ? 'bg-primary-100 text-primary-900' : 'text-primary-600 font-medium'
                                }`
                              }
                            >
                              <span className="block truncate">+ Add new subcategory</span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
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
                    <Listbox
                        value={formData.brand || ''}
                      onChange={(value: string) => {
                        if (value !== '__add_new__') {
                          handleBrandChange(value);
                        } else {
                          setShowAddBrandModal(true);
                        }
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button
                          className={`relative w-full cursor-default rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.brand ? 'border-red-500' : ''
                          }`}
                        >
                          <span className="block truncate">
                            {formData.brand
                              ? brands.find(b => b.id.toString() === formData.brand?.toString() || b.id === formData.brand)?.name || 'Select brand'
                              : 'Select brand'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as="div"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Listbox.Options className="max-h-60 overflow-auto rounded-lg py-1 text-base">
                            {brands.map((brand) => (
                              <Listbox.Option
                                key={brand.id}
                                value={brand.id.toString()}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {brand.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingBrand(brand);
                                        setNewBrandName(brand.name);
                                        setShowEditBrandModal(true);
                                      }}
                                      className="flex-shrink-0 p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
                                      title="Edit brand"
                                    >
                                      <PencilIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                            <Listbox.Option
                              value="__add_new__"
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                  active ? 'bg-primary-100 text-primary-900' : 'text-primary-600 font-medium'
                                }`
                              }
                            >
                              <span className="block truncate">+ Add new brand</span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
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

                      {/* Is Digital */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isDigital"
                          checked={formData.isDigital || false}
                          onChange={(e) => handleInputChange('isDigital', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDigital" className="ml-2 block text-sm text-gray-700">
                          Digital Product
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Pricing And Stock Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Pricing And Stock</h4>
                    
                    {(() => {
                      // Computed values
                      const basePrice = formData.costPrice || 0;
                      const vatPercent = formData.taxRate || 16;
                      const sellingPrice = basePrice * (1 + vatPercent / 100);
                      const discountPercent = formData.discountPercent || 0;
                      const discountPrice = sellingPrice * (1 - discountPercent / 100);

                      return (
                        <div className="space-y-5">
                          {/* Base Price (formerly Cost Price) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                            <input
                              type="number"
                              value={formData.costPrice || ''}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                handleInputChange('costPrice', value);
                                // Auto-update selling price
                                const newSellingPrice = value * (1 + (formData.taxRate || 16) / 100);
                                handleInputChange('price', newSellingPrice.toFixed(2));
                                // Auto-update discount price if discount percent exists
                                if (formData.discountPercent) {
                                  const newDiscountPrice = newSellingPrice * (1 - (formData.discountPercent || 0) / 100);
                                  handleInputChange('discountedPrice', newDiscountPrice.toFixed(2));
                                }
                              }}
                              className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.costPrice ? 'border-red-500' : ''}`}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                            />
                            {errors.costPrice && <p className="mt-1 text-sm text-red-600">{errors.costPrice}</p>}
                          </div>

                          {/* VAT */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Value Added Tax (VAT) (%)</label>
                            <input
                              type="number"
                              value={formData.taxRate || 16}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 16;
                                handleInputChange('taxRate', value);
                                // Auto-update selling price
                                const basePriceValue = formData.costPrice || 0;
                                const newSellingPrice = basePriceValue * (1 + value / 100);
                                handleInputChange('price', newSellingPrice.toFixed(2));
                                // Auto-update discount price if discount percent exists
                                if (formData.discountPercent) {
                                  const newDiscountPrice = newSellingPrice * (1 - (formData.discountPercent || 0) / 100);
                                  handleInputChange('discountedPrice', newDiscountPrice.toFixed(2));
                                }
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="16"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </div>

                          {/* Selling Price (computed) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
                            <input
                              type="text"
                              value={sellingPrice.toFixed(2)}
                              readOnly
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none cursor-not-allowed"
                              placeholder="Calculated automatically"
                            />
                            <p className="mt-1 text-xs text-gray-500">Calculated from Base Price + VAT</p>
                          </div>

                          {/* Discount Percent */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percent (%)</label>
                            <input
                              type="number"
                              value={formData.discountPercent || ''}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                handleInputChange('discountPercent', value);
                                // Auto-update discount price
                                const basePriceValue = formData.costPrice || 0;
                                const vatPercentValue = formData.taxRate || 16;
                                const currentSellingPrice = basePriceValue * (1 + vatPercentValue / 100);
                                const newDiscountPrice = currentSellingPrice * (1 - value / 100);
                                handleInputChange('discountedPrice', newDiscountPrice.toFixed(2));
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="0"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </div>

                          {/* Discount Price (computed) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
                            <input
                              type="text"
                              value={discountPrice > 0 ? discountPrice.toFixed(2) : '0.00'}
                              readOnly
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none cursor-not-allowed"
                              placeholder="Calculated automatically"
                            />
                            <p className="mt-1 text-xs text-gray-500">Calculated from Selling Price - Discount %</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* SKU */}
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                    <input
                      type="text"
                          value={formData.sku || ''}
                          onChange={(e) => handleInputChange('sku', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.sku ? 'border-red-500' : ''}`}
                      placeholder="Product SKU"
                    />
                        {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
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
              <div className="flex flex-col items-end gap-2 rounded-2xl p-3">
                <button
                  type="submit"
                  disabled={loading || savingDraft || uploadingImages}
                  className="inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/40 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckIcon className="mr-2 h-4 w-4" />
                  {uploadingImages ? 'Uploading...' : loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Upload File)</label>
                    <input
                      id="brand-logo-file"
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">Upload a logo image file</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (URL)</label>
                  <input
                      id="brand-logo-url"
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png or /logos/brand.png"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter a URL to an existing logo image</p>
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

      {/* Edit Brand Modal */}
      {showEditBrandModal && editingBrand && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => {
            setShowEditBrandModal(false);
            setEditingBrand(null);
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
                  <h3 className="text-lg font-bold text-gray-900">Edit Brand</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditBrandModal(false);
                      setEditingBrand(null);
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
                          handleUpdateBrand();
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.newBrand ? 'border-red-500' : ''}`}
                      placeholder="Enter brand name"
                      autoFocus
                    />
                    {errors.newBrand && <p className="mt-1 text-sm text-red-600">{errors.newBrand}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Upload File)</label>
                    <input
                      id="edit-brand-logo-file"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (URL)</label>
                    <input
                      id="edit-brand-logo-url"
                      type="text"
                      defaultValue={editingBrand.logoUrl || ''}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png or /logos/brand.png"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter a URL to an existing logo image (optional)</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteBrand(editingBrand.id)}
                    className="inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-50 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateBrand}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  >
                    Update
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditBrandModal(false);
                    setEditingBrand(null);
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


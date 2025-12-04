"use client";

import { useEffect, useState } from 'react';
import { 
  UserIcon, 
  CogIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  PaintBrushIcon,
  GlobeAltIcon,
  KeyIcon,
  DocumentTextIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Layout from './Layout'
import api from '@/app/lib/admin/api';

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile',
    icon: UserIcon,
    description: 'Manage your personal information and preferences'
  },
  {
    id: 'general',
    name: 'General',
    icon: CogIcon,
    description: 'Configure general application settings'
  },
  {
    id: 'security',
    name: 'Security',
    icon: ShieldCheckIcon,
    description: 'Manage security settings and authentication'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    description: 'Configure notification preferences'
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: PaintBrushIcon,
    description: 'Customize the look and feel of your dashboard'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: GlobeAltIcon,
    description: 'Manage third-party integrations and APIs'
  },
  {
    id: 'api',
    name: 'API Settings',
    icon: KeyIcon,
    description: 'Configure API keys and access tokens'
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: BanknotesIcon,
    description: 'Configure payment gateways and bank transfer details'
  },
  {
    id: 'backup',
    name: 'Backup & Export',
    icon: DocumentTextIcon,
    description: 'Manage data backup and export options'
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    // Profile
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@shreeji.com',
    phone: '+1234567890',
    timezone: 'UTC',
    
    // General
    companyName: 'Shreeji Technologies',
    currency: 'ZMW',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    
    // Security
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    inventoryAlerts: false,
    
    // Appearance
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
    
    // API
    apiKey: 'sk-1234567890abcdef',
    webhookUrl: 'https://example.com/webhook',
    rateLimit: '1000'
  });
  const [bankSettings, setBankSettings] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    swiftCode: '',
    iban: '',
    deadlineHours: 24,
    isEnabled: true,
  });
  const [mobileMoneySettings, setMobileMoneySettings] = useState({
    isEnabled: true,
  });
  const [cardSettings, setCardSettings] = useState({
    isEnabled: true,
  });
  const [codSettings, setCodSettings] = useState({
    isEnabled: true,
  });
  const [dpoSettings, setDpoSettings] = useState({
    companyToken: '',
    apiUrl: 'https://secure.3gdirectpay.com/payv3.php',
    serviceType: '5525',
    redirectUrl: '',
    backUrl: '',
    isEnabled: false,
  });
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [paymentSaving, setPaymentSaving] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  });

  useEffect(() => {
    let mounted = true;
    const fetchSettings = async () => {
      try {
        setPaymentLoading(true);
        const [bank, dpo, mobileMoney, card, cod] = await Promise.all([
          api.getSettingsByCategory('payment_bank_transfer'),
          api.getSettingsByCategory('payment_dpo'),
          api.getSettingsByCategory('payment_mobile_money'),
          api.getSettingsByCategory('payment_card'),
          api.getSettingsByCategory('payment_cod'),
        ]);
        if (!mounted) return;
        setBankSettings({
          bankName: bank?.bankName ?? '',
          accountNumber: bank?.accountNumber ?? '',
          accountName: bank?.accountName ?? '',
          swiftCode: bank?.swiftCode ?? '',
          iban: bank?.iban ?? '',
          deadlineHours: bank?.deadlineHours ?? 24,
          isEnabled: bank?.isEnabled ?? true,
        });
        setDpoSettings({
          companyToken: dpo?.companyToken ?? '',
          apiUrl: dpo?.apiUrl ?? 'https://secure.3gdirectpay.com/payv3.php',
          serviceType: dpo?.serviceType ?? '5525',
          redirectUrl: dpo?.redirectUrl ?? '',
          backUrl: dpo?.backUrl ?? '',
          isEnabled: dpo?.isEnabled ?? false,
        });
        setMobileMoneySettings({
          isEnabled: mobileMoney?.isEnabled ?? true,
        });
        setCardSettings({
          isEnabled: card?.isEnabled ?? true,
        });
        setCodSettings({
          isEnabled: cod?.isEnabled ?? true,
        });
      } catch (error) {
        console.error('Failed to load payment settings', error);
        if (mounted) {
          setPaymentStatus({ type: 'error', message: (error as Error).message || 'Failed to load payment settings.' });
        }
      } finally {
        if (mounted) setPaymentLoading(false);
      }
    };

    fetchSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving settings:', formData);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-500">Update your personal details and contact information.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            value={formData.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
        <p className="mt-1 text-sm text-gray-500">Configure general application preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Default Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="ZMW">ZMW - Zambian Kwacha</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Format</label>
          <select
            value={formData.dateFormat}
            onChange={(e) => handleInputChange('dateFormat', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time Format</label>
          <select
            value={formData.timeFormat}
            onChange={(e) => handleInputChange('timeFormat', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="12h">12-hour</option>
            <option value="24h">24-hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
        <p className="mt-1 text-sm text-gray-500">Manage your account security and authentication preferences.</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <button
            type="button"
            onClick={() => handleInputChange('twoFactorEnabled', !formData.twoFactorEnabled)}
            className={clsx(
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              formData.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
            )}
          >
            <span
              className={clsx(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                formData.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
          <select
            value={formData.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
          <select
            value={formData.passwordExpiry}
            onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">1 year</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">Choose how you want to receive notifications.</p>
      </div>
      
      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
          { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
          { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
          { key: 'orderAlerts', label: 'Order Alerts', description: 'Get notified about new orders' },
          { key: 'inventoryAlerts', label: 'Inventory Alerts', description: 'Get notified about low stock levels' }
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{label}</h4>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange(key, !formData[key as keyof typeof formData])}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                formData[key as keyof typeof formData] ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  formData[key as keyof typeof formData] ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Appearance Settings</h3>
        <p className="mt-1 text-sm text-gray-500">Customize the look and feel of your dashboard.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <div className="mt-2 flex space-x-4">
            {[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={formData.theme === option.value}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
            <p className="text-sm text-gray-500">Use smaller spacing and condensed layout</p>
          </div>
          <button
            type="button"
            onClick={() => handleInputChange('compactMode', !formData.compactMode)}
            className={clsx(
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              formData.compactMode ? 'bg-primary-600' : 'bg-gray-200'
            )}
          >
            <span
              className={clsx(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                formData.compactMode ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">API Settings</h3>
        <p className="mt-1 text-sm text-gray-500">Manage your API keys and integration settings.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">API Key</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={formData.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              readOnly
            />
            <button className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100">
              Copy
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
          <input
            type="url"
            value={formData.webhookUrl}
            onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Rate Limit (requests per hour)</label>
          <select
            value={formData.rateLimit}
            onChange={(e) => handleInputChange('rateLimit', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1,000</option>
            <option value="5000">5,000</option>
            <option value="10000">10,000</option>
          </select>
        </div>
      </div>
    </div>
  );

  const handleSavePaymentSettings = async () => {
    setPaymentSaving(true);
    setPaymentStatus({ type: 'idle' });
    try {
      await Promise.all([
        api.updateSettings('payment_bank_transfer', {
          bankName: bankSettings.bankName,
          accountNumber: bankSettings.accountNumber,
          accountName: bankSettings.accountName,
          swiftCode: bankSettings.swiftCode,
          iban: bankSettings.iban,
          deadlineHours: Number(bankSettings.deadlineHours) || 24,
          isEnabled: bankSettings.isEnabled,
        }),
        api.updateSettings('payment_dpo', {
          companyToken: dpoSettings.companyToken,
          apiUrl: dpoSettings.apiUrl,
          serviceType: dpoSettings.serviceType,
          redirectUrl: dpoSettings.redirectUrl,
          backUrl: dpoSettings.backUrl,
          isEnabled: dpoSettings.isEnabled,
        }),
        api.updateSettings('payment_mobile_money', {
          isEnabled: mobileMoneySettings.isEnabled,
        }),
        api.updateSettings('payment_card', {
          isEnabled: cardSettings.isEnabled,
        }),
        api.updateSettings('payment_cod', {
          isEnabled: codSettings.isEnabled,
        }),
      ]);
      setPaymentStatus({ type: 'success', message: 'Payment settings updated successfully.' });
    } catch (error) {
      console.error('Failed to save payment settings', error);
      setPaymentStatus({
        type: 'error',
        message: (error as Error).message || 'Failed to update payment settings.',
      });
    } finally {
      setPaymentSaving(false);
    }
  };

  const renderPaymentSettings = () => {
    if (paymentLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-500">Loading payment settings...</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Payment Configuration</h3>
          <p className="mt-1 text-sm text-gray-500">Enable or disable payment methods and configure payment gateway settings.</p>
        </div>

        {/* Payment Method Toggles */}
        <div className="bg-white border rounded-lg p-6 space-y-6">
          <h4 className="text-md font-semibold text-gray-900">Payment Methods</h4>
          
          {/* Card Payments */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Credit / Debit Card</h5>
              <p className="text-sm text-gray-500">Enable card payments via DPO gateway</p>
            </div>
            <button
              type="button"
              onClick={() => setCardSettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                cardSettings.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  cardSettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {/* Mobile Money */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Mobile Money</h5>
              <p className="text-sm text-gray-500">Enable mobile money payments (MTN, Airtel, Zamtel, Orange)</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileMoneySettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                mobileMoneySettings.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  mobileMoneySettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {/* Bank Transfer */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Bank Transfer</h5>
              <p className="text-sm text-gray-500">Enable bank transfer payments</p>
            </div>
            <button
              type="button"
              onClick={() => setBankSettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                bankSettings.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  bankSettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {/* Cash on Delivery */}
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Cash on Delivery</h5>
              <p className="text-sm text-gray-500">Enable cash on delivery payments</p>
            </div>
            <button
              type="button"
              onClick={() => setCodSettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                codSettings.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  codSettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </div>

        {paymentStatus.type !== 'idle' && (
          <div
            className={clsx(
              'rounded-md p-4',
              paymentStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            )}
          >
            <p className="text-sm font-medium">{paymentStatus.message}</p>
          </div>
        )}

        <div className="bg-gray-50 border rounded-lg p-6 space-y-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900">Bank Transfer Configuration</h4>
            <p className="text-sm text-gray-500">Information shown to customers who choose bank transfer.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                value={bankSettings.bankName}
                onChange={(e) => setBankSettings({ ...bankSettings, bankName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                value={bankSettings.accountNumber}
                onChange={(e) => setBankSettings({ ...bankSettings, accountNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Name</label>
              <input
                type="text"
                value={bankSettings.accountName}
                onChange={(e) => setBankSettings({ ...bankSettings, accountName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SWIFT Code</label>
              <input
                type="text"
                value={bankSettings.swiftCode}
                onChange={(e) => setBankSettings({ ...bankSettings, swiftCode: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">IBAN</label>
              <input
                type="text"
                value={bankSettings.iban}
                onChange={(e) => setBankSettings({ ...bankSettings, iban: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Deadline (hours)</label>
              <input
                type="number"
                min={1}
                value={bankSettings.deadlineHours}
                onChange={(e) =>
                  setBankSettings({ ...bankSettings, deadlineHours: Number(e.target.value) || 1 })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-900">DPO Gateway</h4>
              <p className="text-sm text-gray-500">Configure Direct Pay Online credentials.</p>
            </div>
            <button
              type="button"
              onClick={() => setDpoSettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                dpoSettings.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  dpoSettings.isEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Token</label>
              <input
                type="text"
                value={dpoSettings.companyToken}
                onChange={(e) => setDpoSettings({ ...dpoSettings, companyToken: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">API URL</label>
              <input
                type="text"
                value={dpoSettings.apiUrl}
                onChange={(e) => setDpoSettings({ ...dpoSettings, apiUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <input
                type="text"
                value={dpoSettings.serviceType}
                onChange={(e) => setDpoSettings({ ...dpoSettings, serviceType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
              <input
                type="url"
                value={dpoSettings.redirectUrl}
                onChange={(e) => setDpoSettings({ ...dpoSettings, redirectUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Back URL</label>
              <input
                type="url"
                value={dpoSettings.backUrl}
                onChange={(e) => setDpoSettings({ ...dpoSettings, backUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSavePaymentSettings}
            disabled={paymentSaving}
            className={clsx(
              'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white',
              paymentSaving ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
            )}
          >
            {paymentSaving ? 'Saving...' : 'Save Payment Settings'}
          </button>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'api':
        return renderApiSettings();
      case 'payments':
        return renderPaymentSettings();
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <Layout currentPage="Settings">
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3 lg:sticky lg:top-6 lg:self-start">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={clsx(
                  'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <section.icon
                  className={clsx(
                    'mr-3 flex-shrink-0 h-6 w-6',
                    activeSection === section.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {section.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {renderSectionContent()}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

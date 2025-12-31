'use client'

import { Cart } from '@/app/lib/ecommerce/api'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

export function generateQuotePDF(cart: Cart, fulfillmentType: 'pickup' | 'delivery' = 'pickup') {
  // Calculate totals
  const originalTotal = cart.items.reduce(
    (sum, item) => sum + (item.productSnapshot.price ?? 0) * item.quantity,
    0
  )
  const discountedTotal = cart.items.reduce(
    (sum, item) => {
      const originalPrice = item.productSnapshot.price ?? 0
      const discountedPrice = (item.productSnapshot.discountedPrice && item.productSnapshot.discountedPrice > 0)
        ? item.productSnapshot.discountedPrice
        : originalPrice
      return sum + discountedPrice * item.quantity
    },
    0
  )
  const discountAmount = originalTotal - discountedTotal
  const subtotal = cart.subtotal || discountedTotal
  const vatAmount = cart.taxTotal || 0
  const totalAmount = cart.total

  // Calculate VAT percentage
  const taxRates = cart.items
    .map(item => item.taxRate || item.productSnapshot.taxRate)
    .filter((rate): rate is number => rate !== null && rate !== undefined)
  
  let vatPercentage: number | null = null
  if (taxRates.length > 0) {
    const uniqueRates = [...new Set(taxRates)]
    if (uniqueRates.length === 1) {
      vatPercentage = uniqueRates[0]
    } else {
      vatPercentage = subtotal > 0 ? (vatAmount / subtotal) * 100 : null
    }
  } else if (subtotal > 0 && vatAmount > 0) {
    vatPercentage = (vatAmount / subtotal) * 100
  }

  // Create quote HTML
  const quoteDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const itemsHtml = cart.items.map(item => {
    const originalPrice = item.productSnapshot.price ?? 0
    const discountedPrice = (item.productSnapshot.discountedPrice && item.productSnapshot.discountedPrice > 0)
      ? item.productSnapshot.discountedPrice
      : originalPrice
    const itemTotal = discountedPrice * item.quantity

    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(item.productSnapshot.name || 'N/A')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${escapeHtml(item.productSnapshot.sku || 'N/A')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${currencyFormatter(originalPrice, cart.currency)}</td>
        ${discountedPrice < originalPrice ? `<td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; color: #059669;">${currencyFormatter(discountedPrice, cart.currency)}</td>` : '<td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">-</td>'}
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-weight: 600;">${currencyFormatter(itemTotal, cart.currency)}</td>
      </tr>
    `
  }).join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Quote - ${quoteDate}</title>
      <style>
        @media print {
          @page {
            margin: 20mm;
          }
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #1f2937;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          border-bottom: 3px solid #544829;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #544829;
          margin: 0 0 10px 0;
          font-size: 28px;
        }
        .header p {
          margin: 5px 0;
          color: #6b7280;
          font-size: 14px;
        }
        .quote-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 15px;
          background-color: #f9fafb;
          border-radius: 8px;
        }
        .quote-info div {
          flex: 1;
        }
        .quote-info strong {
          display: block;
          margin-bottom: 5px;
          color: #374151;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .items-table th {
          background-color: #544829;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table th:nth-child(2),
        .items-table th:nth-child(3),
        .items-table td:nth-child(2),
        .items-table td:nth-child(3) {
          text-align: center;
        }
        .items-table th:nth-child(4),
        .items-table th:nth-child(5),
        .items-table td:nth-child(4),
        .items-table td:nth-child(5) {
          text-align: right;
        }
        .summary {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        .summary-row.total {
          font-size: 18px;
          font-weight: 700;
          padding-top: 15px;
          margin-top: 15px;
          border-top: 2px solid #e5e7eb;
          color: #544829;
        }
        .summary-label {
          color: #6b7280;
        }
        .summary-value {
          font-weight: 600;
          color: #1f2937;
        }
        .discount {
          color: #059669;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .fulfillment-note {
          margin-top: 20px;
          padding: 15px;
          background-color: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>QUOTE</h1>
        <p><strong>Shreeji Technologies</strong></p>
        <p>Date: ${quoteDate}</p>
        <p>Quote Number: Q-${Date.now().toString().slice(-8)}</p>
      </div>

      <div class="quote-info">
        <div>
          <strong>Fulfillment Method</strong>
          ${fulfillmentType === 'delivery' ? 'Delivery' : 'Store Pickup'}
        </div>
        <div>
          <strong>Valid Until</strong>
          ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Discounted</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal</span>
          <span class="summary-value">${currencyFormatter(subtotal, cart.currency)}</span>
        </div>
        ${discountAmount > 0 ? `
          <div class="summary-row">
            <span class="summary-label">Discount</span>
            <span class="summary-value discount">-${currencyFormatter(discountAmount, cart.currency)}</span>
          </div>
        ` : ''}
        ${fulfillmentType === 'delivery' ? `
          <div class="summary-row">
            <span class="summary-label">Delivery Charges</span>
            <span class="summary-value discount">Free</span>
          </div>
        ` : ''}
        ${vatAmount > 0 ? `
          <div class="summary-row">
            <span class="summary-label">
              Value Added Tax (VAT)
              ${vatPercentage !== null ? `<span style="font-size: 12px; color: #9ca3af;">(${vatPercentage.toFixed(1)}%)</span>` : ''}
            </span>
            <span class="summary-value">${currencyFormatter(vatAmount, cart.currency)}</span>
          </div>
        ` : ''}
        <div class="summary-row total">
          <span>Total Cost (Incl. VAT)</span>
          <span>${currencyFormatter(totalAmount, cart.currency)}</span>
        </div>
      </div>

      ${discountAmount > 0 ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #d1fae5; border-radius: 8px; border-left: 4px solid #059669;">
          <strong style="color: #065f46;">Total Savings:</strong>
          <span style="color: #059669; font-weight: 700; font-size: 18px; margin-left: 10px;">
            ${currencyFormatter(discountAmount, cart.currency)}
          </span>
        </div>
      ` : ''}

      <div class="fulfillment-note">
        <strong>Note:</strong> This is a quotation and does not constitute an order. 
        Prices are valid for 30 days from the quote date. 
        ${fulfillmentType === 'pickup' ? 'Items are available for pickup at our store location.' : 'Delivery charges may apply based on location.'}
      </div>

      <div class="footer">
        <p>For inquiries, contact us at:</p>
        <p><strong>Phone:</strong> +260 77 116 1111 | <strong>Email:</strong> sales@shreeji.co.zm</p>
        <p style="margin-top: 10px;">Thank you for your interest in Shreeji Technologies!</p>
      </div>
    </body>
    </html>
  `

  // Open print window
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to download quote')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}


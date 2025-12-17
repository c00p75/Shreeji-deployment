/**
 * Report Export Utility
 * Handles CSV and PDF export functionality for reports
 */

export interface ExportData {
  headers: string[]
  rows: (string | number)[][]
  title?: string
  dateRange?: { start: string; end: string }
}

/**
 * Export data as CSV
 */
export function exportToCSV(data: ExportData): void {
  const { headers, rows, title, dateRange } = data
  
  // Create CSV content
  let csvContent = ''
  
  // Add title if provided
  if (title) {
    csvContent += `${title}\n`
  }
  
  // Add date range if provided
  if (dateRange) {
    csvContent += `Date Range: ${dateRange.start} to ${dateRange.end}\n`
  }
  
  // Add empty line
  if (title || dateRange) {
    csvContent += '\n'
  }
  
  // Add headers
  csvContent += headers.map(h => `"${h}"`).join(',') + '\n'
  
  // Add rows
  rows.forEach(row => {
    csvContent += row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const cellStr = String(cell)
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`
      }
      return cellStr
    }).join(',') + '\n'
  })
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', generateFilename(title || 'report', 'csv'))
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

/**
 * Export data as PDF using browser print
 * Note: For better PDF generation with charts, consider using jspdf + html2canvas
 */
export function exportToPDF(data: ExportData): void {
  const { headers, rows, title, dateRange } = data
  
  // Create a temporary table element
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to export PDF')
    return
  }
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title || 'Report'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        h1 {
          margin-bottom: 10px;
        }
        .date-range {
          margin-bottom: 20px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        @media print {
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      ${title ? `<h1>${title}</h1>` : ''}
      ${dateRange ? `<div class="date-range">Date Range: ${dateRange.start} to ${dateRange.end}</div>` : ''}
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              ${row.map(cell => `<td>${escapeHtml(String(cell))}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `
  
  printWindow.document.write(html)
  printWindow.document.close()
  
  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}

/**
 * Generate filename with timestamp
 */
function generateFilename(title: string, extension: string): string {
  const date = new Date().toISOString().split('T')[0]
  const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-')
  const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `${sanitizedTitle}-${date}-${time}.${extension}`
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}


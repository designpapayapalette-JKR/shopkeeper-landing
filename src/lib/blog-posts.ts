export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-gst-invoice-complete-guide",
    title: "What is a GST Invoice? Complete Guide for Indian Shopkeepers",
    description:
      "Everything a shopkeeper needs to know about GST invoices — tax invoice vs bill of supply, mandatory fields, CGST/SGST/IGST splits, and common mistakes to avoid.",
    date: "2026-01-15",
    author: "managemycounter Team",
    category: "GST",
    readingTime: "8 min read",
    content: `
## What is a GST Invoice?

A GST invoice is a document issued by a GST-registered seller to a buyer listing the goods or services supplied, their value, and the GST charged. It is legally required for every taxable supply and is essential for the buyer to claim Input Tax Credit (ITC).

## Mandatory Fields on a GST Invoice

Under GST law, every tax invoice must contain:

1. **Invoice number** — unique, sequential, maximum 16 characters per financial year
2. **Invoice date**
3. **Supplier details** — name, address, GSTIN
4. **Recipient details** — name, address, GSTIN (if registered)
5. **HSN/SAC code** — for goods (HSN) or services (SAC)
6. **Item description**, quantity, unit, total value
7. **Taxable value** — before GST
8. **Rate and amount of GST** — CGST + SGST for intra-state, IGST for inter-state
9. **Place of supply**
10. **Signature** of the supplier

Get any of these wrong and the invoice is legally invalid for the buyer's ITC claim.

## Tax Invoice vs Bill of Supply

- **Tax Invoice** — used for taxable supplies, shows GST amounts
- **Bill of Supply** — used by composition scheme dealers or for exempt supplies, shows NO GST

## How CGST / SGST / IGST Splits Work

- **Intra-state sale** (buyer and seller in same state): tax splits as CGST (half) + SGST (half). E.g. 18% GST = 9% CGST + 9% SGST.
- **Inter-state sale** (different states): full rate charged as IGST. E.g. 18% GST = 18% IGST.

A good billing system computes this automatically from the place of supply — never do this manually.

## Common Mistakes to Avoid

- Missing or invalid GSTIN
- Wrong HSN code leading to wrong tax rate
- Not maintaining sequential invoice numbering
- Mixing inter-state and intra-state tax treatment

Using digital billing software like managemycounter eliminates all of these by automating the compliance.
`,
  },
  {
    slug: "cgst-sgst-igst-difference-guide",
    title: "CGST vs SGST vs IGST: How GST Tax Splits Work for Your Shop",
    description:
      "Understanding CGST, SGST, and IGST is essential for every Indian shopkeeper. Learn how tax splits work, when each applies, and how billing software automates it all.",
    date: "2026-01-22",
    author: "managemycounter Team",
    category: "GST",
    readingTime: "6 min read",
    content: `
## The Three Components of GST

India's Goods and Services Tax has three components. Which one applies depends entirely on where the buyer and seller are located.

### CGST (Central GST)
Collected by the central government on **intra-state** supplies. Rate = half of the total GST rate.

### SGST (State GST)
Collected by the state government on **intra-state** supplies. Rate = half of the total GST rate.

### IGST (Integrated GST)
Collected by the central government on **inter-state** supplies. Rate = the full GST rate (no split).

## Real Example

Your shop is in **Delhi**. You sell to a customer in **Delhi**:
- GST rate = 18%
- You charge: **9% CGST + 9% SGST** = 18%

Same shop, sale to a customer in **Mumbai**:
- GST rate = 18%
- You charge: **18% IGST** (no CGST/SGST split)

## Why This Matters for Your Billing

Getting this wrong means:
- Under-charging tax → liability falls on you
- Over-charging tax → customer may dispute
- Wrong return filing → notices from GST department

## How Software Helps

A proper billing system like managemycounter:
- Compares your business state vs customer state automatically
- Computes the correct tax split
- Generates audit-ready GST invoices every time
- Produces GSTR-1 ready exports at month-end

No manual calculation, no errors, no compliance headache.
`,
  },
  {
    slug: "delivery-challan-under-gst-rule-55",
    title: "Delivery Challan under GST Rule 55: Complete Guide",
    description:
      "GST Rule 55 governs delivery challans for goods movement without a sale. Learn what a challan must contain, when it's needed, and how to stay compliant.",
    date: "2026-02-05",
    author: "managemycounter Team",
    category: "Compliance",
    readingTime: "7 min read",
    content: `
## What is a Delivery Challan under GST?

A delivery challan is a document that accompanies goods when they are transported **without a sale** — for job work, exhibition, sales return, or line sales. Unlike an invoice, it does not create a receivable.

## When is a Delivery Challan Required?

Under GST Rule 55, a delivery challan is required when:

1. **Supply without invoice** — goods sent for job work, on approval, or for exhibition
2. **Sales return** — goods returned by a customer
3. **Line sales** — goods dispatched from one branch to another
4. **Own use** — stock transferred between your own warehouses

## Mandatory Fields on a Challan

- Challan number and date
- Supplier name, address, GSTIN
- Recipient name, address, GSTIN (if registered)
- **Reason for transport** — supply without invoice / export / job work / sales return / line sales / exhibition / own use / others
- Place of supply
- Transport mode — road / air / rail / ship
- Vehicle number (for road transport)
- Item details — description, HSN code, quantity, taxable value, tax rate
- Total taxable value

## Common Mistakes

- Using a challan when a tax invoice is legally required
- Missing the reason for transport
- Not linking the challan to the originating invoice (for sales returns)

## Digital Challans

With managemycounter, you can generate GST Rule 55-compliant delivery challans directly from your invoice — all fields pre-filled, linked to the original sale, and printable in 3-copy format for the driver, customer, and your records.
`,
  },
  {
    slug: "gst-composition-scheme-guide",
    title: "GST Composition Scheme Explained for Small Indian Businesses",
    description:
      "The GST Composition Scheme lets small businesses pay tax at a flat rate with minimal compliance. Find out if your shop is eligible, how it works, and what changes.",
    date: "2026-02-18",
    author: "managemycounter Team",
    category: "GST",
    readingTime: "6 min read",
    content: `
## What is the GST Composition Scheme?

The Composition Scheme is a simplified GST regime for small businesses — pay tax at a flat percentage of turnover instead of the regular itemized rates. In exchange, compliance is much lighter.

## Who is Eligible?

- Businesses with annual turnover up to **₹1.5 crore** (₹75 lakh in specified NE states)
- **Not eligible:** service providers (except restaurants), casual taxpayers, ice cream/pan masala/tobacco manufacturers, e-commerce sellers, inter-state suppliers

## How Tax Works Under Composition

Instead of charging CGST + SGST or IGST on every sale, you:
- Pay tax at a flat rate on your **total turnover**
- Rates (as of latest): 1% for traders, 2% for manufacturers, 6% for restaurants
- File returns once per quarter (instead of monthly)

## Important: You Cannot Charge GST to Customers

Composition dealers issue a **Bill of Supply**, not a tax invoice. This document:
- Shows no GST amount (not even 0%)
- Still requires supplier/recipient GSTIN, HSN code, item description, quantity, rate, and total
- Cannot be used by the buyer to claim Input Tax Credit

## What You Give Up

- Cannot claim Input Tax Credit on your own purchases
- Cannot sell inter-state
- Cannot sell through e-commerce platforms like Amazon/Flipkart

## Is the Composition Scheme Right for You?

For small kirana stores and local shops with primarily local customers, the Composition Scheme dramatically reduces compliance burden. For businesses selling across states or to GST-registered buyers who need ITC, the regular scheme is better.

managemycounter supports both — choose your scheme in settings, and the system automatically generates the right document type (tax invoice or bill of supply).
`,
  },
  {
    slug: "how-to-manage-udhaar-credit-ledger",
    title: "How to Manage Udhaar (Credit Ledger) for Your Shop",
    description:
      "Stop using a notebook for udhaar. Learn how digital credit ledger management works — track who owes you, send WhatsApp reminders, and never lose track of outstanding payments.",
    date: "2026-03-02",
    author: "managemycounter Team",
    category: "Accounting",
    readingTime: "5 min read",
    content: `
## The Old Way: Bahi-Khata

Every Indian shopkeeper knows the bahi-khata — the notebook where udhaar (credit) transactions are recorded. It works until it doesn't: pages get lost, customers deny the amount, and chasing payments means flipping through pages and making phone calls.

## The Digital Way: Credit Ledger

A digital credit ledger transforms udhaar management into a real-time, trackable system.

### Running Balance
Every transaction — sale, payment, credit note — updates the customer's balance instantly. No more adding up columns at month-end.

### Per-Invoice Tracking
Link each payment to the specific invoice it settles. Outstanding balance becomes a precise, reconciled number, not a rough estimate.

### Aging Analysis
See exactly who owes what and how overdue each amount is:
- Current (0-30 days)
- 30-60 days
- 60-90 days
- 90+ days (high risk)

### WhatsApp Payment Reminders
Instead of awkward phone calls, send a pre-filled WhatsApp message with the outstanding amount. One tap, no confrontation.

## Benefits of Digital Udhaar Management

1. **Never lose a record** — cloud-synced, backed up automatically
2. **Know your position** — total receivables, worst offenders, cash flow impact
3. **Faster recovery** — WhatsApp reminders get paid 3x faster than phone calls
4. **CA-ready reports** — aging reports, party statements, outstanding summaries

managemycounter's credit ledger handles all of this out of the box — the same system that generates your GST invoices also tracks who still needs to pay you.
`,
  },
  {
    slug: "barcode-billing-guide-indian-retailers",
    title: "Barcode Billing Guide for Indian Retailers",
    description:
      "How barcode billing works for Indian shops — scan products at checkout, manage inventory, print labels, and speed up your counter. Complete guide for kirana and retail stores.",
    date: "2026-03-15",
    author: "managemycounter Team",
    category: "Inventory",
    readingTime: "6 min read",
    content: `
## What is Barcode Billing?

Barcode billing is the practice of scanning product barcodes at the checkout counter to automatically identify the product, retrieve its price, and add it to the bill. No manual searching, no typing product names.

## Benefits for Your Shop

### Speed at the Counter
Scanning a barcode takes less than a second — much faster than typing a product name or SKU. During rush hours, this saves minutes per customer.

### Accuracy
Human error in price entry disappears. The system always uses the correct price for the scanned product.

### Inventory Management
Every scan updates your stock in real time. You always know what's left, what's selling fast, and what needs reordering.

## Types of Barcodes

### 1D Barcodes (UPC / EAN)
The standard barcode on most packaged products. A simple vertical-line pattern encoding a product identifier.

### 2D Barcodes (QR Codes)
Can encode more data — a product URL, batch number, or expiry date. Useful for internal tracking.

## Printing Your Own Barcodes

For loose items or products without manufacturer barcodes, you can:
1. Generate barcodes within your billing software
2. Print them on adhesive labels
3. Stick them on products or racks
4. Scan at checkout like any other product

## Hardware You Need

- A barcode scanner (USB or Bluetooth, starts at ₹2,000)
- A thermal barcode printer (optional, for printing labels)
- A smartphone with camera (many billing apps support camera-based scanning)

managemycounter supports both scanner-based and camera-based barcode scanning across its web dashboard and Android apps.
`,
  },
  {
    slug: "september-2025-gst-rate-changes",
    title: "September 2025 GST Rate Changes: What Shopkeepers Need to Know",
    description:
      "The GST Council restructured tax slabs effective September 2025. Major changes include 28% to 18% for appliances, 12-18% to 5% for household essentials. Complete guide for Indian retailers.",
    date: "2026-03-28",
    author: "managemycounter Team",
    category: "GST",
    readingTime: "7 min read",
    content: `
## Overview of the September 2025 GST Reform

The GST Council announced a major restructuring of tax slabs effective **September 22, 2025**, moving from a 4-tier system (5/12/18/28%) to a simplified 2-tier structure plus a de-merit rate.

## Key Changes

### From 28% to 18% (Standard Rate)
- Large appliances: TVs over 32", ACs, dishwashers, washing machines
- Vehicles: small cars, two-wheelers, buses, trucks
- Cement

### From 12-18% to 5% (Merit Rate)
- Household essentials: soaps, shampoo, toothpaste, detergents
- Agricultural equipment: tractors, harvesters, irrigation tools
- Man-made textile fibers and yarn
- Budget hotel stays under ₹7,500/night
- Gyms, salons, yoga services

### New 40% (De-merit Rate)
- Luxury vehicles
- Tobacco products
- Alcoholic beverages
- Aerated drinks

### Newly 0% (Exempted)
- Life and health insurance premiums (was 18%)
- 33 specific life-saving medicines (was 12%)
- Basic educational supplies (exercise books, pencils)
- UHT milk and pre-packaged paneer (was 5%)

## What Shopkeepers Must Do

If you sell any of the affected items, you must:

1. **Identify affected products** in your catalog
2. **Update GST rates** before September 22, 2025
3. **Verify** that new invoices use correct rates

Bills issued after the effective date with old rates are non-compliant — you are either overcharging or undercharging tax.

## How Software Can Help

A good billing system should help you:
- Bulk-identify products with affected HSN codes
- Review and update GST rates in one pass
- Ensure all invoices after the effective date use updated rates

managemycounter's GST Rate Tools let you review your entire catalog for mismatches and apply bulk updates — making a reform like this a one-click exercise instead of a manual item-by-item grind.
`,
  },
  {
    slug: "switch-from-bahi-khata-to-digital-billing",
    title: "How to Switch from Bahi-Khata to Digital Billing (Step by Step)",
    description:
      "Ready to move from your notebook to digital billing? Here's exactly how to switch — from setting up your products to training your staff and migrating your udhaar records. No tech experience needed.",
    date: "2026-04-10",
    author: "managemycounter Team",
    category: "Business Tips",
    readingTime: "8 min read",
    content: `
## Why Switch from Bahi-Khata to Digital?

Every shopkeeper who switches says the same thing: "I wish I'd done this sooner." Here's what changes:

- **No more adding up columns** at closing time — totals calculate themselves
- **No more lost pages** — your data is cloud-synced and backed up
- **No more chasing udhaar** — WhatsApp reminders go out in one tap
- **No more GST anxiety** — every invoice is automatically compliant
- **No more end-of-month Excel punching** — reports build themselves

## Step 1: Set Up Your Business Profile

Open the app and enter:
- Your shop name, address, GSTIN
- Your state (this determines tax calculations)
- Your default invoice numbering prefix

## Step 2: Add Your Products

Start with your best-selling 20-30 items. Include:
- Product name, price, cost
- GST rate (the system suggests this from the HSN code)
- Opening stock quantity
- Barcode (scan the existing one or generate a new one)

## Step 3: Add Your Regular Customers

For customers who buy on credit:
- Name, phone number
- Current outstanding balance (as an opening balance)
- Whether they owe you or you owe them

## Step 4: Train Your Staff

The counter workflow is simple:
1. Search or scan the product
2. Enter the quantity
3. Select the customer (for credit sales)
4. Collect payment and share the receipt

Most staff learn it in one shift.

## Step 5: Go Live

Start with digital billing for cash sales. Keep your notebook as a backup for the first week. Within a month, you won't need it anymore.

## Common Concerns

**"What if the internet goes down?"**
Offline-first apps keep working. Data syncs automatically when the connection returns.

**"What about my old udhaar records?"**
Enter them as opening balances — your ledger stays complete from day one.

**"Is it secure?"**
Role-based access means staff see only what they need. Data is encrypted and backed up.

managemycounter was built for this exact transition — the app uses the same words (khata, udhaar, hisab) you already use at your counter. No accounting degree required.
`,
  },
];

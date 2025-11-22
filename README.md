<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9c6dc8db-4289-4658-819d-02b3a80612ea" />📦 StockMaster – Inventory Management System (IMS)

StockMaster is a modular and scalable Inventory Management System that digitizes and automates all stock-related operations.
It replaces manual registers, spreadsheets, and scattered tools with a centralized, real-time, role-based inventory management platform.

🚀 Features Overview
🔐 Authentication

User Signup / Login

OTP-based Password Reset

Post-login redirect to Dashboard

📊 Dashboard

Displays live snapshots of inventory KPIs:

Total Products in Stock

Low / Out of Stock Items

Pending Receipts

Pending Deliveries

Scheduled Internal Transfers

🔍 Dynamic Filters

Filter operations by:

Document Type: Receipts / Delivery / Transfers / Adjustments

Status: Draft, Waiting, Ready, Done, Canceled

Warehouse / Location

Product Category

👥 Target Users

Inventory Managers – Manage incoming/outgoing stock

Warehouse Staff – Transfers, picking, shelving, counting

🧭 Modules & Navigation

Products

Operations

Receipts

Delivery Orders

Transfers

Adjustments

Move History

Dashboard

Settings (Warehouses)

Profile & Logout

📌 Core Functionalities
1️⃣ Product Management

Create and manage product data with:

Product Name

SKU / Code

Category

Unit of Measure

Initial Stock

Stock per location

Reordering rules

2️⃣ Receipts (Incoming Stock)

Used for items received from vendors.

Flow:

Create receipt

Add supplier & products

Enter received quantity

Validate → System increases stock automatically

Example:
Receive 50 units of Steel Rods → Stock +50

3️⃣ Delivery Orders (Outgoing Stock)

Used for customer shipments.

Flow:

Pick

Pack

Validate → System decreases stock

Example:
Sale of 10 chairs → Stock –10

4️⃣ Internal Transfers

Move stock inside the company:

Warehouse → Warehouse

Rack → Rack

Store → Production floor

Every movement is tracked in the Stock Ledger.

5️⃣ Stock Adjustments

Fix mismatches between physical count and system-recorded stock.

Steps:

Select product & location

Enter actual counted quantity

System updates stock & logs adjustments

🔔 Additional Features

Low-stock alerts

Multi-warehouse support

Fast SKU search

Smart filtering

Complete move history

📘 Inventory Flow (Simple Explanation)
Step 1 – Receive Goods

Receive 100kg steel
→ Stock +100

Step 2 – Internal Transfer

Move steel to Production Rack
→ Total stock same, but location changes

Step 3 – Deliver Goods

Deliver 20kg steel
→ Stock –20

Step 4 – Adjust Damaged Goods

3kg steel damaged
→ Stock –3

All changes logged in the Ledger.

🛠 Tech Stack (Backend)

Spring Boot

Java

REST APIs

PostgreSQL (PGAdmin for DB)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d7fff63b-79ad-4a55-8183-26e103023c67" />
![WhatsApp Image 2025-11-22 at 17 01 17_66e80623](https://github.com/user-attachments/assets/c20c2c7e-5609-4da6-b78d-69b7ced5d262)












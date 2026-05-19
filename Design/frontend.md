# Property Listing Website — Frontend Documentation

# Recommended Frontend Stack

## Framework
Next.js 15

## Language
TypeScript

## Styling
Tailwind CSS

## Animation
Framer Motion

## Icons
Lucide React

## State Management
Zustand

## Form Handling
React Hook Form

## Validation
Zod

## API Calls
Axios

## Authentication
Clerk/Auth.js/Firebase

## Carousel
Swiper.js

## Maps
Google Maps API

## Image Optimization
Next/Image

---

# Project Structure

src/
│
├── app/
├── components/
├── sections/
├── features/
├── hooks/
├── services/
├── store/
├── utils/
├── constants/
├── styles/
└── assets/

---

# Main Pages

## Homepage
/

## Buy Properties
/buy

## Rent Properties
/rent

## Commercial
/commercial

## Property Details
<!-- /property/[id] -->
redirect to there website


---

# Homepage Structure

1. Navbar
2. Hero Section
3. Search + Advertisement Section
4. Trending Cities
5. Featured Listings
6. Property Categories
7. New Projects
8. Why Choose Us
9. Testimonials
11. Footer

---

# Hero Section Frontend

# Layout

Use:
- CSS Grid
OR
- Flexbox

Structure:
70% Search Area
30% Advertisement Area

---

# Hero Left Side

Contains:
- Heading
- Subheading
- Search Tabs
- Search Form

---

# Hero Right Side

Contains:
- Advertisement Banner
- Featured Builder Card
- Loan Promotion Card

---

# Search Component

# Features

## Tabs
- Buy
- Rent
- Commercial
- PG
- Plot

---

# Search Inputs

Use:
- Combobox
- Multi-select
- Auto-complete

Fields:
- Location
- Property Type
- Budget
- BHK
- Search Button

---

# Search UX

Must include:
- Recent searches
- Popular locations
- Search suggestions
- Voice search
- Clear filters

---

# Advertisement Component

# Purpose

Display:
- Premium projects
- Builder promotions
- Sponsored properties

---

# Ad Card Features

Include:
- Property image
- Builder logo
- CTA button
- Discount/highlight tag

---

# Property Card Component

Reusable component.

# Includes

- Property image
- Price
- Address
- BHK
- Sq.ft
- Amenities
- Verified badge
- Favorite button
- Compare button

---

# Property Card Hover Effects

Use:
- Image zoom
- Soft lift animation
- Shadow increase

---

# Listing Page Layout

# Desktop

Left:
Sticky filters sidebar

Right:
Property listing grid/list

---

# Mobile

Use:
- Bottom filter sheet
- Sticky search bar
- Floating sort button

---

# Filters Component

# Features

## Basic Filters
- Budget
- Property Type
- BHK
- Furnishing

## Advanced Filters
- Parking
- Gym
- Pool
- Lift
- Facing
- Verified

---

# Property Details Page

# Sections

## 1. Image Gallery
Use Swiper.js

## 2. Overview
Price
Location
Description

## 3. Amenities

## 4. Floor Plans

## 5. Map Section

## 6. Nearby Places

## 7. Similar Listings

## 8. Sticky Inquiry Form

---
# Performance Optimization

Use:
- Lazy loading
- Infinite scroll
- Dynamic imports
- Skeleton loaders
- Virtualized list rendering

# Responsive Breakpoints

## Mobile
<768px

## Tablet
768px–1024px

## Desktop
>1024px

---

# Animation Guidelines

Use:
- Framer Motion
- Smooth transitions
- Card hover effects

Avoid:
- Over-animation
- Slow rendering

---

# UI Components Needed

# Buttons
- Primary
- Secondary
- Outline
- Ghost

---

# Cards
- Property Card
- Testimonial Card
- Builder Card
- Ad Card

---

# Modals
- Login Modal
- Filter Modal
- Inquiry Modal

---

# Inputs
- Search Input
- Multi-select
- Dropdown
- Date Picker

---

# Suggested Advanced Features

## AI Features
- AI property recommendation
- Smart search
- AI locality suggestions

## Virtual Tours
- 360° property support

## Chat System
- Buyer-Agent messaging

## Notifications
- Email alerts
- Push notifications

---

# Backend Integration Requirements

Frontend should support:
- Real-time property updates
- Listing moderation
- Admin approval
- Dynamic filters
- Search indexing

---

# Important UX Rules

Must Have:
- Fast loading
- Large images
- Sticky search
- Clear CTA buttons
- Mobile optimization

Avoid:
- Clutter
- Fake urgency
- Too many popups
- Heavy animations

---

# Final Frontend Goal

Build a platform that combines:
- MagicBricks functionality
- Housing.com UI quality
- Airbnb visual polish

The final experience should feel:
- Premium
- Fast
- Modern
- Trustworthy
- Easy to browse
- Highly conversion-focused
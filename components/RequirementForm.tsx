"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Home,
    DollarSign,
    CheckCircle2,
    X,
    Check,
    ArrowRight,
    ClipboardList,
    Sparkles
} from "lucide-react";

interface RequirementFormProps {
    initialCity?: string;
    initialType?: string;
    initialBudget?: string;
    isModal?: boolean;
    onClose?: () => void;
}

export default function RequirementForm({
    initialCity = "Pune",
    initialType = "Flat",
    initialBudget = "All",
    isModal = false,
    onClose
}: RequirementFormProps) {
    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState(initialCity);
    const [type, setType] = useState(initialType);
    const [locality, setLocality] = useState("");
    const [budget, setBudget] = useState(initialBudget);
    const [bhk, setBhk] = useState<number[]>([2]);
    const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
    const [timeframe, setTimeframe] = useState("Immediate");
    const [agree, setAgree] = useState(true);

    // Field Errors
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Prepopulate if props change
    useEffect(() => {
        if (initialCity) setCity(initialCity);
        if (initialType) setType(initialType);
        if (initialBudget) setBudget(initialBudget);
    }, [initialCity, initialType, initialBudget]);

    // Validation handler
    const validateField = (fieldName: string, value: any) => {
        let errorMsg = "";
        if (fieldName === "name") {
            if (!value.trim()) {
                errorMsg = "Full Name is required";
            } else if (value.trim().length < 3) {
                errorMsg = "Name must be at least 3 characters";
            }
        }
        if (fieldName === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                errorMsg = "Email Address is required";
            } else if (!emailRegex.test(value)) {
                errorMsg = "Please enter a valid email address";
            }
        }
        if (fieldName === "phone") {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!value) {
                errorMsg = "Mobile Number is required";
            } else if (!phoneRegex.test(value)) {
                errorMsg = "Enter a valid 10-digit mobile number starting with 6-9";
            }
        }
        if (fieldName === "locality") {
            if (!value.trim()) {
                errorMsg = "Locality / Area is required";
            }
        }
        if (fieldName === "agree") {
            if (!value) {
                errorMsg = "You must agree to receive notifications";
            }
        }

        setErrors((prev) => {
            const updated = { ...prev };
            if (errorMsg) {
                updated[fieldName] = errorMsg;
            } else {
                delete updated[fieldName];
            }
            return updated;
        });

        return !errorMsg;
    };

    const handleBhkToggle = (val: number) => {
        setBhk((prev) =>
            prev.includes(val) ? prev.filter((b) => b !== val) : [...prev, val]
        );
    };

    // Submit Handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField("name", name);
        const isEmailValid = validateField("email", email);
        const isPhoneValid = validateField("phone", phone);
        const isLocalityValid = validateField("locality", locality);
        const isAgreeValid = validateField("agree", agree);

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isLocalityValid || !isAgreeValid) {
            // Find first error and scroll to it or alert
            return;
        }

        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Save requirement to localStorage so the application can interact with it later
            const reqObj = {
                id: "req-" + Date.now(),
                name,
                email,
                phone,
                city,
                type,
                locality,
                budget,
                bhk,
                purpose,
                timeframe,
                date: new Date().toLocaleDateString()
            };

            try {
                const existing = JSON.parse(localStorage.getItem("user_requirements") || "[]");
                localStorage.setItem("user_requirements", JSON.stringify([reqObj, ...existing]));
            } catch (err) {
                console.error("Could not save to localStorage", err);
            }
        }, 1500);
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setLocality("");
        setErrors({});
        setIsSubmitted(false);
    };

    // The actual form content
    const formElement = (
        <div className="w-full overflow-y-scroll h-[85vh] scrollbar-hide text-left">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                    <span className=" underline decoration-primary decoration-dotted underline-offset-4 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                        Matching Alerts
                    </span>
                    <h2 className="text-[#0F172A] text-xl md:text-2xl font-bold flex items-center gap-2">
                        <ClipboardList className="text-primary" size={22} />
                        Post Your Property Requirement
                    </h2>
                    <p className="text-gray-500 text-xs mt-1">
                        Can't find what you are looking for? Give us your details, and top agents/owners will contact you!
                    </p>
                </div>
                {isModal && onClose && (
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-all cursor-pointer border border-gray-200"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Section 1: Property Preferences */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 md:p-5 space-y-4">
                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-1.5 border-b border-gray-100 pb-2 mb-1">
                        <Home size={15} className="text-primary" />
                        What are you looking for?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Purpose: Buy / Rent */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Purpose</label>
                            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                                {(["Buy", "Rent"] as const).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPurpose(p)}
                                        className={`py-2 text-xs font-bold rounded-lg transition-all ${purpose === p
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-gray-500 hover:text-gray-800"
                                            }`}
                                    >
                                        {p === "Buy" ? "Buy Property" : "Rent Property"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Type */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Property Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-semibold outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="Flat">Flat / Apartment</option>
                                <option value="House">House / Villa</option>
                                <option value="Plot">Plot / Land</option>
                                <option value="Commercial">Commercial Office/Shop</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* City */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">City</label>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-semibold outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Delhi NCR">Delhi NCR</option>
                            </select>
                        </div>

                        {/* Locality */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                                Locality / Area <span className="text-rose-500 font-black">*</span>
                            </label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Kothrud, Bandra, Whitefield"
                                    value={locality}
                                    onChange={(e) => {
                                        setLocality(e.target.value);
                                        if (errors.locality) validateField("locality", e.target.value);
                                    }}
                                    onBlur={(e) => validateField("locality", e.target.value)}
                                    className={`w-full h-11 pl-10 pr-4 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.locality
                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10"
                                        : "border-gray-200 focus:border-primary"
                                        }`}
                                />
                            </div>
                            {errors.locality && (
                                <p className="text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-rose-500" /> {errors.locality}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Budget */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Max Budget</label>
                            <select
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-semibold outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="All">No Max Budget</option>
                                <option value="30">₹30 Lac</option>
                                <option value="50">₹50 Lac</option>
                                <option value="90">₹90 Lac</option>
                                <option value="150">₹1.5 Cr</option>
                                <option value="300">₹3 Cr</option>
                                <option value="500">₹5 Cr</option>
                                <option value="1000">₹10 Cr+</option>
                            </select>
                        </div>

                        {/* Timeframe */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">When do you plan to acquire?</label>
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-semibold outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="Immediate">Immediately (Within 15 days)</option>
                                <option value="30 days">Within 30 Days</option>
                                <option value="90 days">Within 3 Months</option>
                                <option value="Flexible">Just Browsing / Flexible</option>
                            </select>
                        </div>
                    </div>

                    {/* BHK Type selection (flats/houses only) */}
                    {(type === "Flat" || type === "House") && (
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Select BHK Configuration</label>
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => handleBhkToggle(num)}
                                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${bhk.includes(num)
                                            ? "bg-rose-50 border-primary text-primary"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] ${bhk.includes(num) ? "bg-primary border-primary text-white" : "border-gray-300"
                                            }`}>
                                            {bhk.includes(num) && <Check size={8} strokeWidth={4} />}
                                        </span>
                                        {num === 4 ? "4+ BHK" : `${num} BHK`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 2: Personal Contact Details */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 md:p-5 space-y-4">
                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-1.5 border-b border-gray-100 pb-2 mb-1">
                        <User size={15} className="text-primary" />
                        Your Contact Information
                    </h3>

                    {/* Full Name */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                            Full Name <span className="text-rose-500 font-black">*</span>
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) validateField("name", e.target.value);
                                }}
                                onBlur={(e) => validateField("name", e.target.value)}
                                className={`w-full h-11 pl-10 pr-4 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.name
                                    ? "border-rose-400 focus:border-rose-500 bg-rose-50/10"
                                    : "border-gray-200 focus:border-primary"
                                    }`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-rose-500" /> {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email Address */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                                Email Address <span className="text-rose-500 font-black">*</span>
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) validateField("email", e.target.value);
                                    }}
                                    onBlur={(e) => validateField("email", e.target.value)}
                                    className={`w-full h-11 pl-10 pr-4 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.email
                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10"
                                        : "border-gray-200 focus:border-primary"
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-rose-500" /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                                Mobile Number <span className="text-rose-500 font-black">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+91</span>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "");
                                        setPhone(val);
                                        if (errors.phone) validateField("phone", val);
                                    }}
                                    onBlur={(e) => validateField("phone", e.target.value)}
                                    className={`w-full h-11 pl-14 pr-4 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.phone
                                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/10"
                                        : "border-gray-200 focus:border-primary"
                                        }`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-rose-500" /> {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Aggreement Terms Checkbox */}
                    <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => {
                                    setAgree(e.target.checked);
                                    validateField("agree", e.target.checked);
                                }}
                                className="w-4.5 h-4.5 accent-primary rounded border-gray-300 focus:ring-0 cursor-pointer mt-0.5"
                            />
                            <span className="text-xs text-gray-500 leading-normal">
                                I agree to be contacted by MagicHomes and verified property sellers/agents via Call, SMS, or WhatsApp. I accept the <span className="underline hover:text-gray-700">Terms of Use</span> and <span className="underline hover:text-gray-700">Privacy Policy</span>.
                            </span>
                        </label>
                        {errors.agree && (
                            <p className="text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-rose-500" /> {errors.agree}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                    {isModal && onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-12 px-6 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 md:flex-initial bg-primary hover:bg-primary-dark disabled:bg-red-400 text-white h-12 px-8 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Posting Requirement...
                            </>
                        ) : (
                            <>
                                Submit Requirement
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );

    // Success Feedback Element
    const successElement = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 px-5 flex flex-col items-center justify-center"
        >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 mb-6 relative">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 150 }}
                >
                    <CheckCircle2 size={44} strokeWidth={2.5} />
                </motion.div>

                {/* Sparkle micro-elements */}
                <span className="absolute -top-1 -right-1 text-yellow-400 animate-bounce">✨</span>
                <span className="absolute -bottom-1 -left-1 text-emerald-400 animate-ping duration-1000">✨</span>
            </div>

            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
                Successfully Submitted
            </span>
            <h3 className="text-gray-800 text-xl md:text-2xl font-black mb-2">Requirement Posted Free!</h3>
            <p className="text-gray-500 text-xs max-w-[480px] leading-relaxed mb-8">
                Thank you, <span className="font-bold text-gray-800">{name}</span>! We have captured your requirement details. We will alert our premium, verified property owners and local agents in <span className="font-bold text-primary">{locality}, {city}</span>.
            </p>

            {/* Submitted Requirement Details Summary */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left w-full max-w-[500px] mb-8 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-primary" /> Summary of matches requested:
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-medium">
                    <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Property Type</span>
                        <span className="text-gray-700 font-bold text-sm">
                            {(type === "Flat" || type === "House") && bhk.length > 0 ? `${bhk.sort().join(", ")} BHK ` : ""}
                            {type}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Location Preference</span>
                        <span className="text-gray-700 font-bold text-sm">{locality}, {city}</span>
                    </div>
                    <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Budget Limit</span>
                        <span className="text-primary font-extrabold text-sm">
                            {budget === "All" ? "No Max Limit" : `Under ₹${budget} Lac`}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Requirement Type</span>
                        <span className="text-gray-700 font-bold text-sm">{purpose === "Buy" ? "To Buy" : "To Rent"}</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-400 block text-[10px] uppercase">Timeframe</span>
                        <span className="text-gray-700 font-bold">{timeframe === "Immediate" ? "Immediately (Within 15 Days)" : `Within ${timeframe}`}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 w-full max-w-[320px]">
                <button
                    onClick={resetForm}
                    className="flex-1 py-3 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 flex items-center justify-center cursor-pointer"
                >
                    Post Another
                </button>
                {isModal && onClose ? (
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow active:scale-98 flex items-center justify-center cursor-pointer"
                    >
                        Close Window
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (onClose) onClose();
                        }}
                        className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow active:scale-98 flex items-center justify-center cursor-pointer"
                    >
                        Done
                    </button>
                )}
            </div>
        </motion.div>
    );

    // Return layout based on modal prop
    if (isModal) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-hide">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-[650px] p-6 md:p-8 relative overflow-hidden scrollbar-hide"
                >
                    {/* Subtle design accents */}
                    {/* <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0F3E66] via-[#0A2944] to-[#FFC107]" /> */}

                    {isSubmitted ? successElement : formElement}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl w-full p-2 md:p-8 relative overflow-hidden scrollbar-hide">
            {/* Subtle design accents */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0F3E66] via-[#0A2944] to-[#FFC107]" />

            {isSubmitted ? successElement : formElement}
        </div>
    );
}

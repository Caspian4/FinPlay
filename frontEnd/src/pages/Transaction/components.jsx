
import React, { useState } from "react"


// Input
export const Input = ({ className = "", type = "text", ...props }) => (
    <input
        type={type}
        className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
    />
)

// Badge
export const Badge = ({ children, className = "", variant = "default", ...props }) => {
    const styles = {
        default: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-900",
        destructive: "bg-red-500 text-white",
        outline: "border border-gray-300 text-gray-700",
    }

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    )
}

// Icon wrapper
export const Icon = ({ icon: IconComponent, className = "", size = 16, ...props }) => (
    <IconComponent className={className} size={size} {...props} />
)

// Card components
export const Card = ({ children, className = "", ...props }) => (
    <div className={`card parchment-texture ${className}`} {...props}>
        {children}
    </div>
)

export const CardHeader = ({ children, className = "", ...props }) => (
    <div className={`card-header ${className}`} {...props}>{children}</div>
)

export const CardTitle = ({ children, className = "", ...props }) => (
    <h3 className={`card-title ${className}`} {...props}>{children}</h3>
)

export const CardContent = ({ children, className = "", ...props }) => (
    <div className={`card-content ${className}`} {...props}>{children}</div>
)

// Button
export const Button = ({ children, className = "", variant = "default", onClick, ...props }) => {
    const baseClass = variant === "outline" ? "button button-outline" : "button"
    return (
        <button className={`${baseClass} ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

// Label
export const Label = ({ children, className = "", htmlFor, ...props }) => (
    <label className={`label ${className}`} htmlFor={htmlFor} {...props}>{children}</label>
)

// Select
export const Select = ({ children, value, onChange, className = "", ...props }) => (
    <select
        className={`select ${className}`}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...props}
    >
        {children}
    </select>
)

export const SelectOption = ({ children, value, ...props }) => (
    <option value={value} {...props}>{children}</option>
)

// Progress
export const Progress = ({ value = 0, className = "", ...props }) => (
    <div className={`progress ${className}`} {...props}>
        <div className="progress-bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
)

// Modal
export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
    return (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export const ModalHeader = ({ children, className = "", ...props }) => (
    <div className={`modal-header ${className}`} {...props}>{children}</div>
)

export const ModalTitle = ({ children, className = "", ...props }) => (
    <h2 className={`modal-title ${className}`} {...props}>{children}</h2>
)

// Tabs
export const Tabs = ({ children, defaultValue, className = "" }) => {
    const [activeTab, setActiveTab] = useState(defaultValue)
    return (
        <div className={`tabs ${className}`}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { activeTab, setActiveTab })
            )}
        </div>
    )
}

export const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => (
    <div className={`tabs-list ${className}`}>
        {React.Children.map(children, (child) => React.cloneElement(child, { activeTab, setActiveTab }))}
    </div>
)

export const TabsTrigger = ({ children, value, activeTab, setActiveTab, className = "" }) => (
    <button
        className={`tab-trigger ${activeTab === value ? "active" : ""} ${className}`}
        onClick={() => setActiveTab(value)}
    >
        {children}
    </button>
)

export const TabsContent = ({ children, value, activeTab, className = "" }) => (
    <div className={`tab-content ${activeTab === value ? "active" : ""} ${className}`}>
        {children}
    </div>
)

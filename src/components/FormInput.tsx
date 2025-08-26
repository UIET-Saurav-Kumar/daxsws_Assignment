import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";

interface FormInputProps {
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
  showPasswordToggle?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  className,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={inputType}
           onFocus={() => setIsFocused(true)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={ () => {
            onBlur()
          setIsFocused(false)
          }}
          className={cn(
            'w-full px-4 pt-4 pb-2 bg-input border-b-2 border-input-border  focus:border-primary outline-none transition-colors  text-foreground',
            isFocused && 'text-primary',
            error && 'border-destructive',
            className
          )}
          autoComplete="new-password"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
         <motion.label
          initial={{ y: "0.5rem", opacity: 0.6, fontSize: "1rem", fontWeight: 400 }}
          animate={
            isFocused || value
              ? { y: "0rem", fontSize: "0.75rem", opacity: 1, fontWeight: 400 }
              : { y: "0.7rem", fontSize: "1rem", opacity: 0.8, fontWeight: 400 }
          }
          transition={{ type: "spring", stiffness: 120 }}
          className={cn("absolute left-4 text-gray-400 pointer-events-none" , isFocused && 'text-primary')}
        >
          {placeholder}
        </motion.label>
  
      </div>
      {error && (
        <p className="text-destructive text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
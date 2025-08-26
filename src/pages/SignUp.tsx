import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '@/components/FormInput';
import { 
  validateName, 
  validateUsername, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validateConfirmPassword 
} from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const SignUp: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Real-time validation for confirm password
    if (field === 'password' || field === 'confirmPassword') {
      const password = field === 'password' ? value : formData.password;
      const confirmPassword = field === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (confirmPassword && touched.confirmPassword) {
        const validation = validateConfirmPassword(confirmPassword, password);
        if (!validation.isValid) {
          setErrors(prev => ({ ...prev, confirmPassword: validation.message || '' }));
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      }
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string) => {
    let validation;
    
    switch (field) {
      case 'name':
        validation = validateName(value);
        break;
      case 'username':
        validation = validateUsername(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'phone':
        validation = validatePhone(value);
        break;
      case 'password':
        validation = validatePassword(value, formData.username);
        break;
      case 'confirmPassword':
        validation = validateConfirmPassword(value, formData.password);
        break;
      default:
        return;
    }
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.message || '' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValidation = validateName(formData.name);
    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);
    const passwordValidation = validatePassword(formData.password, formData.username);
    const confirmPasswordValidation = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    const newErrors: Record<string, string> = {};
    
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message || '';
    }
    
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message || '';
    }
    
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message || '';
    }
    
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message || '';
    }
    
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message || '';
    }
    
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.message || '';
    }
    
    setErrors(newErrors);
    setTouched({ 
      name: true, 
      username: true, 
      email: true, 
      phone: true, 
      password: true, 
      confirmPassword: true 
    });
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Registration successful:', formData);
      toast({
          title: "Success 🎉",
          description: "Registration successful!",
        })
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Create new Account</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              placeholder="NAME"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              onBlur={() => handleInputBlur('name')}
              error={touched.name ? errors.name : ''}
            />
            
            <FormInput
              placeholder="USERNAME"
              value={formData.username}
              onChange={(value) => handleInputChange('username', value)}
              onBlur={() => handleInputBlur('username')}
              error={touched.username ? errors.username : ''}
            />
        
            <FormInput
              type="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              onBlur={() => handleInputBlur('email')}
              error={touched.email ? errors.email : ''}
            />
            
            <FormInput
              type="tel"
              placeholder="PHONE NO."
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              onBlur={() => handleInputBlur('phone')}
              error={touched.phone ? errors.phone : ''}
            />
     
            <FormInput
              type="password"
              placeholder="NEW PASSWORD"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              onBlur={() => handleInputBlur('password')}
              error={touched.password ? errors.password : ''}
              showPasswordToggle
            />
            
            <FormInput
              type="password"
              placeholder="CONFIRM NEW PASSWORD"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              onBlur={() => handleInputBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              showPasswordToggle
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="px-16 py-6 text-lg font-semibold"
            >
              SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
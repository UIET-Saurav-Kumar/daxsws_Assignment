import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '@/components/FormInput';
import { validateUsername, validatePassword } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string) => {
    let validation;
    
    switch (field) {
      case 'username':
        validation = validateUsername(value);
        break;
      case 'password':
        validation = validatePassword(value, formData.username);
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
    const usernameValidation = validateUsername(formData.username);
    const passwordValidation = validatePassword(formData.password, formData.username);
    
    const newErrors: Record<string, string> = {};
    
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message || '';
    }
    
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message || '';
    }
    
    setErrors(newErrors);
    setTouched({ username: true, password: true });
    
    if (Object.keys(newErrors).length === 0) {
      // In a real app, you would handle authentication here
      console.log('Login successful:', formData);
      // For demo purposes, just show success
      // alert('Login successful! (This is a demo)');
      toast({
          title: "Success 🎉",
          description: "Login successful! (This is a demo)",
        })
    }
  };
 
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-lg opacity-90">Sign in to continue</p>
        </div>
      </header>
      
      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            placeholder="USERNAME"
            value={formData.username}
            onChange={(value) => handleInputChange('username', value)}
            onBlur={() => handleInputBlur('username')}
            error={touched.username ? errors.username : ''}
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
          <div className="flex justify-center mt-5">
          <Button 
            type="submit" 
            className="px-12 py-3 text-lg font-semibold"
          >
            LOGIN
          </Button>
          </div>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have Account? </span>
            <Link 
              to="/signup" 
              className="text-primary font-semibold underline hover:text-primary/80 transition-colors"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Authentication Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">React Login & Sign-Up Application</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup">Go to Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

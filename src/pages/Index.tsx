import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Classic Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;

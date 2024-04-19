import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto px-3 md:px-10', className)}>
      {children}
    </div>
  );
}

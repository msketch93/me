import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const animationClass = inView 
    ? `animate-fade-in-up opacity-100` 
    : 'opacity-0 translate-y-4';

  const style = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return { ref, inView, animationClass, style };
};

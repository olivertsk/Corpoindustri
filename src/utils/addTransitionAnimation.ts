import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAddTransition = () => {
  const router = useRouter();
  const [transitionWrapper, setTransitionWrapper] = useState<Element | null>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTransitionWrapper(document.querySelector('#transition-wrapper'));
    }
  }, []);

  const handleTransition = async (route: string) => {
    if (transitionWrapper) {
      transitionWrapper.classList.add('page-transition');
      await sleep(500);
      router.push(route);
    }
  };

  return {
    handleTransition,
  };
};

import { useRouter } from 'next/navigation';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAddTransition = () => {
  const router = useRouter();
  const transitionWrapper = document.querySelector('#transition-wrapper')!;

  const handleTransition = async (route: string) => {
    transitionWrapper.classList.add('page-transition');
    await sleep(500);
    router.push(route);
  };

  return {
    handleTransition,
  };
};

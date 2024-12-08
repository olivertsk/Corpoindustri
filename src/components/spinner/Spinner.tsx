import './Spinner.css';

type SpinnerProps = {
  spinnerColor?: string;
};

const spinnerClasses = `sk-chase-dot before:bg-[#fff] before:content-[''] before:block before:w-1/4 before:h-1/4 before:rounded-full before:animate-spinner`;
export default function Spinner({ spinnerColor = '#0050d1' }: SpinnerProps) {
  return (
    <div className='p-8 flex justify-center items-center'>
      <div className='sk-chase'>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
        <div className={`${spinnerClasses} before:bg-[${spinnerColor}]`}></div>
      </div>
    </div>
  );
}

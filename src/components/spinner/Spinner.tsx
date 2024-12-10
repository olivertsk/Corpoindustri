import './Spinner.css';

const spinnerClasses = `sk-chase-dot  before:content-[''] before:block before:w-1/4 before:h-1/4 before:rounded-full before:animate-spinner`;
export default function Spinner() {
  return (
    <div className='p-8 flex justify-center items-center'>
      <div className='sk-chase'>
        <div className={`${spinnerClasses + ` before:bg-[#4485ed]`} `}></div>
        <div className={`${spinnerClasses} before:bg-[#4485ed]`}></div>
        <div className={`${spinnerClasses} before:bg-[#4485ed]`}></div>
        <div className={`${spinnerClasses} before:bg-[#4485ed]`}></div>
        <div className={`${spinnerClasses} before:bg-[#4485ed]`}></div>
        <div className={`${spinnerClasses} before:bg-[#4485ed]`}></div>
      </div>
    </div>
  );
}

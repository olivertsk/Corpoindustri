import { fetchSvg } from '@/src/config/fetch';
import { useEffect, useState } from 'react';

const CategoryIcon = ({ iconUrl, fillColor, width, height }: { iconUrl: string, fillColor: string, width: string, height: string }) => {
  console.log('iconUrl :>> ', iconUrl);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const invoqueSVG = async () => {
      try {
        console.log('se ejecuta');
        const svgText: string | undefined = await fetchSvg(iconUrl, fillColor, width, height);
        if (svgText) {
          console.log('svgText :>> ', svgText);
          setSvgContent(svgText);
        }
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    invoqueSVG();
  }, [iconUrl, fillColor, width, height]);

  console.log('svgContent :>> ', svgContent);

  return (
    <div
      className='flex justify-center'
      dangerouslySetInnerHTML={{ __html: svgContent }}
    ></div>
  );
};

export default CategoryIcon;

/*
import Link from "next/link";

const menuItems: {
  heading: string;
  items: { name: string; href: string }[];
}[] = [

];

const FooterMenu = () => {
    return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;
};

export default FooterMenu;
*/


// components/Footer.tsx
import { useEffect, useState } from 'react';

const FooterMenu: React.FC = () => {
    const [footerHtml, setFooterHtml] = useState<string>('');

    useEffect(() => {
        const getFooter = async () => {
            try {
                const response = await fetch('/api/footer');
                if (!response.ok) {
                    throw new Error('Failed to fetch footer');
                }
                const html = await response.text();
                setFooterHtml(html);
            } catch (error) {
                console.error('Error fetching footer:', error);
            }
        };

        getFooter();
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;
};

export default FooterMenu;

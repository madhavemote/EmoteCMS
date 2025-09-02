import Link from 'next/link';

interface CTAButtonProps {
    label: string;
    link: string;
    type: 'primary' | 'secondary' | 'link';
}

export default function CTAButton({ label, link, type }: CTAButtonProps) {
    const buttonClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
        link: 'text-blue-600 hover:text-blue-700 underline'
    };

    const baseClasses = type === 'link'
        ? 'inline-block py-2 px-4'
        : 'inline-block py-3 px-6 rounded-lg font-medium transition-colors duration-200';

    return (
        <Link
            href={link}
            className={`${baseClasses} ${buttonClasses[type]}`}
        >
            {label}
        </Link>
    );
} 
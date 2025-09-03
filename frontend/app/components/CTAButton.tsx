import Link from 'next/link';

interface CTAButtonProps {
    label: string;
    link: string;
    type: 'primary' | 'secondary' | 'link';
}

export default function CTAButton({ label, link, type }: CTAButtonProps) {
    const buttonClasses = {
        primary: 'bg-black hover:bg-black/80 text-white',
        secondary: 'bg-[#c8f137] hover:bg-[#c8f137]/80 text-black',
        link: 'text-black hover:text-black/80 underline'
    };

    const baseClasses = type === 'link'
        ? 'inline-block py-2 px-4 font-semibold'
        : 'inline-block rounded-[40px] py-3 px-6 font-semibold transition-colors duration-200';

    return (
        <Link
            href={link}
            className={`${baseClasses} ${buttonClasses[type]}`}
        >
            {label}
        </Link>
    );
} 
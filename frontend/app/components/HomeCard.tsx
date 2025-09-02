import Image from 'next/image';

interface HomeCardProps {
    heading: string;
    subheading: string;
    icon?: string;
    alignm?: 'right' | 'left' | 'center';
    numbered?: boolean;
}

export default function HomeCard({ heading, subheading, icon, alignm = 'center', numbered }: HomeCardProps) {
    const alignmentClasses = {
        left: 'text-left',
        right: 'text-right',
        center: 'text-center'
    };

    return (
        <div className={`max-w-sm mx-auto p-6 ${alignmentClasses[alignm]}`}>
            {icon && (
                <div className="mb-4 flex justify-center">
                    <Image
                        src={icon}
                        alt=""
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            )}
            {numbered && (
                <div className="text-4xl font-bold text-primary mb-4">
                    {/* You can implement custom numbering logic here */}
                    #
                </div>
            )}
            <h3 className="text-2xl font-semibold mb-3">{heading}</h3>
            <p className="text-gray-600">{subheading}</p>
        </div>
    );
} 
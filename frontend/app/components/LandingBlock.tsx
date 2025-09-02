import Image from 'next/image';

interface LandingBlockProps {
    heading: string;
    subheading: string;
    backgroundImage?: {
        url: string;
        alternativeText?: string;
    };
}

export default function LandingBlock({ heading, subheading, backgroundImage }: LandingBlockProps) {
    return (
        <div className="relative min-h-[600px] w-full flex items-center justify-center">
            {backgroundImage?.url && (
                <Image
                    src={backgroundImage.url}
                    alt={backgroundImage.alternativeText || heading}
                    fill
                    className="object-cover z-0"
                    priority
                />
            )}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{heading}</h1>
                <p className="text-xl md:text-2xl">{subheading}</p>
            </div>
        </div>
    );
} 
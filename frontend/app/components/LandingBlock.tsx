import Image from 'next/image';
import CTAButton from './CTAButton';

interface LandingBlockProps {
    heading: string;
    subheading: string;
    backgroundImage?: {
        url: string;
        alternativeText?: string;
    };
    LandingCta?: {
        label: string;
        link: string;
        type: 'primary' | 'secondary' | 'link';
    };
}

export default function LandingBlock({ heading, subheading, backgroundImage, LandingCta }: LandingBlockProps) {
    return (
        <div className="relative h-dvh w-full flex justify-center">
            {backgroundImage?.url && (
                <Image
                    src={backgroundImage.url}
                    alt={backgroundImage.alternativeText || heading}
                    fill
                    className="!w-dvw !h-fit z-0 absolute bottom-0 !top-[unset]"
                    priority
                />
            )}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-12">
                <h1 className="text-4xl md:text-5xl font-normal mb-6">{heading}</h1>
                <p dangerouslySetInnerHTML={{ __html: subheading }} className="text-md"></p>
                <div className="mt-12">
                    {LandingCta && <CTAButton {...LandingCta} />}
                </div>
            </div>
        </div>
    );
} 
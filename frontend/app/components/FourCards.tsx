import HomeCard from './HomeCard';
import CTAButton from './CTAButton';

interface FourCardsProps {
    heading: string;
    subheading: string;
    HomeCard: Array<{
        heading: string;
        subheading: string;
        icon?: string;
        alignm?: 'right' | 'left' | 'center';
        numbered?: boolean;
    }>;
    CtaButton?: {
        label: string;
        link: string;
        type: 'primary' | 'secondary' | 'link';
    };
    footerText?: string;
}

export default function FourCards({
    heading,
    subheading,
    HomeCard: cards,
    CtaButton: cta,
    footerText
}: FourCardsProps) {
    return (
        <div className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subheading}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <HomeCard
                            key={index}
                            {...card}
                        />
                    ))}
                </div>

                {(cta || footerText) && (
                    <div className="mt-12 text-center">
                        {cta && <CTAButton {...cta} />}
                        {footerText && (
                            <p className="mt-6 text-gray-600">{footerText}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 
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
        <div className="relative h-dvh w-full bg-[#f2ede9] 3xl:gap-[3.5rem] px-4 py-10 lg:px-[8.75rem] lg:py-20 2xl:px-[13.75rem] 3xl:px-[22.5rem]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                    <p className="text-xs lg:text-sm 3xl:text-base text-gray-600 max-w-3xl mx-auto">{subheading}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cards.map((card, index) => (
                        <HomeCard
                            key={card.id}
                            number={index + 1}
                            {...card}
                        />
                    ))}
                </div>

                {(cta || footerText) && (
                    <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
                        {footerText && (
                            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{footerText}</p>
                        )}
                        {cta && <CTAButton {...cta} />}
                    </div>
                )}
            </div>
        </div>
    );
} 
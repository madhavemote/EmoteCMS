import HomeCard from './HomeCard';
import CTAButton from './CTAButton';

interface StepCardsProps {
    heading: string;
    subheading: string;
    StepCard: Array<{
        heading: string;
        subheading: string;
        icon?: string;
        alignm?: 'right' | 'left' | 'center';
        numbered?: boolean;
        id: number;
    }>;
    stepCardCTA?: {
        label: string;
        link: string;
        type: 'primary' | 'secondary' | 'link';
    };
    layout: 'row' | 'column' | 'grid-2';
    backgroundColor?: string;
}

export default function StepCards({
    heading,
    subheading,
    StepCard,
    stepCardCTA,
    layout,
    backgroundColor
}: StepCardsProps) {
    const layoutClasses = {
        row: 'flex flex-col md:flex-row gap-8',
        column: 'flex flex-col gap-[0.75rem] 3xl:gap-6 items-center',
        'grid-2': 'grid grid-cols-1 md:grid-cols-2 gap-8'
    };

    return (
        <div
            className="py-16 px-4"
            style={{ backgroundColor: backgroundColor || 'transparent' }}
        >
            <div className="py-10 px-4 lg:py-20 lg:px-[18.75rem] 2xl:px-[23.75rem] 3xl:px-[32.5rem] flex flex-col gap-6 lg:gap-12 3xl:gap-[3.5rem] ">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subheading }}></p>
                </div>

                <div className={layoutClasses[layout]}>
                    {StepCard.map((card, index) => (
                        <HomeCard
                            key={card.id}
                            {...card}
                            numbered={card.numbered}
                        />
                    ))}
                </div>

                {stepCardCTA && (
                    <div className="mt-12 text-center">
                        <CTAButton {...stepCardCTA} />
                    </div>
                )}
            </div>
        </div>
    );
} 
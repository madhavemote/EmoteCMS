import Image from 'next/image';

interface HomeCardProps {
    heading: string;
    subheading: string;
    icon?: string;
    alignm?: 'right' | 'left' | 'center';
    numbered?: boolean;
    number?: number;
    layout?: 'row' | 'column' | 'grid-2';
}

export default function HomeCard({ number, heading, subheading, icon, alignm = 'center', numbered, layout }: HomeCardProps) {
    const alignmentClasses = {
        left: 'text-left',
        right: 'text-right',
        center: 'text-center'
    };

    return (
        <div className={` p-6 bg-white rounded-2xl px-4 pt-4 pb-6 lg:p-6 3xl:p-8 ${alignmentClasses[alignm]} ${layout === "column" && "sm:w-[22rem] lg:w-[39.5rem] 3xl:w-[55rem]"}`}>
            {icon && (
                <div className="mb-4 w-full">
                    <svg className="w-6 h-6 3xl:w-8 3xl:h-8" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="black"></rect><path d="M23.4806 10.8574L13.1949 21.1431L8.51953 16.4678" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
            )}
            {numbered && (
                <div className="flex items-center justify-center mb-3">
                    <div className="text-xl bg-[#c8f137] rounded-full flex items-center justify-center w-10 h-10 font-bold text-primary">
                        {number}
                    </div>
                </div>
            )}
            <p className="lg:text-xl 3xl:text-2xl font-semibold">{heading}</p>
            <p className="text-gray-600">{subheading}</p>
        </div>
    );
} 
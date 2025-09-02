import { Metadata } from 'next';
import LandingBlock from '../components/LandingBlock';
import HomeCard from '../components/HomeCard';
import StepCards from '../components/StepCards';
import FourCards from '../components/FourCards';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

interface StrapiPage {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    template: string;
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: {
        data?: {
            attributes: {
                url: string;
                alternativeText?: string;
            }
        }
    };
    Components: Array<StrapiComponent>;
}

interface StrapiComponent {
    id: number;
    __component: string;
    heading?: string;
    subheading?: string;
    footerText?: string;
    layout?: 'row' | 'column' | 'grid-2';
    backgroundColor?: string;
    backgroundImage?: {
        data?: {
            attributes: {
                url: string;
                alternativeText?: string;
            }
        }
    };
    StepCard?: Array<{
        heading: string;
        subheading: string;
        icon?: string;
        alignm?: 'right' | 'left' | 'center';
        numbered?: boolean;
    }>;
    HomeCard?: Array<{
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
    stepCardCTA?: {
        label: string;
        link: string;
        type: 'primary' | 'secondary' | 'link';
    };
}

async function getPage(slug: string): Promise<StrapiPage | null> {
    try {
        const res = await fetch(`${STRAPI_API_URL}/api/pages?populate=*&filters[slug]=${slug}`, {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Failed to fetch page:', {
                status: res.status,
                statusText: res.statusText,
                url: res.url,
            });

            if (res.status === 403) {
                throw new Error('Access to page content is forbidden. Please check Strapi permissions.');
            }

            throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (!data.data?.[0]) {
            return null;
        }
        return data.data[0];
    } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = await Promise.resolve(params.slug);

    try {
        const page = await getPage(slug);

        if (!page) {
            return {
                title: 'Page Not Found',
            };
        }

        return {
            title: page.metaTitle || page.title,
            description: page.metaDescription,
            openGraph: {
                title: page.ogTitle || page.metaTitle || page.title,
                description: page.ogDescription || page.metaDescription,
                images: page.ogImage?.data ? [
                    {
                        url: `${STRAPI_API_URL}${page.ogImage.data.attributes.url}`,
                        alt: page.ogImage.data.attributes.alternativeText || '',
                    }
                ] : [],
            },
            robots: page.noIndex ? 'noindex' : 'index,follow',
            alternates: {
                canonical: page.canonicalUrl,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Error',
            description: 'Failed to load page',
        };
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = await Promise.resolve(params.slug);

    try {
        const page = await getPage(slug);

        if (!page) {
            return <div className="p-8 text-center">Page not found</div>;
        }

        const renderComponent = (component: StrapiComponent) => {
            switch (component.__component) {
                case 'home.landing-block':
                    return (
                        <LandingBlock
                            key={component.id}
                            heading={component.heading || ''}
                            subheading={component.subheading || ''}
                            backgroundImage={
                                component.backgroundImage?.data
                                    ? {
                                        url: `${STRAPI_API_URL}${component.backgroundImage.data.attributes.url}`,
                                        alternativeText: component.backgroundImage.data.attributes.alternativeText,
                                    }
                                    : undefined
                            }
                        />
                    );

                case 'home.home-card':
                    return (
                        <HomeCard
                            key={component.id}
                            heading={component.heading || ''}
                            subheading={component.subheading || ''}
                            icon={component.backgroundImage?.data?.attributes.url}
                            alignm={component.layout as 'right' | 'left' | 'center'}
                            numbered={false}
                        />
                    );

                case 'home.step-cards':
                    return (
                        <StepCards
                            key={component.id}
                            heading={component.heading || ''}
                            subheading={component.subheading || ''}
                            StepCard={component.StepCard || []}
                            stepCardCTA={component.stepCardCTA}
                            layout={component.layout || 'column'}
                            backgroundColor={component.backgroundColor}
                        />
                    );

                case 'home.four-cards':
                    return (
                        <FourCards
                            key={component.id}
                            heading={component.heading || ''}
                            subheading={component.subheading || ''}
                            HomeCard={component.HomeCard || []}
                            CtaButton={component.CtaButton}
                            footerText={component.footerText}
                        />
                    );

                default:
                    return null;
            }
        };

        return (
            <main>
                {page.Components?.map((component) => renderComponent(component))}
            </main>
        );
    } catch (error) {
        console.error('Error rendering page:', error);
        return (
            <div className="p-8 text-center text-red-600">
                Error loading page content. Please try again later.
            </div>
        );
    }
} 
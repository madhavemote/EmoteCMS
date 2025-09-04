import type { Schema, Struct } from '@strapi/strapi';

export interface HomeCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_buttons';
  info: {
    displayName: 'CtaButton';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'link']>;
  };
}

export interface HomeFourCards extends Struct.ComponentSchema {
  collectionName: 'components_home_four_cards';
  info: {
    displayName: 'FourCards';
  };
  attributes: {
    CtaButton: Schema.Attribute.Component<'home.cta-button', false>;
    footerText: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    HomeCard: Schema.Attribute.Component<'home.home-card', true>;
    subheading: Schema.Attribute.Text;
  };
}

export interface HomeHomeCard extends Struct.ComponentSchema {
  collectionName: 'components_home_home_cards';
  info: {
    displayName: 'HomeCard';
  };
  attributes: {
    alignm: Schema.Attribute.Enumeration<['right', 'left', 'center']>;
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    numbered: Schema.Attribute.Boolean;
    subheading: Schema.Attribute.Text;
  };
}

export interface HomeLandingBlock extends Struct.ComponentSchema {
  collectionName: 'components_home_landing_blocks';
  info: {
    displayName: 'LandingBlock';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String;
    LandingCta: Schema.Attribute.Component<'home.cta-button', false>;
    subheading: Schema.Attribute.Text;
  };
}

export interface HomeStepCards extends Struct.ComponentSchema {
  collectionName: 'components_home_step_cards';
  info: {
    displayName: 'StepCards';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<['row', 'column', 'grid-2']>;
    StepCard: Schema.Attribute.Component<'home.home-card', true>;
    stepCardCTA: Schema.Attribute.Component<'home.cta-button', false>;
    subheading: Schema.Attribute.Text;
  };
}

export interface TherapistApplicationFrame extends Struct.ComponentSchema {
  collectionName: 'components_therapist_application_frames';
  info: {
    displayName: 'Frame';
  };
  attributes: {
    borderColor: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subheading: Schema.Attribute.Text;
  };
}

export interface TherapistApplicationThreeFrame extends Struct.ComponentSchema {
  collectionName: 'components_therapist_application_three_frames';
  info: {
    displayName: 'ThreeFrame';
  };
  attributes: {
    TherapistApplicationFrame: Schema.Attribute.Component<
      'therapist-application.frame',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.cta-button': HomeCtaButton;
      'home.four-cards': HomeFourCards;
      'home.home-card': HomeHomeCard;
      'home.landing-block': HomeLandingBlock;
      'home.step-cards': HomeStepCards;
      'therapist-application.frame': TherapistApplicationFrame;
      'therapist-application.three-frame': TherapistApplicationThreeFrame;
    }
  }
}

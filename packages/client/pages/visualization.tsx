import React from 'react';
import { NextPage } from 'next';

import EditorialBlock from '../components/EditorialBlock';
import HeroBannerBlock from '../components/HeroBannerBlock';
import GalleryBlock from '../components/GalleryBlock';
import Navigation from '../components/Navigation';
import { fetchContentById } from '../utils/fetchContent';
import SimpleBanner from '../components/SimpleBanner';

interface Props {
    component: any
}

const Visualization: NextPage<Props> = (props: Props) => {
    let {
        component
    } = props;

    let ComponentType = null;

    switch (component.component) {
        case 'HeroBannerBlock':
            ComponentType = HeroBannerBlock;
            break;
        case 'EditorialBlock':
            ComponentType = EditorialBlock;
            break;
        case 'GalleryBlock':
            ComponentType = GalleryBlock;
            break;
        case 'Navigation':
            ComponentType = Navigation;
            break;
    }

    switch (component?._meta?.schema) {
        case 'https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/content-types/simple-banner.json':
          ComponentType = SimpleBanner;
          break;
      }

    return (
        <ComponentType {...component} />
    );
}

Visualization.getInitialProps = async (context) => {
    const content = fetchContentById(
        context.query.id as string, 
        context
    );

    return {
        component: await content
    };
};

export default Visualization;
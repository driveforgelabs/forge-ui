'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeBanner as ForgeBannerElement} from '@driveforgelabs/forge-ui/forge-banner';
 
 
 

 
 export const ForgeBanner = createComponent({
   react: React,
   tagName: 'forge-banner',
   elementClass: ForgeBannerElement,
   events: {
     
     onForgeDismiss: 'forge-dismiss' as EventName<CustomEvent<unknown>>,
   }
  });

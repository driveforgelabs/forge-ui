'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeScrollArea as ForgeScrollAreaElement} from '@driveforgelabs/forge-ui/forge-scroll-area';
 
 
 

 
 export const ForgeScrollArea = createComponent({
   react: React,
   tagName: 'forge-scroll-area',
   elementClass: ForgeScrollAreaElement,
   events: {
     
   }
  });

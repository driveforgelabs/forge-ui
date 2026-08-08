'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeAccordion as ForgeAccordionElement} from '@driveforgelabs/forge-ui/forge-accordion';
 
 
 

 
 export const ForgeAccordion = createComponent({
   react: React,
   tagName: 'forge-accordion',
   elementClass: ForgeAccordionElement,
   events: {
     
   }
  });

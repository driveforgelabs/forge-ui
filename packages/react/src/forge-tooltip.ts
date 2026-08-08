'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeTooltip as ForgeTooltipElement} from '@driveforgelabs/forge-ui/forge-tooltip';
 
 
 

 
 export const ForgeTooltip = createComponent({
   react: React,
   tagName: 'forge-tooltip',
   elementClass: ForgeTooltipElement,
   events: {
     
   }
  });

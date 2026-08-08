'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeSlider as ForgeSliderElement} from '@driveforgelabs/forge-ui/forge-slider';
 
 
 

 
 export const ForgeSlider = createComponent({
   react: React,
   tagName: 'forge-slider',
   elementClass: ForgeSliderElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
     onForgeInput: 'forge-input' as EventName<CustomEvent<unknown>>,
   }
  });

'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeColorSwatch as ForgeColorSwatchElement} from '@driveforgelabs/forge-ui/forge-color-swatch';
 
 
 

 
 export const ForgeColorSwatch = createComponent({
   react: React,
   tagName: 'forge-color-swatch',
   elementClass: ForgeColorSwatchElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

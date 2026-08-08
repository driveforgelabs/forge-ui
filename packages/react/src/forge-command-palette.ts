'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeCommandPalette as ForgeCommandPaletteElement} from '@driveforgelabs/forge-ui/forge-command-palette';
 
 
 

 
 export const ForgeCommandPalette = createComponent({
   react: React,
   tagName: 'forge-command-palette',
   elementClass: ForgeCommandPaletteElement,
   events: {
     
     onForgeSelect: 'forge-select' as EventName<CustomEvent<unknown>>,
   }
  });

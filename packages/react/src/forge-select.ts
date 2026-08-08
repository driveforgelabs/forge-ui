'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeSelect as ForgeSelectElement} from '@driveforgelabs/forge-ui/forge-select';
 
 
 

 
 export const ForgeSelect = createComponent({
   react: React,
   tagName: 'forge-select',
   elementClass: ForgeSelectElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<{value: string}>>,
   }
  });

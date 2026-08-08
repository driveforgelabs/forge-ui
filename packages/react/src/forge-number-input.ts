'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeNumberInput as ForgeNumberInputElement} from '@driveforgelabs/forge-ui/forge-number-input';
 
 
 

 
 export const ForgeNumberInput = createComponent({
   react: React,
   tagName: 'forge-number-input',
   elementClass: ForgeNumberInputElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<{value: number}>>,
   }
  });

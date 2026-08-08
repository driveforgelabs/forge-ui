'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeInput as ForgeInputElement} from '@driveforgelabs/forge-ui/forge-input';
 
 
 

 
 export const ForgeInput = createComponent({
   react: React,
   tagName: 'forge-input',
   elementClass: ForgeInputElement,
   events: {
     
     onForgeInput: 'forge-input' as EventName<CustomEvent<{value: string}>>,
     onForgeChange: 'forge-change' as EventName<CustomEvent<{value: string}>>,
   }
  });

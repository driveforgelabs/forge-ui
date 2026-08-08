'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeTextarea as ForgeTextareaElement} from '@driveforgelabs/forge-ui/forge-textarea';
 
 
 

 
 export const ForgeTextarea = createComponent({
   react: React,
   tagName: 'forge-textarea',
   elementClass: ForgeTextareaElement,
   events: {
     
     onForgeInput: 'forge-input' as EventName<CustomEvent<{value: string}>>,
     onForgeChange: 'forge-change' as EventName<CustomEvent<{value: string}>>,
   }
  });

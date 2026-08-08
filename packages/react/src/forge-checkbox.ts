'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeCheckbox as ForgeCheckboxElement} from '@driveforgelabs/forge-ui/forge-checkbox';
 
 
 

 
 export const ForgeCheckbox = createComponent({
   react: React,
   tagName: 'forge-checkbox',
   elementClass: ForgeCheckboxElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

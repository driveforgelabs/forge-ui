'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeCombobox as ForgeComboboxElement} from '@driveforgelabs/forge-ui/forge-combobox';
 
 
 

 
 export const ForgeCombobox = createComponent({
   react: React,
   tagName: 'forge-combobox',
   elementClass: ForgeComboboxElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

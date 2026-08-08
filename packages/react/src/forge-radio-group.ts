'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeRadioGroup as ForgeRadioGroupElement} from '@driveforgelabs/forge-ui/forge-radio-group';
 
 
 

 
 export const ForgeRadioGroup = createComponent({
   react: React,
   tagName: 'forge-radio-group',
   elementClass: ForgeRadioGroupElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

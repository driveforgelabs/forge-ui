'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeButton as ForgeButtonElement} from '@driveforgelabs/forge-ui/forge-button';
 
 
 

 
 export const ForgeButton = createComponent({
   react: React,
   tagName: 'forge-button',
   elementClass: ForgeButtonElement,
   events: {
     
     onForgeClick: 'forge-click' as EventName<CustomEvent<unknown>>,
   }
  });

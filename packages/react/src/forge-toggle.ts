'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeToggle as ForgeToggleElement} from '@driveforgelabs/forge-ui/forge-toggle';
 
 
 

 
 export const ForgeToggle = createComponent({
   react: React,
   tagName: 'forge-toggle',
   elementClass: ForgeToggleElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

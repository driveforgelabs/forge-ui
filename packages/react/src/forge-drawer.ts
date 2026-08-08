'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeDrawer as ForgeDrawerElement} from '@driveforgelabs/forge-ui/forge-drawer';
 
 
 

 
 export const ForgeDrawer = createComponent({
   react: React,
   tagName: 'forge-drawer',
   elementClass: ForgeDrawerElement,
   events: {
     
     onForgeClose: 'forge-close' as EventName<CustomEvent<unknown>>,
   }
  });

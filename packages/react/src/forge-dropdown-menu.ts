'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeDropdownMenu as ForgeDropdownMenuElement} from '@driveforgelabs/forge-ui/forge-dropdown-menu';
 
 
 

 
 export const ForgeDropdownMenu = createComponent({
   react: React,
   tagName: 'forge-dropdown-menu',
   elementClass: ForgeDropdownMenuElement,
   events: {
     
     onForgeSelect: 'forge-select' as EventName<CustomEvent<unknown>>,
   }
  });

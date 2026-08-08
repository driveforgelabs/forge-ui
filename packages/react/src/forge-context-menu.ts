'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeContextMenu as ForgeContextMenuElement} from '@driveforgelabs/forge-ui/forge-context-menu';
 
 
 

 
 export const ForgeContextMenu = createComponent({
   react: React,
   tagName: 'forge-context-menu',
   elementClass: ForgeContextMenuElement,
   events: {
     
     onForgeSelect: 'forge-select' as EventName<CustomEvent<{item: HTMLElement}>>,
   }
  });

'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgePopover as ForgePopoverElement} from '@driveforgelabs/forge-ui/forge-popover';
 
 
 

 
 export const ForgePopover = createComponent({
   react: React,
   tagName: 'forge-popover',
   elementClass: ForgePopoverElement,
   events: {
     
     onForgeOpenChange: 'forge-open-change' as EventName<CustomEvent<{open: boolean}>>,
   }
  });

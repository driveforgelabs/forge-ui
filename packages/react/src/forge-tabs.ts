'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeTabs as ForgeTabsElement} from '@driveforgelabs/forge-ui/forge-tabs';
 
 
 

 
 export const ForgeTabs = createComponent({
   react: React,
   tagName: 'forge-tabs',
   elementClass: ForgeTabsElement,
   events: {
     
     onForgeTabChange: 'forge-tab-change' as EventName<CustomEvent<unknown>>,
   }
  });

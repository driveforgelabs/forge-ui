'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeVirtualList as ForgeVirtualListElement} from '@driveforgelabs/forge-ui/forge-virtual-list';
 
 
 

 
 export const ForgeVirtualList = createComponent({
   react: React,
   tagName: 'forge-virtual-list',
   elementClass: ForgeVirtualListElement,
   events: {
     
   }
  });

'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeEmptyState as ForgeEmptyStateElement} from '@driveforgelabs/forge-ui/forge-empty-state';
 
 
 

 
 export const ForgeEmptyState = createComponent({
   react: React,
   tagName: 'forge-empty-state',
   elementClass: ForgeEmptyStateElement,
   events: {
     
   }
  });

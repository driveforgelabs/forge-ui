'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeChip as ForgeChipElement} from '@driveforgelabs/forge-ui/forge-chip';
 
 
 

 
 export const ForgeChip = createComponent({
   react: React,
   tagName: 'forge-chip',
   elementClass: ForgeChipElement,
   events: {
     
   }
  });

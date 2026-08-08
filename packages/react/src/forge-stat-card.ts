'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeStatCard as ForgeStatCardElement} from '@driveforgelabs/forge-ui/forge-stat-card';
 
 
 

 
 export const ForgeStatCard = createComponent({
   react: React,
   tagName: 'forge-stat-card',
   elementClass: ForgeStatCardElement,
   events: {
     
   }
  });

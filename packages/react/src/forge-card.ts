'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeCard as ForgeCardElement} from '@driveforgelabs/forge-ui/forge-card';
 
 
 

 
 export const ForgeCard = createComponent({
   react: React,
   tagName: 'forge-card',
   elementClass: ForgeCardElement,
   events: {
     
   }
  });

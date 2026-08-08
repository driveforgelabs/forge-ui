'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeBadge as ForgeBadgeElement} from '@driveforgelabs/forge-ui/forge-badge';
 
 
 

 
 export const ForgeBadge = createComponent({
   react: React,
   tagName: 'forge-badge',
   elementClass: ForgeBadgeElement,
   events: {
     
   }
  });

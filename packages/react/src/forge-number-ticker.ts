'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeNumberTicker as ForgeNumberTickerElement} from '@driveforgelabs/forge-ui/forge-number-ticker';
 
 
 

 
 export const ForgeNumberTicker = createComponent({
   react: React,
   tagName: 'forge-number-ticker',
   elementClass: ForgeNumberTickerElement,
   events: {
     
   }
  });

'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeSparkline as ForgeSparklineElement} from '@driveforgelabs/forge-ui/forge-sparkline';
 
 
 

 
 export const ForgeSparkline = createComponent({
   react: React,
   tagName: 'forge-sparkline',
   elementClass: ForgeSparklineElement,
   events: {
     
   }
  });

'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeArcGauge as ForgeArcGaugeElement} from '@driveforgelabs/forge-ui/forge-arc-gauge';
 
 
 

 
 export const ForgeArcGauge = createComponent({
   react: React,
   tagName: 'forge-arc-gauge',
   elementClass: ForgeArcGaugeElement,
   events: {
     
   }
  });

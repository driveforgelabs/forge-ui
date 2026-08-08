'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeProgressBar as ForgeProgressBarElement} from '@driveforgelabs/forge-ui/forge-progress-bar';
 
 
 

 
 export const ForgeProgressBar = createComponent({
   react: React,
   tagName: 'forge-progress-bar',
   elementClass: ForgeProgressBarElement,
   events: {
     
   }
  });

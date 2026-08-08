'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeSpinner as ForgeSpinnerElement} from '@driveforgelabs/forge-ui/forge-spinner';
 
 
 

 
 export const ForgeSpinner = createComponent({
   react: React,
   tagName: 'forge-spinner',
   elementClass: ForgeSpinnerElement,
   events: {
     
   }
  });

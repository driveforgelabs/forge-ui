'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeAlert as ForgeAlertElement} from '@driveforgelabs/forge-ui/forge-alert';
 
 
 

 
 export const ForgeAlert = createComponent({
   react: React,
   tagName: 'forge-alert',
   elementClass: ForgeAlertElement,
   events: {
     
   }
  });

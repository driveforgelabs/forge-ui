'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeDialog as ForgeDialogElement} from '@driveforgelabs/forge-ui/forge-dialog';
 
 
 

 
 export const ForgeDialog = createComponent({
   react: React,
   tagName: 'forge-dialog',
   elementClass: ForgeDialogElement,
   events: {
     
     onForgeClose: 'forge-close' as EventName<CustomEvent<unknown>>,
   }
  });

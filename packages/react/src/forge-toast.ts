'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeToast as ForgeToastElement} from '@driveforgelabs/forge-ui/forge-toast';
 
 
 

 
 export const ForgeToast = createComponent({
   react: React,
   tagName: 'forge-toast',
   elementClass: ForgeToastElement,
   events: {
     
     onForgeToastDismiss: 'forge-toast-dismiss' as EventName<CustomEvent<unknown>>,
   }
  });

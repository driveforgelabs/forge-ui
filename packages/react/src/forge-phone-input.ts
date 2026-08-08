'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgePhoneInput as ForgePhoneInputElement} from '@driveforgelabs/forge-ui/forge-phone-input';
 
 
 

 
 export const ForgePhoneInput = createComponent({
   react: React,
   tagName: 'forge-phone-input',
   elementClass: ForgePhoneInputElement,
   events: {
     
     onForgeInput: 'forge-input' as EventName<CustomEvent<{value: string}>>,
     onForgeChange: 'forge-change' as EventName<CustomEvent<{value: string}>>,
   }
  });

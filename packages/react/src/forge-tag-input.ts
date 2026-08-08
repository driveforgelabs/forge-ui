'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeTagInput as ForgeTagInputElement} from '@driveforgelabs/forge-ui/forge-tag-input';
 
 
 

 
 export const ForgeTagInput = createComponent({
   react: React,
   tagName: 'forge-tag-input',
   elementClass: ForgeTagInputElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<{tags: string[]}>>,
   }
  });

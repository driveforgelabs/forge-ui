'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeTable as ForgeTableElement} from '@driveforgelabs/forge-ui/forge-table';
 
 
 

 
 export const ForgeTable = createComponent({
   react: React,
   tagName: 'forge-table',
   elementClass: ForgeTableElement,
   events: {
     
     onForgeSort: 'forge-sort' as EventName<CustomEvent<unknown>>,
     onForgePage: 'forge-page' as EventName<CustomEvent<unknown>>,
     onForgeRowClick: 'forge-row-click' as EventName<CustomEvent<unknown>>,
   }
  });

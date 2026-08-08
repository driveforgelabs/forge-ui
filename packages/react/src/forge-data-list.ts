'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeDataList as ForgeDataListElement} from '@driveforgelabs/forge-ui/forge-data-list';
 
 
 

 
 export const ForgeDataList = createComponent({
   react: React,
   tagName: 'forge-data-list',
   elementClass: ForgeDataListElement,
   events: {
     
   }
  });

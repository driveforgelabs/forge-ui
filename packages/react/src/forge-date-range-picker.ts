'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeDateRangePicker as ForgeDateRangePickerElement} from '@driveforgelabs/forge-ui/forge-date-range-picker';
 
 
 

 
 export const ForgeDateRangePicker = createComponent({
   react: React,
   tagName: 'forge-date-range-picker',
   elementClass: ForgeDateRangePickerElement,
   events: {
     
     onForgeChange: 'forge-change' as EventName<CustomEvent<unknown>>,
   }
  });

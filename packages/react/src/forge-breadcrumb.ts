'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeBreadcrumb as ForgeBreadcrumbElement} from '@driveforgelabs/forge-ui/forge-breadcrumb';
 
 
 

 
 export const ForgeBreadcrumb = createComponent({
   react: React,
   tagName: 'forge-breadcrumb',
   elementClass: ForgeBreadcrumbElement,
   events: {
     
     onForgeNavigate: 'forge-navigate' as EventName<CustomEvent<unknown>>,
   }
  });

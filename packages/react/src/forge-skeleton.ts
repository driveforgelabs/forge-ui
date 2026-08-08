'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeSkeleton as ForgeSkeletonElement} from '@driveforgelabs/forge-ui/forge-skeleton';
 
 
 

 
 export const ForgeSkeleton = createComponent({
   react: React,
   tagName: 'forge-skeleton',
   elementClass: ForgeSkeletonElement,
   events: {
     
   }
  });

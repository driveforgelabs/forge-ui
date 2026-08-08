'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeHeatmapCell as ForgeHeatmapCellElement} from '@driveforgelabs/forge-ui/forge-heatmap-cell';
 
 
 

 
 export const ForgeHeatmapCell = createComponent({
   react: React,
   tagName: 'forge-heatmap-cell',
   elementClass: ForgeHeatmapCellElement,
   events: {
     
   }
  });

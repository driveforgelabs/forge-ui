'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeSplitPane as ForgeSplitPaneElement} from '@driveforgelabs/forge-ui/forge-split-pane';
 
 
 

 
 export const ForgeSplitPane = createComponent({
   react: React,
   tagName: 'forge-split-pane',
   elementClass: ForgeSplitPaneElement,
   events: {
     
     onForgeSplitChange: 'forge-split-change' as EventName<CustomEvent<{split: number}>>,
   }
  });

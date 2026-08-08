'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeTimeline as ForgeTimelineElement} from '@driveforgelabs/forge-ui/forge-timeline';
 
 
 

 
 export const ForgeTimeline = createComponent({
   react: React,
   tagName: 'forge-timeline',
   elementClass: ForgeTimelineElement,
   events: {
     
     onForgeEventClick: 'forge-event-click' as EventName<CustomEvent<unknown>>,
   }
  });

'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeSidebarNav as ForgeSidebarNavElement} from '@driveforgelabs/forge-ui/forge-sidebar-nav';
 
 
 

 
 export const ForgeSidebarNav = createComponent({
   react: React,
   tagName: 'forge-sidebar-nav',
   elementClass: ForgeSidebarNavElement,
   events: {
     
     onForgeNavigate: 'forge-navigate' as EventName<CustomEvent<unknown>>,
     onForgeCollapse: 'forge-collapse' as EventName<CustomEvent<unknown>>,
   }
  });

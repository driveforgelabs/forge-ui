'use client';

import React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ForgeAvatar as ForgeAvatarElement} from '@driveforgelabs/forge-ui/forge-avatar';
 
 
 

 
 export const ForgeAvatar = createComponent({
   react: React,
   tagName: 'forge-avatar',
   elementClass: ForgeAvatarElement,
   events: {
     
   }
  });

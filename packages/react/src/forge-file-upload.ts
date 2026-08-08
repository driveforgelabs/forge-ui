'use client';

import React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ForgeFileUpload as ForgeFileUploadElement} from '@driveforgelabs/forge-ui/forge-file-upload';
 
 
 

 
 export const ForgeFileUpload = createComponent({
   react: React,
   tagName: 'forge-file-upload',
   elementClass: ForgeFileUploadElement,
   events: {
     
     onForgeFileSelect: 'forge-file-select' as EventName<CustomEvent<{files: File[]}>>,
   }
  });

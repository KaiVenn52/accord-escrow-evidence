import React from 'react';
import {registerRoot,Composition} from 'remotion';
import {AccordDemo,TOTAL} from './main';
registerRoot(()=>React.createElement(Composition,{id:'AccordDemo',component:AccordDemo,width:1920,height:1080,fps:30,durationInFrames:TOTAL}));

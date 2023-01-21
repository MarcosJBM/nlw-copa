declare module '*.svg' {
  import React from 'react';

  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;

  export default content;
}

declare module '@env' {
  export const CLIENT_ID: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      pools: undefined;
      find: undefined;
      details: {
        id: string;
      };
    }
  }
}

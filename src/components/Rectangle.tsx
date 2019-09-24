import React from 'react';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

export const Rectangle = props => {
    const { w, h, t } = props;
    return (
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryTransparent]}
        style={{
          position: 'absolute',
          width: w,
          height: h,
          zIndex: 0,
          top: t,
          right: 0,
          borderRadius: 20,
          transform: [{ rotate: '-45deg' }]
        }}
      />
    );
  };

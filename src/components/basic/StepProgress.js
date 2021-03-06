import React, {PropTypes} from 'react';
import { css, cssWithClass, withStyles} from 'src';
const _ = require('underscore');
/**
 *  A static progress bar
 */
const DEFAULT_HEIGHT = 8;
const DEFAULT_BAR_MARGIN = 2;
const StepProgress = ({
  styles,
  style,
  theme,
  backgroundColor,
  progressColor,
  color,
  barMargin = DEFAULT_BAR_MARGIN,
  height = DEFAULT_HEIGHT,
  totalSteps = 1,
  currentStep = 0,
  ...props
}) => {
  const dynamicStyles = getStyles({backgroundColor, color, height, barMargin});
  const mergedRootStyle = {...dynamicStyles.StepProgress, ...style};
  // const barStyle = {...dynamicStyles.bar, width: `${progress}%`};
  const progressColorLocal = progressColor || theme.color.success;
  const barWidth = 1 / totalSteps ;
  const barData = _.range(totalSteps)
    .map((item) =>({
      step: item,
      style: {
        width: `${barWidth * 100}%`,
        backgroundColor: item < currentStep ? progressColorLocal : 'transparent',
        ...dynamicStyles.bar
      },
    }));
  return (
    <div
      {...cssWithClass('horizontal-box align-items-spacebetween', styles.StepProgress)}
      style={mergedRootStyle}
    >
      {_(barData).map((item) => (
        <div
          {...css(styles.bar)}
          style={item.style}
          key={`StepProgress~${item.step}`}
        >
        </div>
      ))}
    </div>
 );
};


StepProgress.propTypes = {
  // Static styles
  styles: PropTypes.object,

  // Override the inline-styles of the root element
  style: PropTypes.object,

  // The backgroundColor of the progress bar
  backgroundColor: PropTypes.string,

  // The forground color of the progress bar
  color: PropTypes.string,

  // The height of the the progress bar
  height: PropTypes.number,

  totalSteps: PropTypes.number,
  currentStep: PropTypes.number,
};

StepProgress.defaultProps = {
  styles: {},
  style: {},
  totalSteps: 1,
  currentStep: 0,
  height: DEFAULT_HEIGHT,
  barMargin: DEFAULT_BAR_MARGIN,
};

// Dynamic styles
function getStyles({backgroundColor, color, height, barMargin} ) {
  return {
    StepProgress: {
      height,
      backgroundColor,
    },
    bar: {
      marginLeft: barMargin,
      marginRight: barMargin,
    }
  }
}

export default withStyles(({color, gradient}) => ({
  StepProgress: {
    backgroundColor: color.white,
    width: '100%',
    height: DEFAULT_HEIGHT,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  }
}))(StepProgress);

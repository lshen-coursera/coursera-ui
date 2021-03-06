const React = require('react');
import { css, cssWithClass, withStyles, ThemedStyleSheet } from 'src';
import {SvgCheckOutline, SvgCheckSolid} from '../../svg/coursera';

const DEFAULT_HEIGHT = 36;
const HEIGHT_TO_ICON_RATIO = 0.6

const SelectListItem = ({
  style = {}, styles, htmlAttributes = {},
  label, theme, isDarkTheme, isSelected, onClick, fontSize = 'md',
  height = DEFAULT_HEIGHT,
}) => {
  const dynamicStyles = getStyles({isDarkTheme, theme, isSelected, height, fontSize});
  const mergedStyles = {...dynamicStyles.SelectListItem, ...style};

  return (
    <button
      {...css(
        styles.SelectListItem,
        styles.activeButtonStyle,
        styles.hoverButtonStyle,
        isDarkTheme ? styles.borderLine : styles.boxShadow,
      )}
      style={mergedStyles}
      onClick={onClick}
      {...htmlAttributes}
    >
      <span className="horizontal-box align-items-vertical-center">
        <span {...css(styles.text)} style={dynamicStyles.text}>{label}</span>
        <span
          {...cssWithClass(
            'horizontal-box align-items-absolute-center',
            styles.iconContainer,
          )}
        >
          {!isSelected &&
            <SvgCheckOutline
              size={height * HEIGHT_TO_ICON_RATIO}
              style={dynamicStyles.icon}
            />
          }
          {isSelected &&
            <SvgCheckSolid
              size={height * HEIGHT_TO_ICON_RATIO}
              style={dynamicStyles.icon}
              stroke={theme.color.primary}
            />
          }
        </span>
      </span>
    </button>
  );
};

SelectListItem.defaultProps = {
  fontSize: 'md',
  style: {},
  styles: {},
  htmlAttributes: {},
  height: DEFAULT_HEIGHT,
}

SelectListItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool,
  isDarkTheme: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
};


function getStyles({isDarkTheme, isSelected, height, theme, fontSize}) {
  const {color} = theme;
  const baseStyle = {
    SelectListItem: {
      height,
      borderRadius: height / 2,
      fontSize: theme.font[fontSize],
      paddingLeft: height / 2,
    },
    text: {
    },
    icon: {
      fill: `${color.primary}`,
      color: `${color.primary}`,
    }
  };

  // check different cases for theme and selected state
  if (!isSelected && !isDarkTheme) {
    return {
      SelectListItem: {
        ...baseStyle.SelectListItem,
        backgroundColor: color.white,
      },
      text: {
        color: color.secondaryText,
      },
      icon: {
        fill: `${color.secondaryText}`,
      }
    };
  } else if (!isSelected && isDarkTheme) {
    return {
      SelectListItem: {
        ...baseStyle.SelectListItem,
        backgroundColor: 'transparent',
      },
      text: {
        color: color.white,
      },
      icon: {
        fill: `${color.white}`,
      }
    };
  } else if (isSelected && !isDarkTheme) {
    return {
      SelectListItem: {
        ...baseStyle.SelectListItem,
        color: color.white,
        backgroundColor: color.darkPrimary,
      },
      text: {
        color: color.white,
      },
      icon: {
        fill: `${color.white}`,
        stroke: color.primary,
      }
    };
  } else {
    return {
      SelectListItem: {
        ...baseStyle.SelectListItem,
        backgroundColor: color.whiteHalf,
      },
      text: {
        color: color.white,
      },
      icon: {
        fill: `${color.white}`,
      }
    };
  }
};

export default withStyles(({color, transition, spacing}) => ({
  SelectListItem: {
    transition: transition.easeOut(),
    border: 'none',
    overflow: 'hidden',
    margin: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  boxShadow: {
    boxShadow: `1px 1px 1px ${color.shadow}`,
  },
  borderLine: {
    border: `1px solid ${color.white}`,
  },
  activeButtonStyle: {
    ':active' : {
      outline: 'none',
    },
    ':focus' : {
      outline: 'none',
    }
  },
  hoverButtonStyle: {
    ':hover': {
      color: color.primary,
    }
  },
  text: {
    paddingRight: spacing.sm,
  }
}))(SelectListItem);

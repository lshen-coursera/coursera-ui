import React from 'react';
import { css, cssWithClass, withStyles, ThemedStyleSheet } from 'src';
const _ = require('underscore');
import withApiData from 'src/components/hocs/withApiData';
import {StaticLinearProgress} from 'src';


const DEFAULT_COURSE_PHOTO_SIZE = 96;

const BASE_URL = 'https://www.s12nra.org/specialization/';

const S12nMiniCard = ({
  styles,
  s12n,
  id,
  s12nPhotoSize = DEFAULT_COURSE_PHOTO_SIZE,
  children,
  ...props
}) => {

  if (!s12n) return null;

  const {name, description, promoPhoto, courseIds, partnerIds, partnerName: mockName} = s12n;
  const partner = _(partnerIds.edges).first();
  const partnerName = partner && partner.node.name || mockName;
  const dynamicStyles = getStyles({s12nPhotoSize});

   return (
    <div className="horizontal-box CourseCard">
      <div className="horizontal-box align-items-top m-r-1" style={{minWidth: 100}}>
        <a href={`${BASE_URL}${s12n.slug}`}>
          <img src={promoPhoto} alt="CourseraAlt" className="border-a" style={dynamicStyles.s12nPhoto} />
        </a>
      </div>
      <div className="vertical-box flex-1">
        <h4 className="font-weight-normal m-b-0">{name}</h4>
        <span className="text-muted font-sm">{partnerName}</span>
        <span {...css(styles.courseCount)}>{`${_(courseIds).size()}-course-specialization`}</span>
      </div>
    </div>
  );
};

const CourseWithApiData = withApiData({dataType: 'S12N'})(S12nMiniCard);

// Dynamic styles
function getStyles({s12nPhotoSize}) {
  return {
    StaticLinearProgress: {
      margin: 4,
      marginLeft: 0,
    },
    s12nPhoto: {
      width: s12nPhotoSize,
      height: s12nPhotoSize,
    },
  }
}

export default withStyles(({color, spacing}) => ({
  S12nMiniCard: {
  },
  courseCount: {
    color: color.secondaryText,
    background: color.bgGray,
  },
}))(CourseWithApiData);

import React from 'react';
import { css, cssWithClass, withStyles, ThemedStyleSheet } from 'src';
import {Avatar, Button} from 'src';
import DomainCard from './DomainCard';
import SubDomainSelectCard from './SubDomainSelectCard';
import NoDomainSelected from './NoDomainSelected';
import withApiData from '../../../components/hocs/withApiData';
const _ = require('underscore');

class ProgramSelectCoursePage extends React.Component {

  render() {
    const {
      styles, selectedCourseIds, selectedS12nIds, selectedDomainIds,
      onToggleCourseSelect, onToggleS12nSelect,
      onSelectChange, domains
    } = this.props;

    if (_(selectedDomainIds).size() === 0) {
      return <NoDomainSelected />;
    }

    const domainListData = _(domains).reduce((total, item) => {
      if (_(selectedDomainIds).contains(item.id)) {
        total.push(item);
        return total;
      }
      return total;
    }, []);

    return (
      <div {...cssWithClass('bg-gray', styles.ProgramSelectCoursePage)}>
        {_(domainListData).map(item =>(
          <section className="m-b-3" key={`domain-container~${item.id}`}>
            <SubDomainSelectCard
              onSelectChange={onSelectChange}
              alignCenter={true}
              subdomainIds={item.subdomainIds}
            />
            <DomainCard
              domainName={item.name}
              domainId={item.id}
              selectedCourseIds={selectedCourseIds}
              selectedS12nIds={selectedS12nIds}
              onToggleCourseSelect={onToggleCourseSelect}
              onToggleS12nSelect={onToggleS12nSelect}
            />
        </section>
        ))}
      </div>
    );
  }
}

const ProgramSelectCoursePageWithApiData = withApiData({
  dataType: 'DOMAINS'
})(ProgramSelectCoursePage);


function getStyles({coursePhotoSize}) {
  return {
    Header: {
    },
    coursePhoto: {
      width: coursePhotoSize,
      height: coursePhotoSize,
    },
  }
}

export default withStyles(({color, gradient}) => ({
  ProgramSelectCoursePage: {
    minHeight: 450,
  },
}))(ProgramSelectCoursePageWithApiData);

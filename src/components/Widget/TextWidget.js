import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardText } from 'reactstrap';
import Typography from '../Typography';

const TextWidget = ({
  title,
  subtitle,
  ...restProps
}) => {
  return (
    <Card body {...restProps}>
      <div className="d-flex justify-content-between">
        <CardText tag="div">
          <Typography className="mb-0">
            <strong>{title}</strong>
          </Typography>
          <Typography className="mb-0 text-muted small">{subtitle}</Typography>
        </CardText>
      </div>
    </Card>
  );
};

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

TextWidget.defaultProps = {
  title: '',
  subtitle: '',
};

export default TextWidget;

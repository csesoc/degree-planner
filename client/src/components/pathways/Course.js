import React from 'react';
import Chip from '@material-ui/core/Chip';

export default function Course() {

    const code = "SENG4920";
    const label = "Management and Ethics";

    return(
      <Chip
        key={code}
        label={code}
      />
    );
}

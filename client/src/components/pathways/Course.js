import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

export default function Course(props) {

    return(
      <Card>
        <CardContent>
            {props.data.code}
        </CardContent>
      </Card>
    );
}

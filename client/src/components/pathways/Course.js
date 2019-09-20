import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

export default function Course() {

    const code = "";
    const label = "";
    const prerequisites = [];
    const postrequisites = [];
    const handbookLink = "";

    return(
      <Card>
        <CardHeader title={code}>
        </CardHeader>
        <CardContent>
            {label}
        </CardContent>
      </Card>
    );
}

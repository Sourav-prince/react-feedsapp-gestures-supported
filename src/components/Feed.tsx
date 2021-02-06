import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { generateAvatarUrl } from '../utils/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    content: {
      padding: `10px 20px`
    },
    header: {
      padding: `10px 20px 0px 20px`
    }
  }),
);

export default function FeedsCard(props:any) {
  const classes = useStyles();

  const {author, content, updated} = props

  return (
    <Card className={classes.root}>
      <div>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar src={generateAvatarUrl(author.photoUrl)}/>
          }
          title={author.name}
          subheader={'5 years ago'}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textPrimary" component="p">
            {content}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

import React from 'react';
import { useImmer } from "use-immer"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Swipe from 'react-easy-swipe';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import '../assets/styles/animate.css'

import { generateAvatarUrl } from '../utils/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    contentWrapper: {
      '& .MuiCardContent-root:last-child': {
        padding: `10px`
      }
    },
    header: {
      padding: `0px 10px`
    },
    button: {
      '& .MuiButton-label': {
        writingMode: 'vertical-rl',
        transform: 'scale(-1, -1)'
      },
      '& .MuiButton-startIcon': {
        transform: 'scale(1,-1)',
        margin: 0,
        paddingTop: '6px'
      }
    },
    slide: {
      transition: 'all 2s ease' 
    },
    actions: {
      display: 'flex',
      padding: '10px'
    }
  }),
);

export default function FeedsCard(props:any) {
  const classes = useStyles();

  const { author, content } = props

  const [state, setState] = useImmer({
    currentTab: 0
  })

  // const onSwipeRight = (position:any, event:any) => {
  //   const pos = state.currentTab
  //   console.log('swipe',state.currentTab)
  //   if(position.x < -100){
  //     setState(draft => {
  //       draft.currentTab = pos == 0 ? -1 : 0;
  //     });
  //   }
  //   if(position.x > 100){
  //     setState(draft => {
  //       draft.currentTab = pos == 0 ? 1 : 0;
  //     });
  //   }
  // }

  const onSwipeRight = (position:any, event:any) => {
    const pos = state.currentTab
    setState(draft => {
      draft.currentTab = pos === -1 ? 0 : 1;
    });
  }

  const onSwipeLeft = (position:any, event:any) => {
    const pos = state.currentTab
    setState(draft => {
      draft.currentTab = pos === 1 ? 0 : -1;
    });
  }

  const mainContent = (
    <div className={classes.contentWrapper}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar src={generateAvatarUrl(author.photoUrl)}/>
        }
        title={author.name}
        subheader={'5 years ago'}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {content}
        </Typography>
      </CardContent>
    </div>
  )

  const deleteButton = (
    <>
      {
        state.currentTab == 1 &&
        <Button
          variant="contained" 
          className={classes.button}
          startIcon={<DeleteIcon />}
          style={{background: 'red', color: '#fff'}}
        >
          delete
        </Button>
      }
    </>
  )

  const editButton = (
    <>
      {
        state.currentTab == -1 &&
        <Button
          variant="contained" 
          className={classes.button}
          startIcon={<EditIcon />}
          style={{background: 'green', color: '#fff'}}
        >
          edit
        </Button>
      }
    </>
  )

  return (
    <Swipe onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft}>
      <Card className={classes.root}>
        <div className={classes.actions}>
          {deleteButton}
          {mainContent}
          {editButton}
        </div>  
      </Card>
    </Swipe>
  );
}

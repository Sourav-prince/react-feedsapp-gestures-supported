import React, { useEffect } from 'react'
import { useImmer } from "use-immer"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import InfiniteScroll from "react-infinite-scroll-component";

import FeedCard from './Feed'

import { getFeeds } from '../services/feeds'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '80px',
    },
    listContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    loadingText: {
      textAlign: 'center',
      width: '100%'
    },
    container: {
      overflow: 'hidden !important'
    }
  }),
);

const FeedList = () => {

  const classes = useStyles();
  const [state, setState] = useImmer({
    list:[] as any,
    token: ''
  })

  const loadProducts = async()=>{
    try{
      const res = await getFeeds(state.token)
      let tempData = [...state.list,...res.messages]
      setState(draft => {
        draft.list = tempData;
        draft.token = res.pageToken;
      });
    }catch(e){}
  }

  useEffect(()=>{
    loadProducts()
    // eslint-disable-next-line
  },[])

  const loading = (
    <Grid item xs={12}>
      <div className={classes.loadingText}>Loading...</div>
    </Grid>
  )

  const loadingDummy = (
    <Grid item xs={12}/>
  )


  return (
    <Container maxWidth="xs" >
      <div className={classes.root}>     
        <InfiniteScroll
          className={classes.container}
          dataLength={state.list.length}
          next={loadProducts}
          hasMore={true}
          loader={loading}
        >
          <Grid container spacing={3} className={classes.listContainer}>
            {!state.list.length && loadingDummy}
            {state.list.map((val:any,index:number)=>(
              <Grid key={index} item xs={12}>
                <FeedCard {...val}/>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </Container>
  )
}

export default FeedList

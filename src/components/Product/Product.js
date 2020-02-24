import React, {useEffect, useRef, useContext} from 'react';
import './Product.css';

import { Store } from '../../App';
import AddToCart from '../AddToCart/AddToCart';

import { Container, Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';



const centeredFlex = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const useStyles = makeStyles({
  muiContainer: {
    '@media (min-width: 1200px)': {
      width: '80%',
      marginLeft: '0'
    },
  },
  muiContainerItem: {
    '@media (min-width: 576px)': {
      margin: '0 auto'
    },
    '@media (min-width: 992px)': {
      margin: '0'
    }
  },
  thumb: {
    ...centeredFlex,
    border: '1px solid lightgray',
    height: '92px',
    width: '92px',
    '&:not(:last-of-type)': {
      marginRight: '10px'
    },
    '&:last-of-type': {
      visibility: 'hidden'
    },
    '& i::before': {
      fontSize: '30.66px'
    },
    '@media (min-width: 521px)': {
      height: '102px',
      width: '102px',
      '&:not(:last-of-type)': {
        margin: '0 0 10px 0'
      },
      '& i::before': {
        fontSize: '34px'
      }
    }
  },
  selectedImage: {
    ...centeredFlex,
    position: 'relative',
    height: '300px',
    width: '300px',
    border: '1px solid lightgray',
    '& i.icon-placeholder::before': {
      fontSize: '100px'
    },
    '@media (min-width: 521px)': {
      height: '330px',
      width: '330px',
      '& i.icon-placeholder::before': {
        fontSize: '110px'
      }
    }
  },
  productInformation: {
    '& *': {
      textAlign: 'center',
    },
    '@media (min-width: 960px)': {
      '& *': {
        textAlign: 'left'
      }
    }
  },
  articleRating: {
    '& svg': {
      cursor: 'pointer'
    }
  }
});



const Product = () => {
  const store = useContext(Store);
  const article = store.store.article;
  const myRef = useRef(null);
  const styles = useStyles();
  const stars = [1, 2, 3, 4, 5];
  const smallScreen = useMediaQuery('(min-width: 520px)');
  const mediumScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  
  const scrollToRef = (ref) => {
    // Showing add-to-cart number input and button in product section or header depending on whether they are visible on page or no
    let header = document.querySelector('header');
    let headerCartButton = document.querySelector('.article-cart-header');

    if (ref.current.offsetTop < (document.documentElement.scrollTop + header.clientHeight)) {
      headerCartButton.style.display = 'flex';
    } else {
      headerCartButton.style.display = 'none';
    }
  };

  const createPriceString = price => (
    Math.floor(price).toFixed(2).toString().replace('.', ',')
  );
  
  useEffect(() => {
    // Adding 'on scroll' event listener on window so to follow whether add-to-cart button is visible or no
    window.addEventListener('scroll', () => scrollToRef(myRef));
  }, []);

  return (
          <section className='product'>
            <Container 
                maxWidth='md' 
                className={styles.muiContainer}>
              <Grid 
                  container 
                  spacing={2}
                  direction={mediumScreen ? 'row' : 'column-reverse'}>
                <Grid 
                    item
                    xs={12}
                    sm={8} 
                    md={6}
                    className={styles.muiContainerItem}>
                  <Box 
                    display='flex' 
                    flexDirection={smallScreen ? 'row' : 'column-reverse'}
                    justifyContent={mediumScreen ? 'start' : 'center'}>
                    <Box 
                      display='flex'
                      flexDirection={smallScreen ? 'column' : 'row'}
                      justifyContent={smallScreen ? 'space-between' : 'center'}
                      mr={smallScreen ? '10px' : 0}
                      mt={smallScreen ? 0 : '10px'}
                      className={styles.thumbsWrapper}>
                        {article.images.map(image => (
                            <Paper 
                              key={image} 
                              square 
                              className={styles.thumb}
                              elevation={0}>
                              <i className='icon-placeholder' />
                            </Paper>
                        ))}
                    </Box>
                    <Box 
                      display='flex' 
                      justifyContent={mediumScreen ? 'start' : 'center'} >
                      <Paper 
                        square 
                        elevation={0} 
                        className={styles.selectedImage}>
                        <i className='icon-placeholder' />
                        <i className='icon-zoom-in' />
                      </Paper>
                    </Box>
                  </Box>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={4}
                    className={styles.muiContainerItem}>
                  <Box 
                    className={styles.productInformation}  
                    height={1}
                    display='flex'
                    flexDirection='column' 
                    justifyContent='space-between'>
                    <div className='article-information'>
                      <h1>{article.description_short}</h1>
                      <p>by&nbsp;
                        <a 
                          target='_blank'
                          rel="noopener noreferrer"
                          href='/'>{article.supplier_name}</a>
                      </p>
                      <Box 
                        className={styles.articleRating} 
                        display='flex'
                        justifyContent={mediumScreen ? 'start' : 'center'}
                        alignItems='center'
                        m='10px 0 20px'>
                        {stars.map((star, i) => {
                          if ((i + 1) <= Math.round(article.stars)) {
                            return <i className='icon-star' style={{color: '#f7ca18'}} key={i} />
                          } else {
                            return <i className='icon-star' key={i} />
                          }
                        })} 
                        <ArrowDropDownIcon />
                      </Box>
                      <p className='article-price-wrapper'>
                        <span className='article-price'>
                            {createPriceString(article.price)} EUR
                        </span> + {createPriceString(article.transport_costs)} EUR shipping 
                        <i 
                          className='icon-discount' 
                          style={{color: 'black'}} />
                      </p>
                      <p>all prices incl. 10 % taxes</p>
                    </div>
                    <AddToCart refer={myRef} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </section>
  );
}

export default Product;
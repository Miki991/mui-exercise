import React, { useContext, useEffect } from 'react';
import './Header.css';
import { Fade, Tooltip, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Store } from '../../App';
import AddToCart from '../AddToCart/AddToCart';



const useStyles = makeStyles({
  singleIconWrapper: {
    padding: '10px 0',
    '& i:hover': {
      opacity: '.9'
    },
    '& i::before': {
      fontSize: '1.5em',
      cursor: 'pointer',
      margin: '0 20px 0 0',
      transition: '.3s'
    },
    '&:last-of-type': {
      borderLeft: '2px solid #f3f1ef',
      '& i::before': {
        margin: '0 0 0 20px'
      }
    },
    '@media (min-width: 981px)': {
      padding: '20px 0'
    }
  },
  cartProductsNum: {
    background: '#d64541',
    color: 'white',
    transition: '.3s'
  }
});


const Header = () => {
  const styles = useStyles();
  const store = useContext(Store);
  const article = store.store.article;
  let cartItemsNum = store.store.cartItemsNum;
  const mediumScreen = useMediaQuery('(min-width: 981px)');

  useEffect(() => {
    // Animation for cart button when number of items in the cart changes
    const num = document.getElementById('cart-products-num');

    num.style.transform = 'scale(1.4)';

    setTimeout(() => {
      num.style.transform = 'scale(1)';
    }, 1000);

  }, [cartItemsNum]);

  return (
      <header>
          <Container maxWidth='xl'>
            <Box 
              className={styles.headerInner}
              display='flex' 
              justifyContent={mediumScreen ? 'space-between' : 'center'}
              alignItems='center' 
              flexDirection={mediumScreen ? 'row' : 'column'}>
                <span className='header-heading'>{article.title}</span>
                <div>
                  <Box 
                    className='header-icons-wrapper' 
                    display='flex' 
                    flexDirection={mediumScreen ? 'row' : 'column-reverse'}>
                    <AddToCart fromHeader={true} />
                    <Box 
                      className={styles.headerIcons}
                      display='flex' 
                      m={mediumScreen ? 0 : '10px'}
                      justifyContent={mediumScreen ? 'start' : 'center'}>
                      <Box className={styles.singleIconWrapper}>
                        <Tooltip 
                          title='Wishlist' 
                          interactive 
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}>
                          <i className='icon-heart-empty' />
                        </Tooltip>
                      </Box>
                      <Box 
                        className={styles.singleIconWrapper}
                        display='flex'>
                        <Tooltip 
                          title='Share' 
                          interactive 
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}>
                          <i className='icon-compare' />
                        </Tooltip>
                      </Box>
                      <Tooltip 
                            title='My Cart' 
                            interactive 
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 300 }}>
                        <Box className={styles.singleIconWrapper}>
                          <div className='cart-wrapper'>
                            <i className='icon-cart' /> 
                            <Box 
                              id='cart-products-num'
                              className={styles.cartProductsNum}
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              p='3px'
                              minHeight='15px'
                              minWidth='15px'
                              position='absolute'
                              zIndex='modal'
                              top='-8px'
                              right='-12px'
                              fontWeight='bold'
                              fontSize='11px'
                              borderRadius='50%'>
                              <span>{cartItemsNum}</span>
                            </Box>
                          </div>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </div>
            </Box>
          </Container>
      </header>
  );
}

export default Header;
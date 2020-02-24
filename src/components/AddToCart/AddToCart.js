import React, {useState, useContext} from 'react';
import './AddToCart.css';
import {Bounce} from 'react-reveal'
import { Store } from '../../App';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';


const StyledButton = withStyles({
  root: {
    border: '1px solid transparent',
    borderRadius: '0',
    cursor: 'pointer',
    padding: '5px 15px',
    backgroundColor: '#d64541',
    '&:hover': {
        backgroundColor: '#c0392b',
    },
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'none',
    marginLeft: '20px'
  }
})(Button);

const InputTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'lightgray',
          borderRadius: '0',
          boxShadow: '0 0 3px lightgray',
          transition: '.3s'
        }
      }
    }
})(TextField);

const inputTheme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: '60px',
                marginRight: '5px',
            }
        },
        MuiInputBase: {
            input: {
                outline: 'none',
                padding: '10px !important',
                textAlign: 'right',
            }
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: '0'
            }
        }
    },
    palette: {
        primary: grey,
    }
});



const AddToCart = props => {
    const [itemsNumber, setItemsNumber] = useState(0);
    const store = useContext(Store);
 
    const setNumberOfItems = e => {
        // Adding number of items to cart items only if value is higher than 0. If there is no value, itemsNumber is set to 0
        if (parseFloat(e.target.value) >= 0) {
            setItemsNumber(parseFloat(e.target.value))
        } else if (!e.target.value) {
            setItemsNumber(0)
        }
    }

    return (
        <div className={props.fromHeader ? 'article-cart-header article-cart' : 'article-cart'}
             ref={props.refer ? props.refer : null}>
            <Bounce>
                <div className='article-cart-wrapper'>
                    <ThemeProvider theme={inputTheme}>
                        <InputTextField 
                            variant='outlined'
                            onChange={setNumberOfItems}
                            type='number'
                            defaultValue={0}
                            rowsMax={1} />
                    </ThemeProvider>
                    <span>PCE</span>
                    <StyledButton 
                            onClick={() => store.dispatch({
                                type: 'ADD_TO_CART', 
                                itemsToAdd: itemsNumber})}>
                        <i className='icon-cart-in' /> Add to cart
                    </StyledButton>
                </div>
            </Bounce>
        </div>
    )
}

export default AddToCart;
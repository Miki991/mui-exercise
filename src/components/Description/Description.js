import React, {useContext} from 'react';
import './Description.css';
import {Store} from '../../App';
import { 
  Container, 
  Grid, 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    width: 'auto',
    borderTop: '1px solid #f3f1ef',
    borderBottom: '1px solid #f3f1ef'
  },
  tableRow: {
    borderBottom: 'none'
  },
  tableCell: {
    padding: '0.4rem 1rem',
    fontFamily: 'SourceSansPro, Roboto, sans-serif'
  },
  muiContainer: {
    '@media (min-width: 1200px)': {
      width: '80%',
      marginLeft: '0'
    }
  },
  muiContainerItem: {
    '@media (min-width: 576px)': {
      margin: '0 auto'
    }
  },
  card: {
    padding: '1rem 0'
  }
});


const Description = () => {
  const store = useContext(Store);
  const article = store.store.article;
  const styles = useStyles();

  return (
      <section className="description">
        <Container maxWidth='md' className={styles.muiContainer}>
          <div className='desc'>
            <h4>DESCRIPTION</h4>
            <p>{article.description_long}</p>
            <p>{article.description_long}</p>
            <p>{article.description_short}</p>
          </div>
          <Grid 
            container 
            spacing={2} 
            alignItems='stretch'>
            <Grid 
                item xs={12} 
                sm={8} 
                md={6} 
                className={styles.muiContainerItem}>
              <Card 
                elevation={0} 
                className={styles.card}
                width={1}>
                <Container maxWidth='xl'>
                  <h4>DETAILS</h4>
                  <div className='desc-box-specs'>
                    <p>Features</p>
                    <ul>
                      {Object.keys(article.features).map((key, i) => (
                          <li key={i}>
                            <span className='ftr'>{key}: </span>
                            {article.features[key]}
                          </li>
                      ))}
                    </ul>
                    <p>Attachments</p>
                    <ul className='attachments-list'>
                      {article.attachments.map((att,i) => (
                          <li key={i}>
                            <i className='icon-attachment' />
                            <a href={att.file_name}
                              target='_blank'
                              rel="noopener noreferrer">{att.file_label}</a>
                          </li>
                      ))}
                    </ul>
                    <p>Keywords</p>
                    {article.keywords.map((keyword,i) => (
                          <mark key={i} className='keyword'>{keyword}</mark>
                      ))}
                  </div>
                </Container>
              </Card>
            </Grid>
              <Grid 
                  item 
                  xs={12} 
                  sm={8} 
                  md={6} 
                  className={styles.muiContainerItem}>
                <Card 
                  elevation={0} 
                  className={styles.card}
                  width={1}>
                  <Container maxWidth='xl'>
                    <h4>PRICING & SHIPPING</h4>
                    <div className='desc-box-specs'>
                      <ul className='order-info-list'>
                        <li>
                          <span className='ftr'>Minimum order: </span> 
                          {article.vat_percent} {article.unit}
                        </li>
                        <li>
                          <span className='ftr'>Shipping: </span> 
                          {article.transport_costs} EUR
                        </li>
                        <li>
                          <span className='ftr'>Delivery: </span> 
                          {article.delivery_time} days
                        </li>
                      </ul>
                    <div className='price-breaks-wrapper'>
                      <p>Price breaks</p>
                      <Table 
                          aria-label="simple table"
                          className={styles.table}>
                        <TableBody>
                          {Object.keys(article.price_breaks).map((key, i) => (
                            <TableRow 
                                key={i}
                                className={styles.tableRow}>
                              <TableCell 
                                  align="left"
                                  className={styles.tableCell}>
                                  ex {key} PCE
                              </TableCell>
                              <TableCell 
                                  align="left"
                                  className={styles.tableCell}>
                                  {article.price_breaks[key]} EUR/PCE
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </Container>
              </Card>
            </Grid>  
          </Grid>
        </Container>
      </section>
  );
}

export default Description;
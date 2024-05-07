/* eslint-disable react/prop-types */
import { Button, Card } from "keep-react";

// eslint-disable-next-line react/prop-types
export const Product = ({ product }) => {
  return (
    <Card className='min-h-[400px]'>
      <Card.Header>
        <img className='h-[200px] w-full' src={product.thumbnail} alt='' />
      </Card.Header>
      <Card.Content className='space-y-3'>
        <Card.Title>{product.title}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
        <Button size='sm' color='primary'>
          Buy Now
        </Button>
      </Card.Content>
    </Card>
  );
};

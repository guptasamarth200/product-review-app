import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Chip,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl || 'https://via.placeholder.com/400'}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={calculateAverageRating(product.Reviews)}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.Reviews?.length || 0} reviews)
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/product/${id}/review`)}
                sx={{ mb: 2 }}
              >
                Write a Review
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {product.Reviews && product.Reviews.length > 0 ? (
          product.Reviews.map((review) => (
            <Card key={review.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 2 }}>
                    {review.User.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">
                      {review.User.name}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  {review.review}
                </Typography>
                {review.imageUrl && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={`http://localhost:5000${review.imageUrl}`}
                      alt="Review"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  </Box>
                )}
                {review.tags && review.tags.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {review.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary">
            No reviews yet. Be the first to review this product!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetail; 
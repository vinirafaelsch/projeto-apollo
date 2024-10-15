// src/components/RemoverProduto.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function RemoverProduto() {
  const [produtoId, setProdutoId] = useState('');

  const handleChange = (e) => {
    setProdutoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produtoId) {
      alert('Por favor, insira o ID do produto.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${produtoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Produto removido com sucesso!');
        setProdutoId('');
      } else if (response.status === 404) {
        alert('Produto não encontrado.');
      } else {
        alert('Erro ao remover produto.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Remover Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID do Produto"
          value={produtoId}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
        >
          Remover Produto
        </Button>
      </form>
    </Box>
  );
}

export default RemoverProduto;

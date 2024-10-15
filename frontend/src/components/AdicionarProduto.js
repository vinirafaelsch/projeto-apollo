// src/components/AdicionarProduto.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';

function AdicionarProduto() {
  const [produto, setProduto] = useState({
    name: '',
    category: '',
    color: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      ...produto,
      price: parseFloat(produto.price),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
      });

      if (response.ok) {
        alert('Produto adicionado com sucesso!');
        setProduto({
          name: '',
          category: '',
          color: '',
          description: '',
          price: '',
        });
      } else {
        alert('Erro ao adicionar produto.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Adicionar Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={produto.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Categoria"
          name="category"
          value={produto.category}
          onChange={handleChange}
          select
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="">Selecione uma categoria</MenuItem>
          <MenuItem value="Eletroportáteis">Eletroportáteis</MenuItem>
          <MenuItem value="Móveis">Móveis</MenuItem>
          <MenuItem value="Geladeiras">Geladeiras</MenuItem>
          <MenuItem value="Smartphones">Smartphones</MenuItem>
          <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
        </TextField>
        <TextField
          label="Cor"
          name="color"
          value={produto.color}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Descrição"
          name="description"
          value={produto.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Preço"
          name="price"
          value={produto.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          type="number"
          inputProps={{ step: "0.01" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Adicionar Produto
        </Button>
      </form>
    </Box>
  );
}

export default AdicionarProduto;

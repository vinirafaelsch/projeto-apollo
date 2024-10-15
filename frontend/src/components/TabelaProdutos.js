// src/components/TabelaProdutos.js
import React, { useEffect, useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem 
} from '@mui/material';

function TabelaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    sort_by: 'name',
    sort_order: 'asc',
  });

  // Função para buscar os produtos da API
  const fetchProdutos = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5000/products?${query}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      alert('Erro ao buscar produtos');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Lista de Produtos</Typography>

      {/* Inputs de filtros e ordenação */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Nome"
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
        <Select
          name="category"
          value={filters.category}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="">Todas Categorias</MenuItem>
          <MenuItem value="Eletroportáteis">Eletroportáteis</MenuItem>
          <MenuItem value="Móveis">Móveis</MenuItem>
          <MenuItem value="Geladeiras">Geladeiras</MenuItem>
          <MenuItem value="Smartphones">Smartphones</MenuItem>
          <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
        </Select>
        <Select
          name="sort_by"
          value={filters.sort_by}
          onChange={handleChange}
        >
          <MenuItem value="name">Nome</MenuItem>
          <MenuItem value="price">Preço</MenuItem>
        </Select>
        <Select
          name="sort_order"
          value={filters.sort_order}
          onChange={handleChange}
        >
          <MenuItem value="asc">Crescente</MenuItem>
          <MenuItem value="desc">Decrescente</MenuItem>
        </Select>
      </Box>

      {/* Tabela de Produtos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Preço Promocional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.name}</TableCell>
                <TableCell>{produto.category}</TableCell>
                <TableCell>{produto.color}</TableCell>
                <TableCell>{produto.description}</TableCell>
                <TableCell>R$ {produto.price.toFixed(2)}</TableCell>
                <TableCell>R$ {produto.promotional_price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TabelaProdutos;

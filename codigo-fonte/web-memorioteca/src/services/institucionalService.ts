// src/services/institucionalService.ts
import axios from 'axios';
import { config } from '@/config/env';

const API_BASE_URL = config.API_BASE_URL;

export async function getInstitucional() {
  try {
    const response = await axios.get(`${API_BASE_URL}/institucional`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar institucional:', error);
    return null;
  }
}

export async function updateInstitucional({ texto, imagemUrl }: { texto: string; imagemUrl: string }) {
  try {
    const response = await axios.put(`${API_BASE_URL}/institucional`, {
      texto,
      imagem_url: imagemUrl,
    });
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao atualizar institucional:', error);
    return false;
  }
}
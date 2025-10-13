import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstitucional, updateInstitucional } from '@/services/institucionalService';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EditarInstitucionalPage() {
  const [texto, setTexto] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      const dados = await getInstitucional();
      if (dados) {
        setTexto(dados.texto || '');
        setImagemUrl(dados.imagem_url || '');
      } else {
        setErro('Erro ao carregar dados institucionais.');
      }
      setCarregando(false);
    }

    carregarDados();
  }, []);

  const handleSalvar = async () => {
    if (!texto || texto.trim().length < 10) {
      alert('O texto institucional deve ter pelo menos 10 caracteres.');
      return;
    }

    if (!imagemUrl || !imagemUrl.startsWith('http')) {
      alert('A URL da imagem institucional é inválida.');
      return;
    }

    const sucesso = await updateInstitucional({ texto, imagemUrl });
    if (sucesso) {
      alert('Conteúdo atualizado com sucesso!');
      navigate('/institucional');
    } else {
      alert('Erro ao atualizar o conteúdo.');
    }
  };

  if (carregando) return <p className="text-center mt-10">Carregando conteúdo institucional...</p>;
  if (erro) return <p className="text-center text-red-500 mt-10">{erro}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Editar Página Institucional</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Texto institucional</label>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                rows={6}
                placeholder="Digite o texto institucional..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Input
              label="URL da imagem institucional"
              type="text"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://..."
            />

            {imagemUrl && (
              <div className="flex justify-center">
                <img
                  src={imagemUrl}
                  alt="Pré-visualização"
                  className="max-w-full max-h-64 rounded-md shadow-md"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSalvar}>Salvar alterações</Button>
          </CardFooter>
        </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
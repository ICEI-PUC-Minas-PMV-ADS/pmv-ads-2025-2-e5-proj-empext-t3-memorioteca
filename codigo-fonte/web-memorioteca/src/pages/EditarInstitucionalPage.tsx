import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstitucional, updateInstitucional } from '@/services/institucionalService';
import { supabase } from '@/infra/supabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input, Button } from '@/components/ui';

export default function EditarInstitucionalPage() {
  const [texto, setTexto] = useState<string>('');
  const [imagemUrl, setImagemUrl] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
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

  const handleImagemUpload = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `public/${fileName}`; // organiza dentro da pasta public

      const { error } = await supabase.storage
        .from('Institucional')
        .upload(filePath, file, { upsert: true }); // evita erro se já existir

      if (error) {
        console.error('Erro ao fazer upload:', error);
        alert('Erro ao fazer upload da imagem.');
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('Institucional')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSalvar = async () => {
    if (!texto || texto.trim().length < 10) {
      alert('O texto institucional deve ter pelo menos 10 caracteres.');
      return;
    }

    if (!imagemUrl) {
      alert('É necessário enviar uma imagem.');
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
    <div className="flex items-center justify-center p-4 min-h-screen bg-muted">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Editar Página Institucional</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              label="Texto institucional"
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o texto institucional..."
            />

            <div className="space-y-1">
              <label className="text-sm font-medium">Imagem institucional</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;
                  const file = files[0];
                  const url = await handleImagemUpload(file);
                  if (url) setImagemUrl(url);
                }}
              />
              {uploading && <p className="text-blue-500">Fazendo upload da imagem...</p>}
            </div>

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
    </div>
  );
}
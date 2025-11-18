import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService, ProjectData } from "@/services/projectService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input, Button } from "@/components/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState<ProjectData>({
    titulo: "",
    descricao: "",
    url: "",
    nome_autor: "",
    data_inicio: "",
    data_fim: "",
    url_drive: "",
    drive_publico: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.titulo?.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.descricao?.trim())
      newErrors.descricao = "Descrição é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiErrors.length > 0) setApiErrors([]);
    if (successMessage) setSuccessMessage("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError("Por favor, selecione uma imagem válida (JPG, PNG, GIF ou WebP)");
      return;
    }

    // Validar tamanho (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError("A imagem deve ter no máximo 10MB");
      return;
    }

    setIsUploadingImage(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const apiUrl = import.meta.env.VITE_IMGBB_API_URL;

      if (!apiKey || !apiUrl) {
        throw new Error("Configuração da API de upload não encontrada");
      }

      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data?.url) {
        setFormData((prev) => ({
          ...prev,
          url: data.data.url
        }));
      } else {
        throw new Error(data.error?.message || "Erro ao fazer upload da imagem");
      }
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
      setUploadError(
        err instanceof Error ? err.message : "Erro ao fazer upload da imagem"
      );
    } finally {
      setIsUploadingImage(false);
      // Limpar o input para permitir upload da mesma imagem novamente se necessário
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrors([]);
    setSuccessMessage("");

    if (!token) {
      setApiErrors(["Usuário não autenticado"]);
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        url: formData.url?.trim() || undefined,
        nome_autor: formData.nome_autor?.trim() || undefined,
        data_inicio: formData.data_inicio || undefined,
        data_fim: formData.data_fim || undefined,
        url_drive: formData.url_drive?.trim() || undefined,
        drive_publico: formData.drive_publico,
      };

      const res = await ProjectService.createProject(payload, token);

      if (res.success) {
        setSuccessMessage("Projeto criado com sucesso!");
        setFormData({
          titulo: "",
          descricao: "",
          url: "",
          nome_autor: "",
          data_inicio: "",
          data_fim: "",
          url_drive: "",
          drive_publico: false,
        });

        setTimeout(() => navigate("/projetos"), 1000);
      } else {
        setApiErrors(res.errors || ["Erro ao criar projeto"]);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      setApiErrors(["Erro interno do servidor"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4 pb-4">
              <div className="inline-block">
                <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Novo Projeto
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Preencha os dados do projeto abaixo
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
                <span>Cadastro</span>
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
              </div>
            </div>

            <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Formulário de Cadastro
                </CardTitle>
                <p className="text-gray-100 mt-2 relative z-10">Preencha os campos abaixo</p>
              </CardHeader>

              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {successMessage && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-1">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <p className="text-green-800 font-semibold">
                          {successMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {apiErrors.length > 0 && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
                      <div className="flex items-start gap-3">
                        <div className="bg-red-500 rounded-full p-1 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <ul className="text-red-700 text-sm space-y-1 flex-1">
                          {apiErrors.map((err) => (
                            <li key={err} className="font-medium">• {err}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                <Input
                  label="Título*"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  error={errors.titulo}
                />

                  <div>
                    <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                      Descrição*
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descrição do projeto"
                  />
                  {errors.descricao && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.descricao}
                    </p>
                  )}
                </div>

                <Input
                  label="Nome do Autor"
                  type="text"
                  name="nome_autor"
                  value={formData.nome_autor}
                  onChange={handleChange}
                  placeholder="Digite o nome do autor"
                />

                <Input
                  label="Data de Início"
                  type="date"
                  name="data_inicio"
                  value={formData.data_inicio}
                  onChange={handleChange}
                />

                <Input
                  label="Data de Fim"
                  type="date"
                  name="data_fim"
                  value={formData.data_fim}
                  onChange={handleChange}
                />

                <Input
                  label="URL do Drive"
                  type="text"
                  name="url_drive"
                  value={formData.url_drive || ""}
                  onChange={handleChange}
                  placeholder="Cole a URL do Drive/Site aqui"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="drive_publico"
                    name="drive_publico"
                    checked={formData.drive_publico || false}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                  <label
                    htmlFor="drive_publico"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Drive público (pode ser divulgado)
                  </label>
                </div>

                <div>
                  <Input
                    label="Imagem de capa"
                    type="text"
                    name="url"
                    value={formData.url || ""}
                    onChange={handleChange}
                    placeholder="Cole a URL da imagem de capa aqui"
                  />

                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="text-xs text-gray-500 font-medium">OU</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer"
                          disabled={isUploadingImage}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('image-upload')?.click();
                          }}
                        >
                          {isUploadingImage ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Fazer Upload de Imagem
                            </>
                          )}
                        </Button>
                      </label>
                      <span className="text-xs text-gray-500">
                        JPG, PNG, GIF ou WebP (máx. 10MB)
                      </span>
                    </div>

                    {uploadError && (
                      <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        {uploadError}
                      </div>
                    )}
                  </div>

                  {formData.url && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Pré-visualização:</p>
                      <img
                        src={formData.url}
                        alt="Pré-visualização da capa"
                        className="w-full max-w-xs rounded-md border border-gray-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                  <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-200">
                    *Campos obrigatórios
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                      loading={isLoading}
                      disabled={isLoading || !!successMessage}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Cadastrar Projeto
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-2 hover:bg-gray-50 font-semibold group"
                      onClick={() => navigate("/projetos")}
                    >
                      <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectCreatePage;

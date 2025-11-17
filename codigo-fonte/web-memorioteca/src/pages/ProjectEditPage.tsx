import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectData, ProjectService } from "@/services/projectService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input, Button } from "@/components/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) return;
        const project = await ProjectService.getProject(id);
        setFormData({
          titulo: project.titulo || "",
          descricao: project.descricao || "",
          url: project.url || "",
          nome_autor: project.nome_autor || "",
          data_inicio: project.data_inicio || "",
          data_fim: project.data_fim || "",
          url_drive: project.url_drive || "",
          drive_publico: project.drive_publico || false,
        });
      } catch (error) {
        console.error("Erro ao carregar projeto:", error);
        setApiErrors(["Erro ao carregar dados do projeto."]);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiErrors.length) setApiErrors([]);
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.titulo?.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.descricao?.trim())
      newErrors.descricao = "Descrição é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        url: formData.url?.trim() || null,
        url_drive: formData.url_drive?.trim() || null,
        drive_publico: formData.drive_publico
      };
      const res = await ProjectService.updateProject(id!, payload, token);

      if (res.success) {
        setSuccessMessage("Projeto atualizado com sucesso!");
        setTimeout(() => navigate(`/projects/${id}`), 1000);
      } else {
        setApiErrors(res.errors || ["Erro ao atualizar projeto"]);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Editar Projeto
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Atualize os dados do projeto
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
                <span>Edição</span>
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
                  Formulário de Edição
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
                  {formData.url && (
                    <div className="mt-2">
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
                          Atualizando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Salvar Alterações
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

export default ProjectEditPage;

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const payload = { ...formData, url: formData.url?.trim() || null };
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Editar Projeto
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Atualize os dados do projeto
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {successMessage && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {successMessage}
                  </div>
                )}

                {apiErrors.length > 0 && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    <ul className="space-y-1">
                      {apiErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
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
                  <label className="block text-sm font-medium mb-1">
                    Descrição*
                  </label>
                  <textarea
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
                  label="URL do Arquivo"
                  type="text"
                  name="url"
                  value={formData.url || ""}
                  onChange={handleChange}
                  placeholder="Cole a URL do arquivo aqui"
                />

                <p className="text-xs text-muted-foreground mt-1">
                  *Campos obrigatórios
                </p>

                <div className="flex gap-4 mt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    loading={isLoading}
                    disabled={isLoading || !!successMessage}
                  >
                    {isLoading ? "Atualizando..." : "Salvar"}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => navigate("/projetos")}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectEditPage;

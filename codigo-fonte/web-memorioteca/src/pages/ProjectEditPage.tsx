import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectService } from "@/services/projectService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input, Button } from "@/components/ui";

const ProjectEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({ titulo: "", descricao: "", url: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id || !token) return;
      setLoadingProject(true);

      const res = await ProjectService.getProjects(token);
      setLoadingProject(false);

      if (res.success && res.projetos) {
        const proj = res.projetos.find(p => p.id === Number(id));
        if (proj) {
          setFormData({
            titulo: proj.titulo,
            descricao: proj.descricao,
            url: proj.url || "",
          });
        } else {
          setApiError("Projeto não encontrado");
        }
      } else {
        setApiError(res.errors?.join(", ") || "Erro ao carregar projetos");
      }
    };

    fetchProject();
  }, [id, token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!token) {
      setApiError("Usuário não autenticado");
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    const res = await ProjectService.updateProject(Number(id), formData, token);
    setIsLoading(false);

    if (res.success) {
      navigate("/projects");
    } else {
      setApiError(res.errors?.join(", ") || "Erro ao atualizar projeto");
    }
  };

  if (loadingProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Editar Projeto</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Atualize os dados do projeto
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {apiError}
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
                <label className="block text-sm font-medium mb-1">Descrição*</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Descrição do projeto"
                />
                {errors.descricao && (
                  <p className="text-destructive text-sm mt-1">{errors.descricao}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL do Arquivo</label>
                <Input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="Cole a URL do arquivo aqui"
                />
              </div>

              <p className="text-xs text-muted-foreground mt-1">*Campos obrigatórios</p>

              <div className="flex gap-4 mt-4">
                <Button type="submit" className="flex-1" loading={isLoading} disabled={isLoading}>
                  {isLoading ? "Atualizando..." : "Salvar"}
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => navigate("/projects")}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectEditPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProjectService, ProjectData } from "@/services/projectService";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('memorioteca_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await ProjectService.getProjects(token);
        console.log(response)
        if (response.success && response.projetos) {
          setProjetos(response.projetos);
        }
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const handleViewProject = (id: number) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
              <Button onClick={handleCreateProject}>
                Cadastrar Novo Projeto
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p>Carregando projetos...</p>
              </div>
            ) : projetos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Nenhum projeto encontrado.</p>
                <Button onClick={handleCreateProject}>
                  Criar Primeiro Projeto
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome do Projeto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Autor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projetos.map((projeto) => (
                      <tr key={projeto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {projeto.titulo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {projeto.nome_autor || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {projeto.data_criacao
                              ? new Date(projeto.data_criacao).toLocaleDateString('pt-BR')
                              : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            onClick={() => handleViewProject(projeto.id!)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

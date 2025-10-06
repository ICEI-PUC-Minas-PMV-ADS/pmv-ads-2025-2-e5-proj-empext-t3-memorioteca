import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui";
import Footer from "@/components/Footer";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProjects = () => {
    navigate("/projects");
  };

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Memorioteca</h1>
              <p className="text-muted-foreground">Olá, {user?.nome}!</p>
            </div>
            <Button variant="outline" onClick={handleProjects}>
              Projetos
            </Button>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Projetos</h2>
            <p className="text-lg text-muted-foreground">
              Aqui você pode gerenciar seus projetos.
            </p>
            <Button variant="outline" onClick={handleCreateProject}>
              Cadastrar Projeto
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

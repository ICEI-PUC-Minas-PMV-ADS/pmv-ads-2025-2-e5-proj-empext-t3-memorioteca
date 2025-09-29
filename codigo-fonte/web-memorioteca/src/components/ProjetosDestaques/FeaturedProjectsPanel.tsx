




const mockProjects = [
  { id: 1, titulo: 'Projeto Incrível 1', resumo: 'Uma breve descrição do primeiro projeto em destaque.', imagemUrl: 'https://via.placeholder.com/400x200' },
  { id: 2, titulo: 'Inovação em Biblioteca', resumo: 'Detalhes sobre o segundo projeto que está revolucionando a leitura.', imagemUrl: 'https://via.placeholder.com/400x200' },
  { id: 3, titulo: 'Memória Digital', resumo: 'O terceiro projeto focado na preservação da história local.', imagemUrl: 'https://via.placeholder.com/400x200' },
];


const ProjectCard = ({ titulo, resumo, imagemUrl }: { titulo: string, resumo: string, imagemUrl: string } ) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-card">
      <img src={imagemUrl} alt={titulo} className="w-full h-32 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
      <p className="text-sm text-muted-foreground">{resumo}</p>
    </div>
  );
};



const FeaturedProjectsPanel = () => {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Projetos em Destaque</h2>
      
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <ProjectCard
            key={project.id}
            titulo={project.titulo}
            resumo={project.resumo}
            imagemUrl={project.imagemUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjectsPanel;


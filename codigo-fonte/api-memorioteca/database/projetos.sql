CREATE TABLE IF NOT EXISTS projetos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    url VARCHAR(500),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        
    CONSTRAINT check_titulo_not_empty 
        CHECK (LENGTH(TRIM(titulo)) > 0),
    CONSTRAINT check_descricao_not_empty 
        CHECK (LENGTH(TRIM(descricao)) > 0)
);

CREATE INDEX IF NOT EXISTS idx_projetos_data_criacao ON projetos(data_criacao DESC);
CREATE INDEX IF NOT EXISTS idx_projetos_titulo ON projetos USING gin(to_tsvector('portuguese', titulo));
CREATE INDEX IF NOT EXISTS idx_projetos_descricao ON projetos USING gin(to_tsvector('portuguese', descricao));

CREATE OR REPLACE FUNCTION update_projetos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_projetos_updated_at
    BEFORE UPDATE ON projetos
    FOR EACH ROW
    EXECUTE FUNCTION update_projetos_updated_at();

INSERT INTO projetos (titulo, descricao, url) VALUES
('História da Computação', 'Um projeto sobre a evolução dos computadores desde os primórdios até os dias atuais.', 'https://example.com/images/computacao.jpg'),
('Arte Digital Contemporânea', 'Exploração das principais tendências da arte digital no século XXI.', 'https://example.com/images/arte-digital.jpg'),
('Sustentabilidade Urbana', 'Análise das práticas sustentáveis em grandes centros urbanos.', 'https://example.com/images/sustentabilidade.jpg'),
('Inteligência Artificial na Educação', 'Como a IA está transformando os métodos de ensino e aprendizagem.', NULL),
('Música e Tecnologia', 'A evolução da produção musical através das novas tecnologias.', 'https://example.com/images/musica-tech.jpg')
ON CONFLICT DO NOTHING;
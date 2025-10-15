// api-memorioteca/src/service/destaquesprojects.js
import { supabase } from '../infra/database.js'

export async function listRecentProjects(limit = 3) {
  const { data, error } = await supabase
    .from('projetos') // confirme o nome da tabela
    .select('id,titulo,descricao,url,data_criacao')
    .order('data_criacao', { ascending: false })
    .limit(limit)

  return { data, error }
}

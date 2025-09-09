import { supabase } from '../infra/database.js';

const check = async () => {
    const { data, error } = await supabase
        .from('_health_check')
        .select('*')
        .limit(1);

    // Se o erro for apenas "tabela não encontrada", a conexão está OK
    if (error && error.code !== 'PGRST205') {
        throw error;
    }

    return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: {
        status: 'connected',
        supabase_url: process.env.SUPABASE_URL ? 'configured' : 'missing'
        }
    }
}

export {check};
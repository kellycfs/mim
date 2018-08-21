import { AreaVida } from './areavida';
import { Status } from './status';

export interface Meta {
    $key: string;
    descricao: string;
    imagem: string;
    dataInicio: Date;
    dataFim: Date;
    status: Status;
    areaVida: AreaVida;

}
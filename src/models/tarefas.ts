import { Meta } from "@angular/platform-browser";

export interface Tarefas {
    id?: string;
    nome: string;
    finalizada: boolean;
    meta: Meta;
}
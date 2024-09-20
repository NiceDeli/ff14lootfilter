export interface createStaticMatePayload {
    name: string;
    role: string;
}

export interface StaticMateServiceReturn {
    status: string;
    data: string;
}

export interface findStaticMatePayload {
    name?: string;
    role?: string;
}

export interface updateStaticMatePayload {
    name?: string;
    role?: string;
}

export interface deleteStaticMatePayload {
    name: string;
    role: string;
}

export interface findStaticMatePayload {
    name?: string;
    role?: string;
}
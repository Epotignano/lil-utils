declare var vizRoutes: {
    method: string;
    path: string;
    handler: (request: any, reply: any) => void;
}[];
export = vizRoutes;

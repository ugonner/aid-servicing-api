export declare class QueryRequestDTO {
    page?: string;
    limit?: string;
    searchTerm?: string;
    order?: "ASC" | "DESC";
}
export declare class QueryDateDTO extends QueryRequestDTO {
    startDate?: string;
    endDate?: string;
    dDate?: string;
}

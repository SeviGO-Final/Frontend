export type TrackingStatusResponse = {
    _id: string;
    status: string;
    notes: string;
    updated_at?: string;
}

export type ComplaintResponse = {
    _id: string;
    title: string;
    category: string;
    content: string;
    date_event: string;
    location: string;
    evidence: string;
    current_status: string;
    tracking_status?: TrackingStatusResponse[];
    is_deleted: boolean;
    created_at?: string,
    updated_at?: string
}